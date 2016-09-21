var express = require('express');
var User = require('../models/User');
var http = require('http');
// var ccap = require('ccap');
var async = require('async');


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
      req.session.userId= doc._id;
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

router.get('/code',function(req,res,next){
  // var captchar = ccap();
  // var ary = captchar.get();
  // var text = ary[0];
  // var buffer = ary[1];
  // req.session.code = text;
  // console.log(text);
  // res.end(buffer);
  res.end();
});

router.post('/register',function(req,res,next){
  var obj = req.body;
  var code = req.session.code;
  // if (obj.code.toUpperCase() !== code) {
  //   res.send({success: false, reason: 'code.error'});
  //   return;
  // }
  try {
    async.waterfall([
        function(cb){
          User.User.findOne({name:obj.userName},function(err,doc){
            if (doc) {
              res.send({success: false, reason:'duplicate.name'});
              res.end();
            } else {
              cb();
            }
          });
        },
        function(cb){
          User.User.findOne({mobile:obj.mobile},function(err,doc){
            if (doc) {
              res.send({success: false, reason:'duplicate.mobile'});
              res.end();
            }else {
              cb();
            }
          });
        },
        function(cb) {
          User.User.findOne({email:obj.email},function(err,doc){
            if (doc) {
              res.send({success: false, reason:'duplicate.email'});
              res.end();
            }else {
              cb();
            }
          });
        },
        function(cb){
          var user = new User.User({
            name:obj.userName,
            mobile:obj.mobile,
            email:obj.email,
            password:obj.password
          });
          user.save();
          res.send({success:true});
        }

    ],function(err,vals){
        console.log("%s---%s",err,vals);
    });
  }catch (exception){
    console.error(exception);
    res.end();
  }
});

router.get("/center",function(req,res,next){
  User.User.findOne({_id:req.session.userId},function(err,doc){
    if (err){
      next(err);
    }
    console.log(doc);
    res.render("user/user",{user:doc});
  })
});

router.get('/passport',function(req,res){
  res.render("user/change_password",{});
});

router.post("/change-password",function(req,res){
  User.User.update({_id:req.session.userId,password:req.body.origin},{password:req.body.password},function(err,doc){
    if (doc.n == 0) {
      res.send({success:false,reason:"origin.error"});
      res.end();
      return;
    }
    if (doc.nModified) {
      res.send({success:true});
      res.end();
      return ;
    }
    console.log(err);
    res.send({success:false})
  });
});
module.exports = router;
