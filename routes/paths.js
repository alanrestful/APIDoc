var express = require('express');
var router = express.Router();
var rf = require("fs");
var http = require('http');
var application = require('../models/Application').Application;
var apiDocument = require('../models/APIDocument').APIDocument;
var apiPath = require('../models/APIPath').APIPath;
var apiDifinition = require('../models/APIDifinition').APIDifinition;

var multer  = require('multer');

/* GET page. */
router.get('/', function(req, res) {
  if(!req.query.aid){
      res.redirect('./projects');
  }else{
    apiPath.find({"applicationId": req.query.aid}, function (err, paths){
      apiPath.findOne({"applicationId": req.query.aid, _id: req.query.id}, function(err, path){
          res.render('paths/path_manager', {paths: paths, path: path, aid: req.query.aid, _id: req.query.id});
      });

    });
  }
});

module.exports = router;
