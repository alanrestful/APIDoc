/**
 * Created by macbook on 16/9/14.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");

var exec = require('child_process').exec;
var path = require('path');

var multer  = require('multer');
var upload = multer({dest: path.join(__dirname,'../codeGenTmp')});

//java -jar swagger-codegen-cli.jar generate -i Downloads/swagger.json -l php -o ./
var cmd = 'java -jar swagger-codegen-cli.jar generate -i';
var cmdout = '-l spring -o ./codeGenTmp/';
var tmpFloderPath = 'codeGenTmp/';
var zipcmd = 'zip -r ';

router.get('/gen',function(req,res) {
    swaggerServerCodeGen(req,res);
});

router.post('/upload',upload.single('apifile'),function(req,res) {
    jsonUpload(req,res);
    res.send({file:req.file.originalname});
    res.end();
});

var swaggerServerCodeGen = function(req,res) {
    var jsonName = req.query.fileName,
        user = req.session.user,
        resFileName = user + "_serverCode",
        zipFileName = tmpFloderPath + user+ ".zip",
        tmpCodeFloder = tmpFloderPath + user;
    var zipquery = [zipcmd, zipFileName ,tmpCodeFloder].join(" ");
    var query = [cmd,tmpFloderPath + jsonName,cmdout + user, '&&',zipquery].join(' ');
    console.log(query);
    exec(query, function(err,stdout,stderr){
        if(err) {
            console.log('get api error:'+stderr);
            res.send({success:false,reason:stderr})
        } else {
            console.log(stdout);
            console.log(stderr);
            //成功了取到文件压缩
            res.download(zipFileName, resFileName + ".zip",function(err){
                if(err) {
                    console.error("download file failed:%s",err);
                }
                //删除zip
                fs.unlink(zipFileName,function(err){
                    if(err){
                        console.error("delete file [%s] failed:%s",tmpFloderPath,err);
                    }
                });
                //删除文件夹
                exec('rm -rf '+ tmpCodeFloder,function(err,stdout){
                    console.log(stdout); err && console.log(err);
                })
            });
        }
    });
};

var jsonUpload = function(req,res) {
    if(req.file){
        var tmpPath = tmpFloderPath + req.file.filename ;
        var descPath = tmpFloderPath + req.session.user + "_" + req.file.originalname;
        fs.rename(tmpPath,descPath, function(err) {
            if(err){
                throw err;
            }
            //删除临时文件
            fs.unlink(tmpPath, function(){
                if(err) {
                    throw err;
                }
            })
        })
    }
};


module.exports = router;
