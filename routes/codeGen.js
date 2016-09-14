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
var tmpPath = 'codeGenTmp/';
var zipcmd = 'zip -r ';

router.get('/gen',function(req,res) {
    var zipquery = zipcmd +tmpPath + req.session.user + ".zip " + tmpPath + req.session.user;
    var query = [cmd,tmpPath+'admin_swagger.json',cmdout+req.session.user, '&&',zipquery].join(' ');
    console.log(query);
    exec(query, function(err,stdout,stderr){
        if(err) {
            console.log('get weather api error:'+stderr);
        } else {
            console.log(stdout);
            console.log(stderr);
            //成功了取到文件压缩
        }
    });
    // res.setRequestHeader('Content-disposition', 'attachment; filename=all_student.csv');
    // res.writeHeader(200, {
    //     'Content-Type': 'text/csv'
    // });
    res.end();
});

router.post('/upload',upload.single('apifile'),function(req,res) {
    if(req.file){

        var tmpPath = tmpPath + req.file.filename ;
        var descPath = tmpPath + req.session.user + "_" + req.file.originalname;
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
    res.send({file:req.file.originalname});
    res.end();
});



module.exports = router;
