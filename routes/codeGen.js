/**
 * Created by macbook on 16/9/14.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var config = require('config');

var exec = require('child_process').exec;
var path = require('path');

var multer  = require('multer');
var upload = multer({dest: path.join(__dirname,'../codeGenTmp')});

//java -jar swagger-codegen-cli.jar generate -i Downloads/swagger.json -l php -o ./
var cmd = 'java -jar swagger-codegen-cli.jar generate -i';
var cmdout = '-l spring -o ./codeGenTmp/';
var tmpFloderPath = 'codeGenTmp/';
var zipcmd = 'zip -r ';

var defaultLink = config.get("host") +  "/codegen/download/";

/**
 * 生成服务端,已上传json
 */
router.get('/gen',function(req,res) {
    swaggerServerCodeGen(req,res);
});

/**
 * 上传文件json
 */
router.post('/upload',upload.single('apifile'),function(req,res) {
    jsonUpload(req,res);
    res.send({file:req.file.originalname});
    res.end();
});

/**
 * 上传文件同时生成服务端下载
 */
router.post('/gen-by-file',upload.single('apiJson'),function(req,res){
    var type = req.body.type;
    jsonUpload(req, res);
    swaggerServerCodeGen(req,res,req.session.user + "_" + req.file.originalname,type ,true);
});

/**
 * 可接收的服务列表
 */
router.get('/servers' , function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.send(config.get("codeGen.servers"));
});

router.options('/servers/:type', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.send();
}).post('/servers/:type', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var type = req.params.type;
    //将json写入文件
    var jsonString = JSON.stringify(req.body.spec);
    var jsonFile = req.sessionID + new Date().getTime() + ".json";
    fs.writeFile(tmpFloderPath + jsonFile, jsonString ,{} , function(err){
        if (err) res.send({success:false});
        swaggerServerCodeGen(req, res, jsonFile, type);
    });
});

router.get("/download/:name", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var name = req.params.name;
    var tmpCodeFloder = tmpFloderPath + req.sessionID;
    res.download(tmpFloderPath + name + ".zip" , tmpFloderPath + name + ".zip", function (err) {
        if (err) {
            console.error("download file failed:%s", err);
        }
        //删除zip
        fs.unlink(tmpFloderPath + name + ".zip", function (err) {
            if (err) {
                console.error("delete file [%s] failed:%s", tmpFloderPath, err);
            }
        });
        //删除文件夹
        exec('rm -rf ' + tmpCodeFloder, function (err, stdout) {
            console.log(stdout);
            err && console.log(err);
        })
    });
});

/**
 * 生成服务端的实现
 * @param req
 * @param res
 * @param fileName
 * @param type
 * @param down
 */
var swaggerServerCodeGen = function(req,res,fileName,type , down ) {
    if(type){
        cmdout = cmdout.replace("spring",type);
    }
    var jsonName = fileName ||req.query.fileName,
        user = req.sessionID,
        resFileName = user + "_serverCode",
        zipFileName = tmpFloderPath + user+ ".zip",
        tmpCodeFloder = tmpFloderPath + user;
    var zipquery = [zipcmd, zipFileName ,tmpCodeFloder].join(" ");
    var query = [cmd,tmpFloderPath + jsonName,cmdout + user, '&&',zipquery].join(' ');
    console.log(query);
    try {
        exec(query, function (err, stdout, stderr) {
            if (err) {
                fs.unlink(tmpFloderPath + jsonName, function () {
                    if (err) {
                        console.error("delete file %s failed",jsonName);
                        next(err);
                    }
                });
                console.log('get api error:' + stderr);
                res.send({success: false, reason: stderr});
            } else {
                console.log(stdout);
                console.log(stderr);
                //成功了取到文件压缩
                if (down) {
                    res.download(zipFileName, resFileName + ".zip", function (err) {
                        if (err) {
                            console.error("download file failed:%s", err);
                        }
                        //删除zip
                        fs.unlink(zipFileName, function (err) {
                            if (err) {
                                console.error("delete file [%s] failed:%s", tmpFloderPath, err);
                            }
                        });
                        //删除文件夹
                        exec('rm -rf ' + tmpCodeFloder, function (err, stdout) {
                            console.log(stdout);
                            err && console.log(err);
                        })
                    });
                } else {
                    res.send({code:zipFileName.replace(".zip",""),link:defaultLink + req.sessionID });
                }
            }
        });
    }catch(e){
        console.error(e);
        res.send(false);
    }
};

/**
 * 上传文件
 * @param req
 * @param res
 * @param next
 */
var jsonUpload = function(req,res,next) {
    if(req.file){
        var tmpPath = tmpFloderPath + req.file.filename ;
        var descPath = tmpFloderPath + req.session.user + "_" + req.file.originalname;
        try {
            fs.rename(tmpPath, descPath, function (err) {
                if (err) {
                    next(err);
                }
                console.log("make new file:%s", descPath);
                //删除临时文件
                fs.unlink(tmpPath, function () {
                    if (err) {
                        next(err);
                    }
                })
            })
        }catch(exception){
            console.error(exception);
            res.send(false);
        }
    }
};


module.exports = router;
