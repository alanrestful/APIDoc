var express = require('express');
var http = require('http');

var ConanGroup = require('../models/ConanGroup').ConanGroup;
var ConanCaseModel = require('../models/ConanCaseModel').ConanCaseModel;
var ConanCaseData = require('../models/ConanCaseData').ConanCaseData;

var router = express.Router();

/* 创建组 */
router.post('/group', function(req, res) {
  var data = req.body;
  if(!data.pid){
    res.json({status: false, messages: '项目ID不能为空',result: null});
    return;
  }
  if(!data.tempGroup){
    res.json({status: false, messages: '组不能为空',result: null});
    return;
  }
  if(!data.tempName){
    res.json({status: false, messages: '名称不能为空',result: null});
    return;
  }
  var conanGroup = new ConanGroup;
  conanGroup.findOrSave(data.pid, data.tempGroup, function(err, group){
    if(err){
      console.log('find groups error:%s', err);
      res.json({status: false, messages: '获取失败',result: null});
      return;
    }
    var conanCaseModel = new ConanCaseModel({
      gid: group._id,
      name: data.tempName,
      fragment: data.fragment
    });
    conanCaseModel.save(function(err, model){
      if(err){
        console.log('save model error:%s', err);
        res.json({status: false, messages: '保存失败',result: null});
        return;
      }
      var conanCaseData = new ConanCaseData({
        mid: model._id,
        name: data.tempName,
        data: data.data
      });
      conanCaseData.save();

      res.json({status: true, messages: null,result: null});
    });
  });

});

/* 获取用例组 */
router.get('/groups', function(req, res) {
  var id = req.query.pid;
  if(!id){
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

/* 删除用例组 */
router.delete('/groups', function(req, res) {
  var id = req.query.gid;
  if(!id){
    res.json({status: false, messages: '组ID不能为空',result: null});
    return;
  }

  ConanGroup.remove({_id: id}, function(err) {
    if(err) {
      console.log('delete group error:%s', err);
      res.json({status: false, messages: '删除失败', result: null});
      return;
    }
    ConanCaseModel.remove({gid: id}, function(err) {
      if(err) {
        console.log('delete model error:%s', err);
        res.json({status: false, messages: '删除失败', result: null});
        return;
      }
      res.json({status: true, messages: null, result: null});
    });
  });
});

/* 获取用例模版 */
router.get('/models', function(req, res) {
  var id = req.query.gid;
  if(!id){
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

/* 获取用例数据列表 */
router.get('/datas', function(req, res) {
  var id = req.query.mid;
  if(!id){
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

/* 获取用例模版 + 用例数据 */
router.get('/datas', function(req, res) {
  var id = req.query.did;
  if(!id){
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
});


module.exports = router;
