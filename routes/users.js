var express = require('express');
var User = require('../models/User');
var http = require('http');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  // var swaggerWithCallback = new SwaggerClient({
  //     url: "http://petstore.swagger.io/v2/swagger.json",
  //     success: function () {
  //       res.send(swaggerWithCallback);
  //         // console.log('callback ready', swaggerWithCallback);
  //     }
  // });

  // the post options
    // var optionspost = {
    //     host : 'jidd.com',
    //     port : '80',
    //     path : '/v2/api-docs?group=api',
    //     method : 'GET'
    // };
    //
    // // do the POST call
    // // 服务器端发送REST请求
    // var reqPost = http.request(optionspost, function(resPost) {
    //     resPost.on('data', function(d) {
    //         res.send(d);
    //     });
    // });
    // reqPost.end();
    // reqPost.on('error', function(e) {
    //     console.error(e);
    // });


    res.send('respond with a resource');
});

router.post('/login', function (req, res) {
  var obj = req.body;
  User.User.findOne({name : obj.userName,password: obj.password},function(err,doc){
    console.log(doc);
    if (doc){
      console.log(obj.userName + " login success");
      req.session.user = obj.userName;
      req.session.cookie.user = obj.userName;
      res.send({user: obj.userName});
    } else {
      console.log(obj.userName + " login failed");
      res.send(false);
    }
  })
});

router.post('/logout',function(req,res){
  var obj = req.body;
  var session = req.session;
  session.regenerate(function(){
    session.user = null;
  });
  res.render('index', {title: 'Express'});
});

module.exports = router;
