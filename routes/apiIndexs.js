var express = require('express');
var router = express.Router();
var rf = require("fs");
var models = require('../models/APIPath');

var apiPath = models.APIPath;

function TraversalObject(obj){
    for (var a in obj) {
        if (typeof (obj[a]) == "object") {
            console.log(a);
            TraversalObject(obj[a]); //递归遍历
        }else {
            console.log(a + "=" + obj[a]);//值就显示
        }
    }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_layout', { title: 'Express' });

  apiPath.find(function(err, paths) {
    // for(var path in paths) {
    //   // TraversalObject(paths[path]);
    //   for (var a in paths[path]) {
    //     // if (typeof (paths[path][a]) == "object") {
    //     //     console.log("object");
    //     // }else {
    //     //     console.log(a + "=" + paths[path][a]);//值就显示
    //     // }
    //     console.log(a);
    //   }
    // }
    for(var path in paths) {
      // 开始遍历
      // for(var p in paths[path]["path_json"]){
      //     // 方法
      //      if(typeof(paths[path]["path_json"][p])=="function"){
      //          // paths[path][p]();
      //      }else{
      //          // p 为属性名称，obj[p]为对应属性的值
      //          console.log(p + "=" + paths[path]["path_json"][p] + "\t");
      //      }
      //  }
       TraversalObject(paths[path]["path_json"]);
     }
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
