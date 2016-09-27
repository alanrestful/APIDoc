var express = require('express');
var http = require('http');

var ConanGroup = require('../models/ConanGroup').ConanGroup;
var ConanCaseModel = require('../models/ConanCaseModel').ConanCaseModel;
var ConanCaseData = require('../models/ConanCaseData').ConanCaseData;

var router = express.Router();

/* 创建用例 */
router.post('/', function(req, res) {
  var data = req.body;
  var conanGroup = new ConanGroup({
    pid: data.pid,
    name: data.name,
    flag: data.flag
  });
  conanGroup.save();

  var conanCaseModel = new ConanCaseModel({
    pid: data.pid,
    name: data.name,
    fragment: data.flag
  });
  conanCaseModel.save();

  var conanCaseData = new ConanCaseData({
    mid: data.pid,
    name: data.name,
    data: data.data
  });
  conanCaseData.save();
  res.json({status: true, messages: 'success'});
});

router.get('/groups', function(req, res) {
  var id = req.body.pid;
  var conanGroup = new ConanGroup;
  conanGroup.findById(id, function(err, groups){
    if(err){
      res.json({status: false, messages: err});
      return;
    }
    res.json(groups);
  });
});

router.post('/group', function(req, res) {
  var obj = req.body;
  var conanGroup = new ConanGroup({
    pid: obj.pid,
    name: obj.name,
    flag: obj.flag
  });
  conanGroup.save();
  res.json({status: false, messages: 'success'});
});

router.get('/models', function(req, res) {
  var id = req.body.gid;
  var conanCaseModel = new ConanCaseModel;
  conanCaseModel.findById(id, function(err, models){
    if(err){
      res.json({status: false, messages: err});
      return;
    }
    res.json(models);
  });
});

router.post('/model', function(req, res) {
  var obj = req.body;
  var conanCaseModel = new ConanCaseModel({
    gid: obj.gid,
    name: obj.name,
    fragment: obj.flag
  });
  conanCaseModel.save();
  res.json({status: false, messages: 'success'});
});

router.get('/datas', function(req, res) {
  var id = req.body.mid;
  var conanCaseData = new ConanCaseData;
  conanCaseDatas.findById(id, function(err, datas){
    if(err){
      res.json({status: false, messages: err});
      return;
    }
    res.json(datas);
  });
});

router.post('/data', function(req, res) {
  var obj = req.body;
  var conanCaseData = new ConanCaseData({
    gid: obj.gid,
    name: obj.name,
    fragment: obj.flag
  });
  conanCaseData.save();
  res.json({status: true, messages: 'success'});
});

router.get('/result', function(req, res) {

  res.json();
});

router.post('/result', function(req, res) {
  var obj = req.body;
  var conanResult = new conanResult({
    did: obj.did,
    result: obj.result
  });
  conanResult.save();
  res.json({status: true, messages: 'success'});
});

module.exports = router;
