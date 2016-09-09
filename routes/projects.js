var express = require('express');
var mongoose = require('mongoose');
require('express-mongoose');
var router = express.Router();
var rf = require("fs");
var models = require('../models/Project');

var project = models.Project;
mongoose.connect('mongodb://127.0.0.1:27017/api_doc');

// console.log(project.find());

/* GET home page. */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    res.render('projects/project_manager', { projects: projects });
  });
});

module.exports = router;
