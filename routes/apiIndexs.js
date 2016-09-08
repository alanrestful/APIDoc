var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("message");
  res.render('index_layout', { title: 'Express' });
});

module.exports = router;
