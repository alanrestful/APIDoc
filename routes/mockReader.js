const express = require('express');
const router = express.Router();

const apiPathDao = new require('../models/APIPath').APIPath();
const mockDao = new require('../models/Mock').Mock();
const definitionDao = new require('../models/APIDefinition').APIDefinition();

/**
 * 获取某一path下的接口数据。
 * @param: path 接口名称
 * @param: appId 应用id
 * @param: method 接口方法
 * @return: {path: {}, mockList: [{}, {}]}
 */
router.get('/path-mock', function(req, res, next) {
  let apiPath = req.query.path,
      appId = req.query.appId,
      method = req.query.method;

  let resp = {};

  apiPathDao.findByPath(apiPath, appId).then((result) => {
    if (!result && result.length === 0) {
      res.status(500).json({message: `can not find path of ${apiPath}`})
    }
    resp.path = result[0]._doc;
    return mockDao.findBy(appId, apiPath, method);
  }).then((mockData) => {
    resp.mockList = mockData;
    res.json({success: true, result: resp});
  }).catch((e) => {
    console.error(e);
    res.status(500).json({success: false, message: e.message || e})
  })
});

/**
 * 获取某一具体模拟数据的接口
 * @param id mock_data中的主键
 * @return Mock object
 */
router.get('/mock-data/:id', function(req, res, next) {
  let id = req.param.id;
  mockDao.findById(id).then((result) => {
    if (!result) res.status(500).json({success: false, message: `mock data of ${id} doesn't exists`})
    res.json({success: true, result});
  }).catch((e) => {
    console.error(e);
    res.status(500).json({success: false, message: e.message || e})
  })
});

/**
 * 获取某一个path的返回数据模型
 * @param id apiPath的主键
 */
router.get('/resp-model/:id', function(req, res, next) {
  let id = req.params.id,
      method = req.query.method;
  let respParam = {};
  apiPathDao.findById(id).then((path) => {
    if (!path) {
      res.status(500).json({message: `can not find path of ${id}`})
    }
    let resp200 = path['path_json'][Object.keys(path['path_json'])[0]][method].responses['200'];   //an array
    let appId = path['applicationId'];
    respParam.entry = resp200;
    parseBase(appId, respParam.entry).then((resp) => {
      res.json({result: resp})
    });
  }).catch((e) => {
    console.error(e);
    res.status(500).json({success: false, message: e.message || e});
  })
});

module.exports = router;



function parseBase(appId, respParam) {
  if (!respParam.schema) {  //没有返回值
    return Promise.resolve(null);
  }
  let schema = respParam.schema;
  if (schema.type && schema.type !== 'array') {
    return Promise.resolve(schema.type);
  }
  if (schema.type && schema.type === 'array') {
    if (schema.items && schema.items.type) {
      return Promise.resolve([schema.items.type]);
    } else if (schema.items && schema.items.$ref){
      return Promise.resolve([]);
    }
  }
  if (schema.$ref) {
    return definitionDao.findByAid(appId).then(function(result) {
      if (!result || result.length === 0) throw new Error('definitions by applicationId ' + appId + ' not exists');
      let modelArray = [];
      result.forEach(function (item, i, array) {
        var definitionJson = item['definition_json'];
        var key = Object.keys(definitionJson)[0];
        modelArray[key] = definitionJson[key];
      });
      return Promise.resolve(modelArray);
    }).then((modelArray) => {
      let result = parseDefinition(appId, schema.$ref, modelArray);
      return Promise.resolve(result);
    })
  }
}

function parseDefinition(appId, $ref, modelArray) {
  //当前ref对象
  let mockModel = {};
  let DefName = $ref.split('#/definitions/')[1];
  let modelProps = modelArray[DefName]['properties'];
  for(var i in modelProps) {
    var modelProp = modelProps[i];
    if (modelProp.$ref) {
      //如果是对象,递归
      mockModel[i] = parseDefinition(appId, modelProp.$ref, modelArray);
    } else if (modelProp.items && modelProp.items.$ref && modelProp.type === 'array') {
      mockModel[i] = [];
      mockModel[i].push(parseDefinition(appId, modelProp.items.$ref, modelArray));
    } else if (modelProp.type === 'array' && modelProp.items && modelProp.items.type) {
      //直接数组
      mockModel[i] = [];
      mockModel[i].push(modelProp.items.type)
    } else {
      //基本类型,直接填值
      var type = modelProp.type;
      mockModel[i] =type;
    }
  }
  return mockModel;
}