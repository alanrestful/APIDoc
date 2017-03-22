/**
 * Created by macbook on 2017/3/21.
 * 操作api，model可视化表格
 */
var express = require('express');
var router = express.Router();

router.get('/:appId/', function(req, res, next) {
  res.render('forms/api-form',null);
});

module.exports = router;
