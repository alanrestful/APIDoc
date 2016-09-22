var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;

/* 项目列表 */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    res.render('projects/project_manager', {projects: projects});
  });
});

/* 获取项目应用 */
router.get('/apps', function(req, res) {
  if(!req.body.id && !req.body.env){
    console.log(req.body);
    application.find({projectId: req.body.id, env: req.body.env}, function (err, applications){
      res.json(applications);
    });
  }else{
    res.json({});
  }
});

/* 创建项目 */
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    owner: req.session.user,
    env_json: req.body.env_json
  };
  var result = {};
  project.create(params, function(err) {
    if(err) {
      result.status = false;
      result.messages = error;
      console.log('create project error:%s', err);
    } else {
      result.status = true;
      result.messages = '';
      console.log('create project success!');
    }
    res.json(result);
  });
});

/* 删除项目 */
router.delete('/', function(req, res) {
  var result = {};
  project.remove({_id: req.body.id}, function(err) {
    if(err) {
      result.status = false;
      result.messages = err;
      console.log('delete project error:%s', err);
    } else {
      result.status = true;
      result.messages = '';
      console.log('delete project success!');
    }
    res.json(result);
  });
});

module.exports = router;
