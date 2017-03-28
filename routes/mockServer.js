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
var project = require('../models/Project').Project;

var Application = require('../models/Application').Application;

var Mock = require('../models/Mock').Mock;
var MockDao = new Mock();

const mockServers = new MockServers();

var DefinitionParser = require('./common/DefinitionParser');

var ParamManager = require('./common/ParamManager');
router.all('/12', function(req, res, next) {

  res.json({});
});

/**
 * 保存mock数据
 */
router.post('/mock/save', function(req, res, next) {
  var obj = {
    applicationId: req.body.applicationId,
    path: req.body.path,
    criteria: req.body.criteria,
    mockData: req.body.mockData,
    name: req.body.name,
    method: req.body.method,
  };
  var mock = new Mock(obj);
  let _id = req.body._id;
  if (!_id) {
    mock.save().then((result) => {
      res.json({success: true});
    }).catch((e) => {
      res.status(500).json({message: e})
    });
  } else {
    Mock.update({_id: _id}, {$set: obj}).then((result) => {
      res.json({success: true})
    }).catch((e) => {
      console.error(e);
      res.status(500).json({message: e});
    })
  }
});


/**
 * mock数据编辑界面获取全部api信息的接口。
 */
router.get('/mock/:appId/', function(req, res, next) {
  var aid = req.params.appId;
  if (!aid) {
    res.redirect('../projects');
  }else{
    var resJson = {};
    Application.findOne({"_id": aid}, {'__v':0})
        .then(function(app) {
          var pid = app.projectId;
          resJson.app = app;
          return project.findOne({"_id": pid}, {});
        })
        .then(function(project) {
          resJson.project = project;
          var apiPath = new ApiPath;
          return apiPath.findByAid(aid);
        })
        .then(function(paths) {
          resJson.paths = paths;
          return navGenerator(resJson.paths)
        })
        .then(function(navArr) {
          resJson.nav = navArr;
          res.render('forms/mock-form', resJson);
        })
        .catch(function(err) {
          console.error(err);
          res.json({status: false, messages: err.message});
        })
  }
});

/**
 * 模拟服务端，数据从req请求中获取。
 */
router.all('/:appId/*', function(req, res, next) {
  var paramManager = new ParamManager(req);
  paramManager.process().then((result) => {
    console.log(result);
    return mockServers.checkParameters(result);
  }).then((result) => {
    res.json(result);
  }).catch((e) => {
    console.error(e);
    var eObj = JSON.parse(e && e.message);
    res.status(eObj.status).send(eObj.message)
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


var navGenerator = function(paths) {
  return new Promise(function(resolve, reject) {
    var nav = {};
    for (var path in paths) {
      for (var p in paths[path]["path_json"]) {
        for (var m in paths[path]["path_json"][p]) {
          if (!nav[paths[path]["path_json"][p][m].tags[0]]) {
            nav[paths[path]["path_json"][p][m].tags[0]] = [];
          }
          if (nav[paths[path]["path_json"][p][m].tags[0]].indexOf(paths[path]["path_json"][p][m].summary) == -1) {
            nav[paths[path]["path_json"][p][m].tags[0]].push({
              title: paths[path]["path_json"][p][m].summary,
              path: p,
              method: m,
              param: paths[path]["path_json"][p][m].parameters,
              _id: paths[path]["_id"]
            });
          }
        }
      }
    }
    var arr = [];
    for (var n in nav) {
      nav[n].sort(function (a, b) {
        return a < b ? -1 : 1;
      });
      arr.push({name: n, key: nav[n]})
    }
    arr.sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });
    resolve(arr);
  })
};