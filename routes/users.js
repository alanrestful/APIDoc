var express = require('express');
var User = require('../models/User').User;
var http = require('http');
var async = require('async');

var router = express.Router();

router.post('/', function (req, res) {
  var obj = req.body;
  User.findOne({name : obj.name},function(err,doc){
    if(err){
      console.log('save user error:%s', err);
      res.json({status: false, messages: err, result: null});
      return;
    }
    if (doc){
      console.log('save user error:%s', err);
      res.json({status: false, messages: '用户名已存在', result: null});
      return;
    }else{
      var user = new User({
        name: obj.name,
        mobile: obj.mobile,
        position: obj.position
      });
      user.save();
      res.json({status: true, messages: null, result: null});
    }
  })
});

router.put('/', function (req, res) {
  var data = req.body;
  User.update({_id: data._id},{$set: {mobile: data.mobile, position: data.position}}, function(err) {
    if(err) {
      console.log('update user error:%s', err);
      res.json({status: false, messages: '更新用户失败', result: null});
      return;
    } else {
      console.log('update user success!');
      res.json({status: true, messages: null, result: null});
    }
  });
});

router.get('/id/:id', function (req, res) {
  var id = req.params.id;
  User.findOne({_id : id},function(err, user){
    if(err){
      console.log('find user error:%s', err);
      res.json({status: false, messages: err, result: null});
      return;
    }
    if (!user){
      res.json({status: false, messages: '用户不存在', result: null});
      return;
    }
    res.json({status: true, messages: null, result: user});
  })
});

/* 删除用户 */
router.delete('/', function(req, res) {
  var result = {};
  User.remove({_id: req.body.id}, function(err) {
    if(err) {
      console.log('delete user error:%s', err);
      res.json({status: false, messages: err, result: null});
      return;
    } else {
      console.log('delete user success!');
      res.json({status: true, messages: null, result: null});
    }
  });
});

router.post('/logout',function(req,res){
  var obj = req.body;
  var session = req.session;
  session.regenerate(function(){
    session.user = null;
  });
  res.json({status: true, messages: null, result: null});
});

router.post('/login', function (req, res) {
  var obj = req.body;
  User.findOne({name : obj.userName,password: obj.password},function(err,doc){
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
  // var code = req.session.code;
  // if (obj.code.toUpperCase() !== code) {
  //   res.send({success: false, reason: 'code.error'});
  //   return;
  // }
  console.log(obj);
  var user = new User({
    name: obj.username,
    password: obj.password
  });
  user.save();
  res.send({status: true, messages: null, result: null});
    // var u = new User;
    // u.findExists(obj,function(err,doc){
    //   if(err) next(err);
    //   if(doc.length) {
    //     if (doc[0].name == obj.userName) {res.send({success:false,reason:'duplicate name'});return; };
    //     // if (doc[0].mobile == obj.mobile) {res.send({success:false,reason:'duplicate mobile'});return;};
    //     // if (doc[0].email == obj.email) {res.send({success:false,reason:'duplicate email'});return;};
    //   }

    // })
});

router.post("/change-password",function(req,res){
  User.update({_id:req.session.userId,password:req.body.origin},{password:req.body.password},function(err,doc){
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
