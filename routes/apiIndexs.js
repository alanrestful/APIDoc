var express = require('express');
var router = express.Router();
var rf = require("fs");
var models = require('../models/APIPath');

var apiPath = models.APIPath;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_layout', { title: 'Express' });

  apiPath.find(function(err, paths) {
    console.log(paths);
  });
});


function objMerger(obj1, obj2){
  for(var r in obj2){
    obj1[r] = obj2[r];
  }
  return obj1;
}

router.get('/api_doc', function(req, res) {
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
  res.render('apis/apiView' , {left_nav : JSON.parse(data).definitions});
});

module.exports = router;
