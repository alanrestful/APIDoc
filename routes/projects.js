var express = require('express');
var router = express.Router();
var rf = require("fs");
var project = require('../models/Project').Project;
var application = require('../models/Application').Application;


/* 项目列表 */
router.get('/', function(req, res) {
    project.find(function(err, projects) {
      if(!req.query.id){
          res.render('projects/project_manager', {Params: req.query, projects: projects});
      }else{
        application.find({"projectId": req.query.id}, function (err, applications){
          res.render('projects/project_manager', {Params: req.query, projects: projects, applications: applications, _id: req.query.id });
        });
      }
    });
});

/* 创建项目 */
router.post('/', function(req, res) {
  project.create(req.body, function(error) {
    if(error) {
        console.log('create project error:%s', error);
    } else {
        console.log('create project success!');
    }
  });
  res.redirect('/projects');
});

module.exports = router;
