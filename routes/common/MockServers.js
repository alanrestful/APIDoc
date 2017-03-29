//模拟服务端，进行数据检查，数据模拟生成
const ApiPath = require('../../models/APIPath').APIPath;
const apiPathDao = new ApiPath;
const DefinitionParser = require('./DefinitionParser').DefinitionParser;
const MockData = require('./MockDatas').MockDatas;
const mockData = new MockData();
class MockServers {
  constructor() {}

  //检查参数必需，类型
  checkParameters(paramManager) {
    return apiPathDao.findByPath(paramManager.resultPath, paramManager.appId).then((paths) => {
      if (!paths || paths.length === 0) return Promise.reject(new Error(JSON.stringify({status: 404,message: paramManager.resultPath + ' not exists'})));
      if (paths.length > 1) return Promise.reject(new Error(JSON.stringify({status: 405, message: 'Data Error: duplicate path: ' + paramManager.resultPath})));
      paramManager.pathInfo = paths[0];
      return Promise.resolve(paths[0]);
    }).then((pathModel) => {
      //开始类型检查
      var path = pathModel['path_json'][paramManager.resultPath][paramManager.method.toLowerCase()];
      if (!path) return Promise.reject(new Error(JSON.stringify({status:405, message: `${paramManager.resultPath} method ${paramManager.method} not supported!`})));
      let parameters = path.parameters;
      if (!parameters || parameters.length === 0) return Promise.resolve(path); //不用检查
      this.checkParamRequired(paramManager, parameters);
      return Promise.resolve(path);
    }).then((path) => {
      // return this.mockResponse(path, paramManager.appId);
      return this.getMockResponse(paramManager.resultPath, paramManager.appId, paramManager.method.toLowerCase(), paramManager.parameters);
    });
  }

  checkParamRequired(paramManager, originParam) {
    let reqParameters = paramManager.parameters;
    let reqParametersObj = {};
    for (let i = 0; i< reqParameters.length; i++ ) {
      reqParametersObj[reqParameters[i].name] = reqParameters[i];
    }
    for (let i = 0; i < originParam.length; i++ ) {
      //检查必需
      if (originParam[i].in === 'body' && originParam[i].schema) {
        continue; //todo post application/json格式的先过，之后应该加上模型参数类型转换的检查。
      }
      if (!((originParam[i].required && reqParametersObj[originParam[i].name]) || !originParam[i].required)) {
        throw new Error(JSON.stringify({status:400, message: `required param ${originParam[i].name} not present!`}));
      }
      var originPosition = originParam[i].in;
      if (originPosition === 'query') {
        if (reqParametersObj[originParam[i].name] && reqParametersObj[originParam[i].name].in !== 'query') {
          throw new Error(JSON.stringify({status:400, message:originParam[i].name + ' need in query'}));
        }
      } else if (originPosition === 'body') {
        if (reqParametersObj[originParam[i].name] && reqParametersObj[originParam[i].name].in !== 'body') {
          throw new Error(JSON.stringify({status:400, message: originParam[i].name + ' need in body'}));
        }
      } else if (originPosition === 'path') {
        if (reqParametersObj[originParam[i].name] && reqParametersObj[originParam[i].name].in !== 'path') {
          throw new Error(JSON.stringify({status:400, message: originParam[i].name + ' need in path'}));
        }
      }
      //检查类型
    }
  }

  //mock数据
  mockResponse(path, appId) {
    let response = path.responses;
    return new Promise(function(resolve, reject) {
      if (!response || !response['200']) throw new Error(JSON.stringify({status: 500, message: `can not find 200 response`}));
      if (!response['200']['schema']) {
        resolve(true);
        return;
      }
      var schema = response['200']['schema'];
      var definitionParser = new DefinitionParser(schema, appId);
      definitionParser.gen().then(function(result) {
        resolve(result);
      });
    })
  }

  getMockResponse(pathName, appId, method, parameters) {
    let criteria = {};
    parameters.forEach((item, i, a) => {
      criteria[item.name] = item.value;
    });
    //这是从数据库中获取数据。
    return new Promise((resolve, reject) => {
      mockData.getData(pathName, method, appId).then((data) => {
        return mockData.filterMock(data, criteria);
      }).then((result) => {
        resolve(result);
      }).catch(e => reject(e));
    });
  }


}

module.exports = MockServers;