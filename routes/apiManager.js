var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var data = apiManagerDao.List({
        success:function(data){
            res.render('api_manager', {data:data});
        }
    });
    // var data = [];
    // data.push({title:'冀东水泥api',version:'1.0.0',code:'083333',name:'冀东水泥',createdAt:'2016-04-08',link:'mall.jidd.com.cn'});
    // data.push({title:'红石水泥api',version:'1.0.0',code:'082333',name:'红石水泥',createdAt:'2016-04-08',link:'mall.hongshi.com.cn'});
    // res.render('api_manager', {data:data});
});

module.exports = router;
