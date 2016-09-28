var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;


/* 获取项目列表json */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    if(err){
      console.log('find projects error:%s', err);
      res.json({status: false, messages: 'find.projects.fail', result: null});
      return;
    }
    res.json({status: true, messages: null, result: projects});
  });
});

/* 创建项目 */
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    owner: req.session.user,
    env_json: req.body.env_json
  };
  project.create(params, function(err) {
    if(err) {
      console.log('create project error:%s', err);
      res.json({status: false, messages: 'create.projects.fail', result: null});
      return;
    } else {
      console.log('create project success!');
      res.json({status: true, messages: null, result: null});
    }
  });
});

/* 删除项目 */
router.delete('/', function(req, res) {
  project.remove({_id: req.body.id}, function(err) {
    if(err) {
      console.log('delete project error:%s', err);
      res.json({status: false, messages: 'create.projects.fail', result: null});
      return;
    } else {
      console.log('delete project success!');
      res.json({status: true, messages: null, result: null});
    }
  });
});

module.exports = router;
