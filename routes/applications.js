var express = require('express');
var router = express.Router();
var rf = require("fs");
var http = require('http');
var application = require('../models/Application').Application;
var apiDocument = require('../models/APIDocument').APIDocument;
var apiPath = require('../models/APIPath').APIPath;
var apiDifinition = require('../models/APIDifinition').APIDifinition;

var multer  = require('multer');

/* GET page. */
router.get('/', function(req, res) {
  if(!req.query.id){
      res.redirect('./projects');
  }else{
    apiPath.find({"applicationId": req.query.id}, function (err, paths){
      apiDocument.find({"applicationId": req.query.id}, function(err, document){
        res.render('applications/application_manager', {paths: paths, document: document, aid: req.query.id});
      });
    });
  }
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

/* 导入api */
var upload = multer({dest:"uploads/"}).single('apifile');
router.post('/importAPI', function(req, res) {
    upload(req, res, function (err) {
      if (err) {
        console.log(req.body);   //打印请求体
        console.log(req.file);
        // An error occurred when uploading
        return
      }
      // Everything went fine
      console.log(req.file);  // 上传的文件信息
      var data = rf.readFileSync(req.file.path,"utf-8");
      var params = {
        applicationId: req.body._id,
        swagger: JSON.parse(data).swagger,
        info: JSON.parse(data).info,
        host: JSON.parse(data).host,
        basePath: JSON.parse(data).basePath
      };

      apiDocument.create(params, function(error) {
        if(error) {
            console.log('create document error:%s', error);
        } else {
            console.log('create document success!');
        }
      });

      for(var path in JSON.parse(data).paths){
        var path_obj = {};
        path_obj[path] = JSON.parse(data).paths[path];
        apiPath.create({applicationId: req.body._id, path_json: path_obj}, function(error) {
          if(error) {
              console.log('create paths error:%s', error);
          } else {
              console.log('create paths success!');
          }
        });
      }

      for(var def in JSON.parse(data).definitions){
        var def_obj = {};
        def_obj[def] = JSON.parse(data).definitions[def];
        apiDifinition.create({applicationId: req.body._id, def_obj: def_obj}, function(error) {
          if(error) {
              console.log('create definitions error:%s', error);
          } else {
              console.log('create definitions success!');
          }
        });
      }
      console.log("##############");
      res.redirect('../applications?id='+req.body._id);
  })
});

module.exports = router;
