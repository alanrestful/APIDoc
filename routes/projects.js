var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;

/* 项目列表 */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    if(!req.query.id){
      res.render('projects/project_manager', {projects: projects});
    }else{
      var pid = req.query.id;
      application.find({"projectId": pid}, function (err, applications){
        res.render('projects/project_manager', {projects: projects, applications: applications, pid: pid });
      });
    }
  });
});

/* 创建项目 */
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    tag: req.body.tag,
    creator: req.session.user
  };

  project.create(params, function(error) {
    if(error) {
      console.log('create project error:%s', error);
    } else {
      console.log('create project success!');
    }
  });
  res.redirect('/projects');
});

module.exports = router;
