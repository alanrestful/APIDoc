/**
 * Created by macbook on 16/9/22.
 * this router will operate the logs action
 */
var express = require('express');
var router = express.Router();
var jsonComparer = require("../helpers/json-processor/json-compare").json_comparer;

var updateLogs = require('../models/UpdateLogs').UpdateLogs;

/**
 * @params [appId, author, action]
 */
router.get("/", function(req, res, next) {
    var params = req.query;
    var appId = params.appId,
        author = params.author,
        action = params.action;
    var result = [];
    var upLog = new updateLogs;
    upLog.queryLogs({
        appId: appId,
        author: author,
        action: action
    }, function (err, doc) {
        if (err) {
            errHandler(req, err, "query.logs.error");
            return;
        }
        // 改变记录的定位
        for (var d in doc) {
            var obj = {};
            obj = doc[d]._doc;
            if (doc[d].action == "update") {
                logCompare(doc[d], function (err, rc) {
                    if (err) errHandler(res, err, "compare.json.false");
                    // doc[d].detail = rc;
                    obj.detail = rc;
                    result.push(obj);
                });
            } else {
               result.push(obj) ;
            }
        }
        res.render('logs/logs',{title:'Logs',data:result});
    });
});

var errHandler = function(res, err, message) {
    console.error(err);
    res.send({success: false, message: message});
};

var logCompare = function(updateLog, cb) {
    updateLog = updateLog || {};
    var newLog = updateLog.newContent;
    var oldLog = updateLog.oldContent;
    jsonComparer(oldLog, newLog, cb) ;
};

module.exports = router;