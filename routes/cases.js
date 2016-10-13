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

  var cases = fragmentHandle(data.fragment);

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
      fragment: JSON.stringify(cases.fragment)
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
        data: JSON.stringify(cases.data)
      });
      conanCaseData.save();
      res.json({status: true, messages: null,result: null});
    });
  });

});

/**
 * 创建用例case
 * @type {[type]}
 */
router.post('/', function(req, res) {
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

/*
[{rela_path:xxxxx, expect:xx, [{expect:"xxxx", href:"ss", xPath:"xxxx", isFormEl: true},{同一页面其他元素}]},{其他页面}]
 */

/**
 [{m_hash:xxx,value:sherry,expect:xx},{}]
 */

function fragmentHandle(fragment){
  var frags = JSON.parse(fragment);
  var datas = {};
  // 循环多个页面
  for(var f in frags){
    var hash = parseInt(Math.random()*10000) + new Date().getTime();
    frags[f].hash = hash;
    console.log(typeof(frags[f].expect));
    if(typeof(frags[f].expect) != "undefined"){
      console.log(1);
      datas[hash] = {expect: frags[f].expect};
      delete frags[f].expect;
    }else{
        console.log(2);
      datas[hash] = {expect: ''};
    }
    // 循环多个元素
    for(var e in frags[f].tArray){
      var hash = parseInt(Math.random()*10000) + new Date().getTime();
      frags[f].tArray[e].hash = hash;
      if(typeof(frags[f].tArray[e].expect) != "undefined" && typeof(frags[f].tArray[e].value) != "undefined"){
        datas[hash] = {expect: frags[f].tArray[e].expect, value: frags[f].tArray[e].value};
        delete frags[f].tArray[e].expect;
      }else if(typeof(frags[f].tArray[e].expect) != "undefined"){
        datas[hash] =  {expect: frags[f].tArray[e].expect, value: ''};
        delete frags[f].tArray[e].expect;
      }else if(typeof(frags[f].tArray[e].value) != "undefined"){
        datas[hash] = {expect: '', value: frags[f].tArray[e].value};
      }
    }
  }
  return {"fragment": frags, "data": datas};
}

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

/* 获取用例模版 */
router.get('/model', function(req, res) {
  var id = req.query.mid;
  if(!id){
    res.json({status: false, messages: '模版ID不能为空',result: null});
    return;
  }
  ConanCaseModel.findOne({_id: id}, function(err, model){
    if(err){
      console.log('find models error:%s', err);
      res.json({status: false, messages: '获取用例模版失败',result: null});
      return;
    }
    res.json({status: true, messages: null,result: model});
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
  conanCaseData.findByMid(id, function(err, datas){
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
    conanCaseData.findByMid(id, function(err, datas){
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
