var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var http = require('http');
var application = require('../models/Application').Application;
var apiDocument = require('../models/APIDocument').APIDocument;
var apiPath = require('../models/APIPath').APIPath;
var apiDefinition = require('../models/APIDefinition').APIDefinition;

var multer  = require('multer');
var upload = multer({dest: path.join(__dirname,'../temp/')});
/* GET page. */
router.get('/', function(req, res) {
  if(!req.query.id){
    res.redirect('./projects');
  }else{
    apiPath.find({"applicationId": req.query.id}, {'path_json' : 1}, function (err, paths){
      if(err) throw err;
      apiDocument.find({"applicationId": req.query.id}, function(err, document){
        if(err) throw err;
        var nav = {};
        for(var path in paths) {
          for(var p in paths[path]["path_json"]){
            for(var m in paths[path]["path_json"][p]){
              if(!nav[paths[path]["path_json"][p][m].tags[0]]){
                nav[paths[path]["path_json"][p][m].tags[0]] = [];
              }
              if(nav[paths[path]["path_json"][p][m].tags[0]].indexOf(paths[path]["path_json"][p][m].summary)==-1){
                nav[paths[path]["path_json"][p][m].tags[0]].push(paths[path]["path_json"][p][m].summary);
              }
            }
          }
        }
        res.render('applications/application_manager', {nav: nav, paths: paths, document: document, aid: req.query.id, pid: req.query.pid});
      });
    });
  }
});

/* 创建应用 */
router.post('/', upload.single('appAvatar'), function(req, res) {
  console.log(req.body);
  var avatar = 'images/avatar.png';
  if(req.file){
    console.log(req.file);
    var tmpPath = 'temp/' + req.file.filename;
  	//移动到指定的目录，一般放到public的images文件下面
  	//在移动的时候确定路径已经存在，否则会报错
    avatar = 'uploads/' + req.file.filename + '.png';
  	//将上传的临时文件移动到指定的目录下
  	fs.rename(tmpPath, 'public/' + avatar , function(err) {
  		if(err){
  			throw err;
  		}
  		//删除临时文件
  		fs.unlink(tmpPath, function(){
  			if(err) {
  				throw err;
  			}
  		})
  	})
  }

  var params = {
    projectId: req.body.projectId,
    name: req.body.name,
    tag: req.body.tag,
    avatar: './' + avatar
  };

  application.create(params, function(error) {
    if(error) {
        console.log('create application error:%s', error);
    } else {
        console.log('create application success!');
    }
  });
  res.redirect('/projects');
});

/* 导入api */
router.post('/importAPI', upload.single('apifile'), function(req, res) {
  console.log(req.file);  // 上传的文件信息
  var data = fs.readFileSync(req.file.path,"utf-8");
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
    apiDefinition.create({applicationId: req.body._id, definition_json: def_obj}, function(error) {
      if(error) {
          console.log('create definitions error:%s', error);
      } else {
          console.log('create definitions success!');
      }
    });
  }
  console.log("##############");
  res.redirect('../applications?id='+req.body._id);
});

// 查询实体参数定义
router.get('/definition', function(req, res) {
  var data = {};
  data['definition_json.' + req.query.ref] = { $exists: true };
  data['applicationId'] = req.query.id
  apiDefinition.find(data, function (err, def){
    if(err){
      throw err;
    }
    res.json(def);
  });

});

module.exports = router;
