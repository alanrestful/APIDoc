var express = require('express');
var router = express.Router();
var rf = require("fs");
var application = require('../models/Application').Application;
var apiDocument = require('../models/APIDocument').APIDocument;
var apiPath = require('../models/APIPath').APIPath;
var apiDifinition = require('../models/APIDifinition').APIDifinition;


/* GET page. */
router.get('/', function(req, res) {
  var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");
  res.render('applications/application_manager' , {left_nav : JSON.parse(data).paths});
});

/* 创建应用 */
router.post('/', function(req, res) {
  application.create(req.body, function(error) {
    if(error) {
        console.log('create application error:%s', error);
    } else {
        console.log('create application success!');
    }
  });
  res.redirect('/projects');
});

/* 导入path */
router.get('/definition', function(req, res) {

    var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");

    var params = {
      applicationId: "57d65de287e89469e5dff869",
      swagger: JSON.parse(data).swagger,
      info: JSON.parse(data).info,
      host: JSON.parse(data).host,
      basePath: JSON.parse(data).basePath
    };
    console.log(params);
    apiDocument.create(params, function(error) {
      if(error) {
          console.log(error);
      } else {
          console.log('saved OK!');
      }
    });
    res.redirect('../projects');
});

/* 导入path */
router.post('/path', function(req, res) {
  var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");

  for(var path in JSON.parse(data).paths){
    var path_obj = {};
    path_obj[path] = JSON.parse(data).paths[path];
    apiPath.create({applicationId: "57d65de287e89469e5dff869", path_json: path_obj}, function(error) {
      if(error) {
          console.log(error);
      } else {
          console.log('saved OK!');
      }
    });
  }
  res.redirect('/projects');
});

router.post('/definitions', function(req, res) {
  var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");

  for(var def in JSON.parse(data).definitions){
    var def_obj = {};
    def_obj[def] = JSON.parse(data).definitions[def];
    apiDifinition.create({applicationId: "57d65de287e89469e5dff869", def_obj: def_obj}, function(error) {
      if(error) {
          console.log(error);
      } else {
          console.log('saved OK!');
      }
    });
  }
});


module.exports = router;
