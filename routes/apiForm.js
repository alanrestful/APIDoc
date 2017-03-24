/**
 * Created by macbook on 2017/3/21.
 * 操作api，model可视化表格
 */
var express = require('express');
var router = express.Router();
var apiDefinitionDao = new require('../models/APIDefinition').APIDefinition();
var ApiPath = require('../models/APIPath').APIPath;

router.get('/:appId/', function(req, res, next) {
  res.render('forms/api-form',{appId: req.params.appId});
});


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

router.post('/api/path-save', function(req, res, next) {
  new ApiPath(req.body).save().then((res) => {
    res.json(res);
  }).catch((e) => {
    console.error(e);
    res.status(500).send(e.message);
  })
})

module.exports = router;
