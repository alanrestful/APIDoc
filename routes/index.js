var express = require('express');
var router = express.Router();

var project = require('../models/Project').Project;

var Application = require('../models/Application').Application;
var ApiDocument = require('../models/APIDocument').APIDocument;
var ApiPath = require('../models/APIPath').APIPath;
var ApiDefinition = require('../models/APIDefinition').APIDefinition;
var User = require('../models/User').User;

/* 首页 */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* 用户管理页 */
router.get('/users', function(req, res) {
  User.find(function(err, users) {
    res.render('user/user_manager', {title: '用户管理', users: users, total: users.length});
  });
});

router.get("/users/center",function(req,res,next){
  User.findOne({_id:req.session.userId},function(err,doc){
    if (err){
      next(err);
    }
    console.log(doc);
    res.render("user/user",{user:doc});
  })
});

router.get('/users/passport',function(req,res){
  res.render("user/change_password",{});
});

/* 项目管理页 */
router.get('/projects', function(req, res) {
  project.find(function(err, projects) {
    res.render('projects/project_manager', {projects: projects});
  });
});

/* 应用api接口管理页 */
router.get('/applications/id/:id', function (req, res, next) {
  var aid = req.params.id;
  if (!aid) {
    res.redirect('../projects');
  }else{
    Application.findOne({"_id": aid}, {'__v':0}, function (err, app) {
      if (err) next(err);
      var apiPath = new ApiPath;
      apiPath.findByAid(aid, function (err, paths) {
        if (err) {
          res.json({status: false, messages: err});
          return;
        }
        ApiDocument.find({"applicationId": aid}, function (err, doc) {
          if (err) next(err);
          var nav = {};
          for (var path in paths) {
            for (var p in paths[path]["path_json"]) {
              for (var m in paths[path]["path_json"][p]) {
                if (!nav[paths[path]["path_json"][p][m].tags[0]]) {
                  nav[paths[path]["path_json"][p][m].tags[0]] = [];
                }
                if (nav[paths[path]["path_json"][p][m].tags[0]].indexOf(paths[path]["path_json"][p][m].summary) == -1) {
                  nav[paths[path]["path_json"][p][m].tags[0]].push(paths[path]["path_json"][p][m].summary);
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
          res.render('applications/application_manager', {nav: arr, app: app, paths: paths, document: doc});
        });
      });
    });
  }
});

/* case管理页 */
router.get('/cases', function(req, res) {
  res.render('cases/case_manager', {title: 'case管理'});
});

module.exports = router;
