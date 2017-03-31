var express = require('express');
var router = express.Router();
var request = require('request');

/**
 * 跳转用户中心授权页面
 * @type {String}
 */
router.get('/login',function(req,res){
  var url = "http://account.dithub.com/oauth/authorize?response_type=code&state=xyz&client_id=conan&redirect_uri=http%3A%2F%2F127.0.0.1:9010%2Foauth%2Flogin_callback"
  res.redirect(url);
});

/**
 * 回跳,取得 授权码
 * @type {[type]}
 */
router.get('/login_callback',function(req,res){
  var code = req.query.code;
  var state = req.query.state;

  if(state != "xyz"){
    res.json({status: false, messages: '伪造回跳', result: null});
    return ;
  }
  var token_url =  "http://account.dithub.com/oauth/token";
  var params = "client_id=conan&client_secret=secret&grant_type=authorization_code&code="+code+"&redirect_uri=http%3A%2F%2F127.0.0.1:9010%2Foauth%2Flogin_callback"

  var formData = {
    client_id: "conan",
    client_secret: "secret",
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://127.0.0.1:9010/oauth/login_callback"
  }

  request.post({url: token_url, form: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('post failed:', err);
    }
    var data = JSON.parse(body);
    var access_token = data.access_token;

    var info_url = "http://account.dithub.com/userinfo";
    request.get({url: info_url, headers: {'Authorization': 'Bearer ' + access_token}}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      var data = JSON.parse(body);
      req.session.user = data.username;
      req.session.userId= data.user_id;
      req.session.cookie.user = data.username;
      res.redirect('/');
    });
  });

});

/**
 * conan登录
 * @type {[type]}
 */
router.get('/login_check',function(req,res){
  var code = req.query.code;
  var state = req.query.state;
  var access_token = req.query.access_token;

  var info_url = "http://account.dithub.com/userinfo";
  request.get({url: info_url, headers: {'Authorization': 'Bearer ' + access_token}}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    var data = JSON.parse(body);
    req.session.user = data.username;
    req.session.userId= data.user_id;
    req.session.cookie.user = data.username;
    res.json({status: true, messages: 'login.success', result: null});
    return;
  });

});

module.exports = router;
