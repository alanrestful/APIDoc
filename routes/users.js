var express = require('express');
var User = require('../models/User').User;
var http = require('http');
var async = require('async');

var router = express.Router();

// 新建用户
router.post('/', function (req, res) {
  var obj = req.body;
  User.findOne({name : obj.name},function(err,doc){
    if(err){
      console.log('save user error:%s', err);
      res.json({status: false, messages: '新建用户失败', result: null});
      return;
    }
    if (doc){
      res.json({status: false, messages: '用户名已存在', result: null});
      return;
    }
    var user = new User({
      name: obj.name,
      mobile: obj.mobile,
      position: obj.position
    });
    user.save();
    res.json({status: true, messages: null, result: null});
  })
});

// 修改用户信息
router.put('/', function (req, res) {
  var data = req.body;
  User.update({_id: data._id},{$set: {mobile: data.mobile, position: data.position}}, function(err) {
    if(err) {
      console.log('update user error:%s', err);
      res.json({status: false, messages: '更新用户失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: null});
  });
});

// 根据ID获取用户信息
router.get('/id/:id', function (req, res) {
  var id = req.params.id;
  if(!id){
    res.json({status: false, messages: '用户ID不能为空', result: null});
    return;
  }
  User.findOne({_id : id},function(err, user){
    if(err){
      console.log('find user error:%s', err);
      res.json({status: false, messages: '查询用户信息失败', result: null});
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
router.delete('/id/:id', function(req, res) {
  var id = req.params.id;
  if(!id){
    res.json({status: false, messages: '用户ID不能为空', result: null});
    return;
  }
  User.remove({_id: id}, function(err) {
    if(err) {
      console.log('delete user error:%s', err);
      res.json({status: false, messages: err, result: null});
      return;
    }
    console.log('delete user success!');
    res.json({status: true, messages: null, result: null});
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

// 用户登录
router.post('/login', function (req, res) {
  var obj = req.body;
  User.findOne({name: obj.userName,password: obj.password},function(err, user){
    if (!user) {
      res.json({status: false, messages: '登录失败', result: null});
      return;
    }
    console.log(user);
    req.session.user = obj.userName;
    req.session.userId= user._id;
    req.session.cookie.user = obj.userName;
    res.json({status: true, messages: null, result: user});
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
  res.json({status: true, messages: null, result: null});
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

//修改密码
router.post("/change-pwd",function(req,res){
  User.update({_id:req.session.userId,password:req.body.origin},{password:req.body.password},function(err,doc){
    if(err){
      console.log('delete user error:%s', err);
      res.json({success:false, messages: '密码更新失败', result: null});
      return;
    }
    if(doc.n == 0) {
      res.json({success:false, messages: "密码更新失败", result: null});
      return;
    }
    if (doc.nModified) {
      res.json({success:true, messages: null, result: null});
    }
  });
});

module.exports = router;
