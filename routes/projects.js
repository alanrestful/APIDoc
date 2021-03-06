var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;


/* 获取所有项目信息 */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    if(err){
      console.log('find projects error:%s', err);
      res.json({status: false, messages: '查询项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: projects});
  });
});

/* 根据ID查询指定项目信息 */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  if(!id){
    res.json({status: false, messages: '项目ID为空', result: null});
  }
  project.findOne({_id: id}, function(err, project) {
    if(err){
      console.log('find projects error:%s', err);
      res.json({status: false, messages: '查询项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: project});
  });
});

/* 创建项目 */
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    owner: req.session.user,
    env_json: JSON.parse(req.body.env_json)
  };
  project.create(params, function(err) {
    if(err) {
      console.log('create project error:%s', err);
      res.json({status: false, messages: '创建项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: null});
  });
});

/* 更新项目 */
router.put('/', function(req, res) {
  var id = req.body._id;
  var env_json = JSON.parse(req.body.env_json);
  project.update({_id: id},{$set: {env_json: env_json}}, function(err) {
    if(err) {
      console.log('update project error:%s', err);
      res.json({status: false, messages: '更新项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: null});
  });
});

/* 删除项目 */
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  project.remove({_id: id}, function(err) {
    if(err) {
      console.log('delete project error:%s', err);
      res.json({status: false, messages: '删除项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: null});
  });
});

module.exports = router;
