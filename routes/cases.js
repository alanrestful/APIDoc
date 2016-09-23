var express = require('express');
// var Case = require('../models/Case').Case;
var http = require('http');
// var ccap = require('ccap');
var async = require('async');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('cases/case_manager', {title: 'case管理'});
});

module.exports = router;
