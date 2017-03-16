var express = require('express');
var router = express.Router();

var project = require('../models/Project').Project;

var Application = require('../models/Application').Application;
var ApiDocument = require('../models/APIDocument').APIDocument;
var ApiPath = require('../models/APIPath').APIPath;
var ApiDefinition = require('../models/APIDefinition').APIDefinition;
var User = require('../models/User').User;

var _ = require('lodash');

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
router.get('/applications/:id', function (req, res, next) {
  var aid = req.params.id;
  if (!aid) {
    res.redirect('../projects');
  }else{
    var resJson = {};
    var definitionsMap = {};

    Application.findOne({"_id": aid}, {'__v':0})
        .then(function(app) {
          var pid = app.projectId;
          resJson.app = app;
          return project.findOne({"_id": pid}, {});
        })
        .then(function(project) {
          resJson.project = project;
          var apiPath = new ApiPath;
          return apiPath.findByAid(aid);
        })
        .then(function(paths) {
          resJson.paths = paths;
          var apiDefinition = new ApiDefinition;
          return apiDefinition.findByAid(aid);
        })
        .then(function(definitions) {
          definitionsMap = definitionConvert(definitions);
          resJson.definitions = definitions;
          return ApiDocument.find({"applicationId": aid});
        })
        .then(function(doc) {
          resJson.document = doc;
          return navGenerator(resJson.paths, definitionsMap);
        })
        .then(function(navArr) {
          resJson.nav = navArr;
          res.render('applications/application_manager', resJson);
        })
        .catch(function(err) {
          console.error(err);
          res.json({status: false, messages: err.message});
        })
  }
});


/* case管理页 */
router.get('/cases', function(req, res) {
  res.render('cases/case_manager', {title: 'case管理'});
});

module.exports = router;

var navGenerator = function(paths, definitionsMap) {
  return new Promise(function(resolve, reject) {
    var nav = {};
    for (var path in paths) {
      for (var p in paths[path]["path_json"]) {
        for (var m in paths[path]["path_json"][p]) {
          //parameters 组装definition
          insertDefinitionToPath(definitionsMap, paths[path]["path_json"][p][m].parameters);
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
    resolve(arr);
  })
};

var definitionConvert = function(definitions) {
  var definitionMap = {};
  definitions.map(function(v, i, a) {
    var key = _.keys(v.definition_json)[0];
    definitionMap[key] = v.definition_json[key];
  })
  return definitionMap;
};

var insertDefinitionToPath = function(definitionMap, parameters) {
  if (parameters) {
    parameters.forEach(function (parameter, i, a) {
      if (parameter.schema && parameter.schema.$ref) {
        var definitionName = parameter.schema.$ref.replace('#/definitions/', '');
        a[i].definition = definitionMap[definitionName];
      }
    })
  }

};