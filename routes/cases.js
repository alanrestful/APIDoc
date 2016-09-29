var express = require('express');
var http = require('http');

var ConanGroup = require('../models/ConanGroup').ConanGroup;
var ConanCaseModel = require('../models/ConanCaseModel').ConanCaseModel;
var ConanCaseData = require('../models/ConanCaseData').ConanCaseData;

var router = express.Router();

/* 创建组 */
router.post('/group', function(req, res) {

  /*
  pid: 项目id
  tempGroup: 模版组
  tempName: 模版名称
  fragment:
    [{rela_path:xxxxx, elements:[[{hash:xxxx, tagName: tagName,
    type:type, id: id, className: className, name: name,
    value:value, placeholder:placeholder, baseURI:baseURI,
    innerText:innerText, href:href, xPath:”xxxx”, isFormEl: true},{一个页面的第二个element},{}]]}, {第二个页面}]
  data: [[{m_hash:xxx, value:sherry, expect:xx},{一个页面的第二个数据}],[第二个页面里的数据]] ～
  */

  var data = req.body;
  if(data.pid){
    res.json({status: false, messages: '项目ID不能为空',result: null});
    return;
  }
  if(data.tempGroup){
    res.json({status: false, messages: '组不能为空',result: null});
    return;
  }
  if(data.tempName){
    res.json({status: false, messages: '名称不能为空',result: null});
    return;
  }
  var conanGroup = new ConanGroup({
    pid: data.pid,
    name: data.tempGroup
  });
  conanGroup.save();

  var conanCaseModel = new ConanCaseModel({
    pid: conanGroup._id,
    name: data.tempName,
    fragment: data.fragment
  });
  conanCaseModel.save();

  var conanCaseData = new ConanCaseData({
    mid: conanCaseModel._id,
    name: data.name,
    data: data.data
  });
  conanCaseData.save();

  res.json({status: true, messages: null,result: null});
});

/* 获取用例组 */
router.get('/groups', function(req, res) {
  var id = req.query.pid;
  if(id){
    res.json({status: false, messages: '项目ID不能为空',result: null});
    return;
  }
  var conanGroup = new ConanGroup;
  conanGroup.findByPid(id, function(err, groups){
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
  var id = req.query.gid;
  if(id){
    res.json({status: false, messages: '组ID不能为空',result: null});
    return;
  }
  var conanCaseModel = new ConanCaseModel;
  conanCaseModel.findByGid(id, function(err, models){
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
  var id = req.query.mid;
  if(id){
    res.json({status: false, messages: '模版ID不能为空',result: null});
    return;
  }
  var conanCaseData = new ConanCaseData;
  conanCaseDatas.findByMid(id, function(err, datas){
    if(err){
      console.log('find datas error:%s', err);
      res.json({status: false, messages: '获取模版数据失败',result: null});
      return;
    }
    res.json({status: true, messages: null,result: datas});
  });
});

module.exports = router;
