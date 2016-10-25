var express = require('express');
var http = require('http');
var fs = require("fs");

var ConanGroup = require('../models/ConanGroup').ConanGroup;
var ConanCaseModel = require('../models/ConanCaseModel').ConanCaseModel;
var ConanCaseData = require('../models/ConanCaseData').ConanCaseData;

var router = express.Router();
var path = require('path');
var multer = require('multer');
var upload = multer({dest: path.join(__dirname, '../temp/')});

/**
 * 创建模版组
 * @type {[type]}
 */
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

  var result = {};
  var conanGroup = new ConanGroup;
  conanGroup.findOrSave(data.pid, data.tempGroup, function(err, group){
    if(err){
      console.log('find groups error:%s', err);
      res.json({status: false, messages: '获取失败',result: null});
      return;
    }
    result.group = group;
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
      result.model = model;
      var conanCaseData = new ConanCaseData({
        mid: model._id,
        name: data.tempName,
        data: JSON.stringify(cases.data)
      });
      conanCaseData.save();
      res.json({status: true, messages: null,result: result});
    });
  });

});

/**
 * 获取用例组
 * @type {[type]}
 */
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

/**
 * 删除用例组
 * @type {[type]}
 */
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


/**
 * 创建用例模版和用例数据
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

  var result = {};
  var conanGroup = new ConanGroup;
  conanGroup.findOrSave(data.pid, data.tempGroup, function(err, group){
    if(err){
      console.log('find groups error:%s', err);
      res.json({status: false, messages: '获取失败',result: null});
      return;
    }
    result.group = group ;
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
      result.model = model;
      var conanCaseData = new ConanCaseData({
        mid: model._id,
        name: data.tempName,
        data: data.data
      });
      conanCaseData.save();
      res.json({status: true, messages: null,result: result});
    });
  });

});

/**
 * 对模版数据进行hash处理
 * @param  {[type]} fragment [description]
 * @return {[type]}          [description]
 */
function fragmentHandle(fragment){
  var frags = JSON.parse(fragment);
  var datas = {};
  // 循环多个页面
  for(var f in frags){
    var hash = parseInt(Math.random()*10000) + new Date().getTime();
    frags[f].hash = hash;
    if(typeof(frags[f].expect) != "undefined"){
      datas[hash] = {expect: frags[f].expect};
      delete frags[f].expect;
    }else{
      datas[hash] = {expect: ''};
    }
    delete frags[f].expectEditing;
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
      delete frags[f].tArray[e].expectEditing;
    }
  }
  return {"fragment": frags, "data": datas};
}

/**
 * 获取用例模版
 * @type {[type]}
 */
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

/**
 * 获取用例模版
 * @type {[type]}
 */
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


/**
 * 更新用例模版名称
 * @type {[type]}
 */
router.put('/model', function(req, res) {
  var id = req.body.mid;
  var name = req.body.name;
  if(!id){
    res.json({status: false, messages: '模版ID不能为空',result: null});
    return;
  }
  if(!name){
    res.json({status: false, messages: '名称不能为空',result: null});
    return;
  }
  ConanCaseModel.update({_id: id},{$set: {name: name}}, function(err) {
    if(err) {
      console.log('update project error:%s', err);
      res.json({status: false, messages: '更新项目失败', result: null});
      return;
    }
    res.json({status: true, messages: null, result: null});
  });
});


/**
 * 删除单个用例模版
 * @type {[type]}
 */
router.delete('/model', function(req, res) {
  var id = req.query.mid;
  if(!id){
    res.json({status: false, messages: '组ID不能为空',result: null});
    return;
  }

  ConanCaseModel.remove({_id: id}, function(err) {
    if(err) {
      console.log('delete model error:%s', err);
      res.json({status: false, messages: '删除失败', result: null});
      return;
    }
    ConanCaseData.remove({mid: id}, function(err) {
      if(err) {
        console.log('delete data error:%s', err);
        res.json({status: false, messages: '删除失败', result: null});
        return;
      }
      res.json({status: true, messages: null, result: null});
    });
  });
});

/**
 * 获取用例数据列表
 * @type {[type]}
 */
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

/**
 * 获取用例模版 + 用例数据
 * @type {[type]}
 */
router.get('/data', function(req, res) {
  var id = req.query.did;
  if(!id){
    res.json({status: false, messages: '组ID不能为空',result: null});
    return;
  }
  var result = {};
  ConanCaseData.findOne({_id: id}).exec()
    .catch(function(err) {
      console.log('find datas error:%s', err);
      res.json({status: false, messages: '获取模版数据失败',result: null});
      return;
    })
    .then(function(data) {
      result.data = data;
      return ConanCaseModel.findOne({_id: data.mid}).exec();
    })
    .catch(function(val) {
      console.log('find models error:%s', err);
      res.json({status: false, messages: '获取用例模版失败',result: null});
      return;
    })
    .then(function(model) {
      result.model = model;
      res.json({status: true, messages: null,result: result});
    });
});

/**
 * 新增用例数据
 * @type {[type]}
 */
router.post('/data', function (req, res) {
    var mid = req.body.mid;
    var name = req.body.name;
    var data = req.body.data;
    ConanCaseModel.findOne({_id: mid}, function(err, model){
      if(err || model == null){
        console.log('find models error:%s', err);
        res.json({status: false, messages: '获取用例模版失败',result: null});
        return;
      }
      var conanCaseData = new ConanCaseData({
        mid: mid,
        name: name,
        data: data
      });
      conanCaseData.save(function(err, dd){
        if(err){
          console.log('save data error:%s', err);
          res.json({status: false, messages: '新增失败',result: null});
          return;
        }
        res.json({status: true, messages: null, result: dd});
      });

    });
});

/**
 * 修改单个用例数据
 * @type {[type]}
 */
router.put('/data', function (req, res) {
    var did = req.body.did;
    var name = req.body.name;
    var data = JSON.parse(req.body.data);
    ConanCaseData.update({_id: did},{$set: {name: name, data: data}}).exec()
      .catch(function(err) {
        console.log('update data error:%s', err);
        res.json({status: false, messages: '修改失败', result: null});
        return;
      })
      .then(function(data) {
        res.json({status: true, messages: null, result: null});
      });
});

/**
 * 删除单个用例数据
 * @type {[type]}
 */
router.delete('/data', function (req, res) {
    var did = req.query.did;
    ConanCaseData.remove({_id: did}, function(err, d) {
      if(err) {
        console.log('delete data error:%s', err);
        res.json({status: false, messages: '删除失败', result: null});
        return;
      }
      res.json({status: true, messages: null, result: null});
    });
});

/**
 * 修改单个hash用例数据
 * @type {[type]}
 */
router.put('/hdata', function (req, res) {
  var did = req.body.did;
  var hash = req.body.hash;
  var hdata = req.body.data;

  ConanCaseData.findOne({_id: did}, function(err, data){
    if(err){
      console.log('find data error:%s', err);
      res.json({status: false, messages: '查询失败',result: null});
      return;
    }
    var obj = JSON.parse(data.data);
    if(obj[hash]){
      obj[hash] = JSON.stringify(hdata);
    }
    var o = JSON.stringify(obj);
    ConanCaseData.update({_id: did},{$set: {data: o}}, function(err, data){
      if(err){
        console.log('update hash data error:%s', err);
        res.json({status: false, messages: '修改失败',result: null});
        return;
      }
      res.json({status: true, messages: null,result: null});
    });
  });

});

/**
 * 下载用例json文件
 * @type {[type]}
 */
router.get('/json/:id',function(req,res,next){
  var id = req.params.id;
  if(!id){
    console.log('find models error:%s', err);
    res.json({status: false, messages: '查询用例模版失败',result: null});
    return;
  }
  ConanCaseModel.findOne({_id: id}, {}, function(err, model){
    if(err){
      console.log('find models error:%s', err);
      res.json({status: false, messages: '获取用例模版失败',result: null});
      return;
    }
    var fragment = JSON.parse(model.fragment);
    var data = {};
    data[fragment[0].hash] = {expect:""};
    for(var i in fragment[0].tArray){
      if(typeof(fragment[0].tArray[i].value) != "undefined"){
        data[fragment[0].tArray[i].hash] = {expect: "", value: fragment[0].tArray[i].value};
      }else{
        data[fragment[0].tArray[i].hash] = {expect: "", value: ""};
      }
    }
    var filename = model.name;
    fs.writeFileSync('./temp/output.json',JSON.stringify(data, null, 2));
    // // var JsonObj=JSON.parse(fs.readFileSync('./output.json'));
    // // console.log(JsonObj);
    res.download('./temp/output.json', filename+'.json');
  });
});

/**
 * 导入用例数据
 * @type {[type]}
 */
router.post('/import-data', upload.single('file'), function (req, res) {
    console.log(req.file);  // 上传的文件信息
    var fdata = fs.readFileSync(req.file.path, "utf-8");
    var data = JSON.parse(fdata);
    var mid = req.body.mid;
    ConanCaseModel.findOne({_id: mid}, function(err, model){
      if(err || model == null){
        console.log('find models error:%s', err);
        res.json({status: false, messages: '获取用例模版失败',result: null});
        return;
      }
      var conanCaseData = new ConanCaseData({
        mid: model._id,
        name: model.name,
        data: data
      });
      conanCaseData.save();
      res.json({status: true, messages: null, result: null});
    });
});

module.exports = router;
