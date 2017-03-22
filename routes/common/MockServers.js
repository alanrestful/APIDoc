//模拟服务端，进行数据检查，数据模拟生成
const ApiPath = require('../../models/APIPath').APIPath;
const apiPathDao = new ApiPath;
const DefinitionParser = require('./DefinitionParser').DefinitionParser;
class MockServers {
  constructor() {}

  //检查参数必需，类型
  checkParameters(paramManager) {
    return apiPathDao.findByPath(paramManager.resultPath, paramManager.appId).then((paths) => {
      if (!paths || paths.length === 0) return Promise.reject(new Error(paramManager.resultPath + 'not exists'));
      if (paths.length > 1) return Promise.reject(new Error('Data Error: duplicate path: ' + paramManager.resultPath));
      paramManager.pathInfo = paths[0];
      return Promise.resolve(paths[0]);
    }).then((pathModel) => {
      //开始类型检查
      var path = pathModel['path_json'][paramManager.resultPath][paramManager.method.toLowerCase()];
      if (!path) return Promise.reject(new Error('405: ' + paramManager.resultPath + ' method ' + paramManager.method + ' not supported!'));
      let parameters = path.parameters;
      if (!parameters || parameters.length === 0) return Promise.resolve(true); //不用检查
      this.checkParamRequired(paramManager, parameters);
      return Promise.resolve(path);
    }).then((path) => {
      return this.mockResponse(path, paramManager.appId);
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
      if (!((originParam[i].required && reqParametersObj[originParam[i].name]) || !originParam[i].required)) {
        throw new Error('400: ' + originParam[i].name + ' not present!');
      }
      var originPosition = originParam[i].in;
      if (originPosition === 'query') {
        if (!paramManager.query[originParam[i].name] && reqParametersObj[originParam[i].name]) {
          throw new Error('400: ' + originParam[i].name + ' need in query');
        }
      } else if (originPosition === 'body') {
        if (!paramManager.body[originParam[i].name] && reqParametersObj[originParam[i].name]) {
          throw new Error('400: ' + originParam[i].name + ' need in body');
        }
      } else if (originPosition === 'path') {
        if (!paramManager.paths[originParam[i].name] && reqParametersObj[originParam[i].name]) {
          throw new Error('400: ' + originParam[i].name + ' need in path');
        }
      }
      //检查类型
    }
  }

  //mock数据
  mockResponse(path, appId) {
    let response = path.responses;
    return new Promise(function(resolve, reject) {
      if (!response || !response['200'] || !response['200']['schema']) return null;
      var schema = response['200']['schema'];
      var definitionParser = new DefinitionParser(schema, appId);
      definitionParser.gen().then(function(result) {
        resolve(result);
      });
    })
  }

}

module.exports = MockServers;