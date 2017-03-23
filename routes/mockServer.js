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
var MockServers = require('./common/MockServers');
const mockServers = new MockServers();

var DefinitionParser = require('./common/DefinitionParser');

var ParamManager = require('./common/ParamManager');
router.all('/12', function(req, res, next) {

  res.json({});
});
router.all('/s/:appId/*', function(req, res, next) {
  var paramManager = new ParamManager(req);
  paramManager.process().then((result) => {
    console.log(result);
    return mockServers.checkParameters(result);
  }).then((result) => {
    res.json(result);
  }).catch((e) => {
    console.error(e);
    var eObj = JSON.parse(e.message);
    res.status(eObj.status).send(eObj.message)
  });
});


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
    res.status(400).send(e);
  });
});



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

