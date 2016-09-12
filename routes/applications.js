var express = require('express');
var router = express.Router();
var rf = require("fs");
var application = require('../models/Application').Application;

var apiPath = require('../models/APIPath').APIPath;


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
router.post('/path', function(req, res) {
  var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");

  // console.log(JSON.parse(data).paths);
  // apiPath = objMerger(apiPath, JSON.parse(data).paths);
  // console.log(APIPath);
  for(var path in JSON.parse(data).paths){
    var path_obj = {};
    path_obj[path] = JSON.parse(data).paths[path];
    apiPath.create({path_json: path_obj}, function(error) {
      if(error) {
          console.log(error);
      } else {
          console.log('saved OK!');
      }
    });
  }
});


module.exports = router;
