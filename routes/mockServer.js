/**
 * Created by macbook on 17/3/20.
 * 模拟服务端
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var http = require('http');
var ApiPath = require('../models/APIPath').APIPath;
var apiPathDao = new ApiPath;
var ApiModel = require('./common/MockServer').ApiModel;
var MockServer = require('./common/MockServer').MockServer;
var mockServer = new MockServer();
var PathKey = require('../models/Path').PathKey;
var pathKeyDao = new PathKey();


var DefinitionParser = require('./common/DefinitionParser');


// router.post('/*', function(req, res, next) {
//   console.log(req);
//   res.json({});
//
// });

router.all('/:appId/*', function(req, res, next) {
  var _apiModel = null;
  buildApi(req).then(function(apiModel) {
    _apiModel = apiModel;
    return pathKeyDao.findBy(apiModel.appId, apiModel.apiSearch);
  }).then(function(result) {
    //找path
    if (!result) {
      return Promise.reject(new Error('can not find api', _apiModel.api));
    }
    _apiModel.api = result[0].apiPath;
    return apiPathDao.findByPath(result[0].apiPath, _apiModel.appId);
  }).catch(function(e) {
    console.error(e.message);
    res.json({success: false, cause: e.message})
  }).then(function(result) {
    // 找到了path,解析path的response
    return mockServer.mock(result, _apiModel);
  }).then(function(result) {
    res.json(result);
  }).catch(function(e) {
    console.error(e);
    res.json({success: false, cause: e.message});
  });
});

// router.put('/*', function(req, res, next) {
//   console.log(req);
//   res.json({});
// });
//
// router.delete('/*', function(req, res, next) {
//   console.log(req);
//   res.json({});
// });
module.exports = router;

function buildApi(req) {
  var params = req.params, query = req.query;
  return new Promise(function(resolve, reject) {
    if (!params) {
      reject(new Error('params is null'));
      return ;
    }
    if (!params.appId) {
      reject(new Error('couldn\'t get AppId'));
      return;
    }

    var apiModel = new ApiModel(getApi(params), req.method, req.query, params.appId);
    resolve(apiModel);
  })
}

function getApi(params) {
    if (!params || !params['0']) {
      reject(new Error('couldn\'t get api'));
      return;
    }
    var api = params['0'];
    if (!api.startsWith('\/')) {
      api = '\/' + api;
    }

    return api;
}

