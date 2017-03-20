/**
 * Created by macbook on 17/3/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var http = require('http');
var fetch = require('node-fetch');
var FormData = require('form-data');
var _ = require('lodash');
var JSONFormat = require('../helpers/jsonFormat');
const REST_METHOD = ['POST', 'GET', 'PUT', 'DELETE'];
/**
 * 模拟请求
 * method
 * headers
 * body
 * url
 * 返回 status,ok,statusText
 */
router.post('/', function(req, res, next) {
  var method = req.body.method.toUpperCase()
  var result;
  var cookie = req.body.cookies;
  var headers = {
    cookie: cookie,
    'Content-Type': req.body.headers.contentType ? req.body.headers.contentType : null,
  };
  var formData = new FormData();
  var reqUrl = '';
  checkParams(req.body)
    .then(function (e) {
      var body = null;
      if (method === 'GET' || method === 'DELETE') {
        var dataObj = JSON.parse(e.data);
        var paramsStr = "?";
        if (!req.body.isMap || req.body.isMap === 'false') {
          for (var i in dataObj) {
            (function () {
              paramsStr += i + "=" + dataObj[i] + "&";
            })(i)
          }
        } else {
          paramsStr = _.values(dataObj)[0];
        }
        reqUrl = e.url;
        if (paramsStr) {
           reqUrl += paramsStr ;
        }
        console.log(reqUrl);
      } else if (['POST','PUT'].indexOf(method) !== -1){
        reqUrl = e.url;
        body = e.data;
        console.log(reqUrl);
      }
      return fetch(reqUrl, {
        method: e.method,
        headers: headers,
        body: body
      })
  }).then(function(e) {
    result = {
      ok: e.ok,
      status: e.status,
      statusText: e.statusText,
    };
    return e.text();
  }).then(function(e) {
    res.json({success: true, resultText: e, result: result, url: reqUrl, html: new JSONFormat(e).init().html()})
  }).catch(function(e) {
    console.error(e);
    res.json({success: false, cause: e.message, result: result});
  });
});



var checkParams = function(data) {
  return new Promise(function(resolve, reject) {
    data.method = data.method.toUpperCase();
    if (!data) {
      reject();
      return;
    }
    if (!data.method || REST_METHOD.indexOf(data.method) < 0 ) {
      reject(data.method + " is not a method");
      return ;
    }
    if (!data.url) {
      reject("Url not present");
      return ;
    }
    resolve(data);
  })
};




module.exports = router;
