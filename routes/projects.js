var express = require('express');
var router = express.Router();
var rf = require("fs");
var models = require('../models/Project');

var project = models.Project;

/* GET home page. */
router.get('/', function(req, res) {
  project.find(function(err, projects) {
    res.render('projects/project_manager', { projects: projects });
  });
});

module.exports = router;
