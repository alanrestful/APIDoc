var express = require('express');
var router = express.Router();
var rf = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index_layout', { title: 'Express' });
});

router.get('/api_doc', function(req, res) {
  var data = rf.readFileSync(__dirname + "/swagger.json","utf-8");

  res.send(data);
});

module.exports = router;
