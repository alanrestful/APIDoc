var express = require('express');
var user = require('../common/mongoose').user;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res){
  console.log("req");
  res.send("req");
});

router.post('/login', function (req, res) {
  var obj = req.body;
  var query = {name : obj.userName, password: obj.password};
  user.count(query, function(err, doc) {
    if (1 == doc) {
      console.log(obj.userName + " login success");
      res.send(true);
    } else {
      console.log(obj.userName + " login failed");
      res.send(false);
    }
  });
});

module.exports = router;
