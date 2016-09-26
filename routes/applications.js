var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var http = require('http');
var Application = require('../models/Application').Application;
var apiDocument = require('../models/APIDocument').APIDocument;
var apiPath = require('../models/APIPath').APIPath;
var apiDefinition = require('../models/APIDefinition').APIDefinition;
var updateLogs = require('../models/UpdateLogs').UpdateLogs;
var JsonComparer = require("../helpers/json-processor/json-compare").json_comparer;

var multer = require('multer');
var upload = multer({dest: path.join(__dirname, '../temp/')});

/* GET page. */
/* 获取项目应用 */
router.get('/', function (req, res) {
    var app = new Application;
    app.findByPidAndEnv(req.query.id, req.query.env, function (err, apps) {
        if (err) {
            res.json({status: false, messages: err});
            return;
        }
        res.json(apps);
    })
});

router.get('/id/:id', function (req, res, next) {
    var aid = req.params.id;
    if (!aid) {
        res.redirect('../projects');
    } else {
        var path = new apiPath;
        path.findByAid(aid, function (err, paths) {
            if (err) {
                res.json({status: false, messages: err});
                return;
            }
            apiDocument.find({"applicationId": aid}, function (err, document) {
                if (err) next(err);
                var nav = {};
                for (var path in paths) {
                    for (var p in paths[path]["path_json"]) {
                        for (var m in paths[path]["path_json"][p]) {
                            if (!nav[paths[path]["path_json"][p][m].tags[0]]) {
                                nav[paths[path]["path_json"][p][m].tags[0]] = [];
                            }
                            if (nav[paths[path]["path_json"][p][m].tags[0]].indexOf(paths[path]["path_json"][p][m].summary) == -1) {
                                nav[paths[path]["path_json"][p][m].tags[0]].push(paths[path]["path_json"][p][m].summary);
                            }
                        }
                    }
                }
                var arr = [];
                for (var n in nav) {
                    nav[n].sort(function (a, b) {
                        return a < b ? -1 : 1;
                    });
                    arr.push({name: n, key: nav[n]})
                }
                arr.sort(function (a, b) {
                    return a.name < b.name ? -1 : 1;
                });
                res.render('applications/application_manager', {nav: arr, paths: paths, document: document, aid: aid});
            });
        });
    }
});

/* 创建应用 */
router.post('/', function (req, res, next) {
    console.log(req.body);
    var envArr = JSON.parse(req.body.envJson);
    for (var e in envArr) {
        var app = new Application({
            projectId: req.body.projectId,
            name: req.body.name,
            owner: req.session.user,
            tag: req.body.tag,
            env: envArr[e].name,
            domain: envArr[e].domain
        });
        app.save();
    }
    res.json({status: true, messages: ''});
});

/* 导入api */
router.post('/importAPI', upload.single('apifile'), function (req, res) {
    console.log(req.file);  // 上传的文件信息
    var data = fs.readFileSync(req.file.path, "utf-8");
    var params = {
        applicationId: req.body._id,
        swagger: JSON.parse(data).swagger,
        info: JSON.parse(data).info,
        host: JSON.parse(data).host,
        basePath: JSON.parse(data).basePath
    };

    apiDocument.create(params, function (error) {
        if (error) {
            console.log('create document error:%s', error);
        } else {
            console.log('create document success!');
        }
    });

    for (var path in JSON.parse(data).paths) {
        var path_obj = {};
        path_obj[path] = JSON.parse(data).paths[path];
        apiPath.create({applicationId: req.body._id, path_json: path_obj}, function (error) {
            if (error) {
                console.log('create paths error:%s', error);
            } else {
                console.log('create paths success!');
            }
        });
    }

    for (var def in JSON.parse(data).definitions) {
        var def_obj = {};
        def_obj[def] = JSON.parse(data).definitions[def];
        apiDefinition.create({applicationId: req.body._id, definition_json: def_obj}, function (error) {
            if (error) {
                console.log('create definitions error:%s', error);
            } else {
                console.log('create definitions success!');
            }
        });
    }
    console.log("##############");
    res.redirect('../applications/id/' + req.body._id);
});

// 查询实体参数定义
router.get('/definition', function (req, res, next) {
    var data = {};
    data['definition_json.' + req.query.ref] = {$exists: true};
    data['applicationId'] = req.query.id;
    apiDefinition.find(data, {}, function (err, def) {
        if (err) {
            res.json({status: false, messages: ''});
            return;
        }
        res.json(def);
    });
});


/* 组装 swagger json */
router.get('/json', function (req, res, next) {
    var aid = req.query.appId;
    var doc = new apiDocument;
    doc.findByAid(aid, function (err, doc) {
        if (err) {
            res.json({status: false, messages: err});
            return;
        }
        var path = new apiPath;
        path.findByAid(aid, function (err, paths) {
            if (err) {
                res.json({status: false, messages: err});
                return;
            }
            var def = new apiDefinition;
            def.findByAid(aid, function (err, defs) {
                if (err) {
                    res.json({status: false, messages: err});
                    return;
                }
                var json = {};
                json.swagger = doc.swagger;
                json.info = doc.info;
                json.host = doc.host;
                json.basePath = doc.basePath;
                json.paths = {};
                for (var i in paths) {
                    for (var j in paths[i].path_json) {
                        json.paths[j] = paths[i].path_json[j];
                    }
                }
                json.definitions = {};
                for (var i in defs) {
                    for (var j in defs[i].definition_json) {
                        json.definitions[j] = defs[i].definition_json[j];
                    }
                }
                res.json(json);
            });
        });
    });
});

/**
 * 手动保存编辑器时候,记录修改log
 */
router.post('/save', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var newContents = JSON.parse(req.body.specs).paths,
        applicationId = req.body.appId;
    apiPath.find({applicationId: applicationId}, function (err, doc) {
        if (err) next(err);
        if (!doc.length) {
            res.send({success: false, reason: '应用为空,请新建应用文档。'});
            return;
        }
        var querys = [];
        var oldPaths = parsePathJson(doc);
        var oldContents = oldPaths.oldContent;
        var pathMap = oldPaths.pathMap;
        // 已新的为基础与old对比
        for (var n in newContents) {
            (function () {
                var pathBean = new apiPath;
                var oldPath = oldContents[n],
                    newPath = newContents[n];
                var query = initUpdateLog(applicationId, oldPath, newPath, req.session.user, n);
                var jsonComparer = new JsonComparer();
                jsonComparer.start(oldPath, newPath, function (err, result) {
                    if (!result) {
                        // 如果是错的 即证明旧的json没有,是新加的
                        query.action = "add";
                        querys.push(query);
                        new apiPath({
                            applicationId:applicationId,path_json: newPath
                        }).save();
                    } else {
                        if (result.add.length != 0 || result.update.length != 0 || result.del.length != 0) {
                            if (oldPath == null) {
                                // add
                                query.action = "add";
                                new apiPath({
                                    applicationId:applicationId,path_json: newPath
                                }).save();
                            } else if (newPath == null) {
                                // delete
                                query.action = "del";
                                pathBean.deleteById(pathMap[n]);
                            } else {
                                // update
                                query.action = "update";
                                var d = {};
                                d[n] = newPath;
                                var pathModel = new apiPath;
                                pathModel.updatePath(d, pathMap[n], applicationId);
                            }
                            querys.push(query);
                        }
                    }
                });
            })();
        }
        // 以old为基础,查看新的,检查是否有删除的。
        for (var o in oldContents) {
            var pathBean = new apiPath;

            var oldPath = oldContents[o],
                newPath = newContents[o];

            var query = initUpdateLog(applicationId, oldPath, newPath, req.session.user, o);
            if (newPath) {
                continue;
            } else {
                query.action = "del";
                pathBean.deleteById(pathMap[o]);
            }
            querys.push(query);
        }
        updateLogs.create(querys, function (err, doc) {
            if (err) {
                console.error(err);
                res.send({success: false});
            }
            res.send({success: true})
        })
    });


});
module.exports = router;

/**
 * 编译查找出来的paths array 转换为 path json对象
 * @param doc
 * @returns {{}}
 */
var parsePathJson = function (doc) {
    // 编译doc array => json
    var oldContent = {};
    var pathMap = {};
    for (var i in doc) {
        var obj = doc[i].path_json;
        for (var k in obj) {
            oldContent[k] = obj[k];
            pathMap[k] = doc[i]._id;
        }
    }
    return {
        oldContent: oldContent,
        pathMap: pathMap
    };
};

/**
 * 组装UpdateLog Schema
 * @param applicationId
 * @param oldPath
 * @param newPath
 * @param author
 * @returns {{}}
 */
var initUpdateLog = function (applicationId, oldPath, newPath, author, path) {
    var query = {};
    query.applicationId = applicationId;
    query.oldContent = oldPath;
    query.newContent = newPath;
    query.author = author;
    query.path = path;
    return query;
}