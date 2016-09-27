var express = require('express');

var router = express.Router();

var project = require('../models/Project').Project;


router.get('/projects', function(req, res) {
  project.find(function(err, projects) {
    if(err){
      res.json({status: false, messages: 'find.projects.fail'});
    }
    res.json(projects);
  });
});

module.exports = router;
