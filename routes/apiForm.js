/**
 * Created by macbook on 2017/3/21.
 * 操作api，model可视化表格
 */
let express = require('express');
let router = express.Router();
let apiDefinitionDao = new require('../models/APIDefinition').APIDefinition();
let ApiDefinition = require('../models/APIDefinition').APIDefinition;
let ApiPath = require('../models/APIPath').APIPath;

let Application = require('../models/Application').Application;



/**
 * 获取模型定义值
 */
router.get('/api/models', function(req, res, next) {
  apiDefinitionDao.findByAid(req.query.appId).then((result) => {
    res.json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).send(e.message);
  })
});

router.post('/api/models/save', function(req, res, next) {
  let model = req.body.data;
  let apiDefinition = new ApiDefinition({
    applicationId: req.body.appId,
    definition_json: model
  });
  //先查找再保存
  apiDefinition.findByRef(req.body.appId, Object.keys(model)[0]).then((result) => {
    if (result && result.length > 0) {
      res.status(500).json({success: false, message: '已存在'});
      return ;
    }
    return apiDefinition.save();
  })
  .then((result) => {
    res.json({})
  }).catch((e) => {
    console.log(e);
    res.json({success: false})
  })
});

router.post('/api/path-save', function(req, res, next) {
  new ApiPath(req.body).save().then((res) => {
    res.json(res);
  }).catch((e) => {
    console.error(e);
    res.status(500).send(e.message);
  })
})

module.exports = router;

