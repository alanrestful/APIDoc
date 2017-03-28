/**
 * Created by macbook on 17/3/15.
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const http = require('http');
const fetch = require('node-fetch');
const FormData = require('form-data');
const _ = require('lodash');
const JSONFormat = require('../helpers/jsonFormat');
const REST_METHOD = ['POST', 'GET', 'PUT', 'DELETE'];

const Application = require('../models/Application').Application;
const Project = require('../models/Project').Project;
const mongoose = require('mongoose');
/**
 * 模拟请求代理
 * method
 * headers
 * body
 * url
 * 返回 status,ok,statusText
 */
router.post('/', function(req, res, next) {
  let method = req.body.method.toUpperCase()
  let result;
  let cookie = req.body.cookies;
  let headers = {
    cookie: cookie,
    'Content-Type': req.body.headers.contentType ? req.body.headers.contentType : null,
  };
  let formData = new FormData();
  let reqUrl = '';
  let _application;
  //从db里拿到application，project，找到对应环境
  Application.find({_id: mongoose.Types.ObjectId(req.body.appId)}).then(function(applications) {
    if (!applications || applications.length === 0) throw new Error('application not exist: ' + req.body.appId);
    let application = applications[0];
    _application = application;
    return Project.find({_id: mongoose.Types.ObjectId(application['projectId'])})
  }).then(function(projects) {
    if (!projects || projects.length === 0) return new Error('project not exist: ' + _application['projectId']);
    let project = projects[0];
    project['env_json'].map(function(item, i, array) {
      if (item.name == _application.env) {
        //找到的环境url与传来的path组合
        reqUrl = item.domain + req.body.path;
        req.body.url = reqUrl ;
      }
    })
    return checkParams(req.body);
  }).then(function (e) {
      let body = null;
      if (method === 'GET' || method === 'DELETE') {
        let dataObj = JSON.parse(e.data);
        let paramsStr = "?";
        if (!req.body.isMap || req.body.isMap === 'false') {
          paramsStr += encodeParam(dataObj);
        } else {
          paramsStr = _.values(dataObj)[0];
        }
        reqUrl = e.url;
        if (paramsStr) {
           reqUrl += paramsStr ;
        }
        console.log(reqUrl);
      } else if (['POST','PUT'].indexOf(method) !== -1){
        //todo post有内容类型没有去做
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
          body=encodeParam(JSON.parse(e.data));
        } else {
          body = e.data;
        }
        reqUrl = e.url;
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



let checkParams = function(data) {
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

function encodeParam(dataObj) {
  let paramsStr = '';
  for (let i in dataObj) {
    (function () {
      paramsStr += i + "=" + dataObj[i] + "&";
    })(i)
  }
  return paramsStr;
}