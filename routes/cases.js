var express = require('express');
var http = require('http');

var ConanGroup = require('../models/ConanGroup').ConanGroup;
var ConanCaseModel = require('../models/ConanCaseModel').ConanCaseModel;
var ConanCaseData = require('../models/ConanCaseData').ConanCaseData;

var router = express.Router();

/* 创建用例 */
router.post('/group', function(req, res) {

  // 1.创建模版组 2.模版 3.用例组 4.用例
  // 5.用例 6.数据
  /*
  pid: 项目id
  tempGroup: 模版组
  tempName: 模版名称
  caseGroup: 用例组 ~
  caseName: 用例名称 ~
  fragment:
    [{rela_path:xxxxx, elements:[[{hash:xxxx, tagName: tagName,
    type:type, id: id, className: className, name: name,
    value:value, placeholder:placeholder, baseURI:baseURI,
    innerText:innerText, href:href, xPath:”xxxx”, isFormEl: true},{一个页面的第二个element},{}]]}, {第二个页面}]
  data: [[{m_hash:xxx, value:sherry, expect:xx},{一个页面的第二个数据}],[第二个页面里的数据]] ～
  */

  var data = req.body;
  var tempGroup = new ConanGroup({
    pid: data.pid,
    name: data.tempGroup,
    isCase: false
  });
  tempGroup.save();

  var tempModel = new ConanCaseModel({
    pid: data.gid,
    name: data.tempName,
    fragment: data.fragment
  });
  tempModel.save();

  if(data.caseGroup && data.caseName){
    var caseGroup = new ConanGroup({
      pid: data.pid,
      name: data.caseGroup,
      isCase: true
    });
    caseGroup.save();

    var caseModel = new ConanCaseModel({
      pid: data.gid,
      name: data.caseName,
      fragment: data.fragment
    });
    caseModel.save();
  }

  var conanCaseData = new ConanCaseData({
    mid: data.mid,
    name: data.name,
    data: data.data
  });
  conanCaseData.save();

  res.json({status: true, messages: null,result: null});
});

/* 获取用例组 */
router.get('/groups', function(req, res) {
  var id = req.body.pid;
  var conanGroup = new ConanGroup;
  conanGroup.findById(id, function(err, groups){
    if(err){
      console.log('find groups error:%s', err);
      res.json({status: false, messages: '获取用例组失败',result: null});
      return;
    }
    res.json({status: true, messages: null,result: groups});
  });
});

/* 获取用例模版 */
router.get('/models', function(req, res) {
  var id = req.body.gid;
  var conanCaseModel = new ConanCaseModel;
  conanCaseModel.findById(id, function(err, models){
    if(err){
      console.log('find models error:%s', err);
      res.json({status: false, messages: '获取用例模版失败',result: null});
      return;
    }
    res.json({status: true, messages: null,result: models});
  });
});

/* 获取模版数据 */
router.get('/datas', function(req, res) {
  var id = req.body.mid;
  var conanCaseData = new ConanCaseData;
  conanCaseDatas.findById(id, function(err, datas){
    if(err){
      console.log('find datas error:%s', err);
      res.json({status: false, messages: '获取模版数据失败',result: null});
      return;
    }
    res.json({status: true, messages: null,result: datas});
  });
});

module.exports = router;
