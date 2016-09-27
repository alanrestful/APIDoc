var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;


/* 获取项目列表json */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    if(err){
      res.json({status: false, messages: 'find.projects.fail'});
    }
    res.json(projects);
  });
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
