/**
 * Created by macbook on 16/9/22.
 * this router will operate the logs action
 */
var express = require('express');
var router = express.Router();
var JsonComparer = require("../helpers/json-processor/json-compare").json_comparer;

var updateLogs = require('../models/UpdateLogs').UpdateLogs;

/**
 * @params [appId, author, action]
 */
router.get("/", function(req, res, next) {
    var params = req.query;
    var appId = params.appId,
        author = params.author,
        action = params.action,
        page = params.page || 1,
        size = params.size || 10;
    var result = [];
    var upLog = new updateLogs;
    upLog.queryLogs({
        appId: appId,
        author: author,
        action: action,
        start: (page - 1) * size,
        size: parseInt(size)
    }, function (err, doc) {
        if (err) {
            errHandler(req, err, "query.logs.error");
            next(err);
            return;
        }
        // 改变记录的定位
        for (var d in doc) {
            (function(){
                var obj = {};
                if (doc.hasOwnProperty(d)) {
                    obj = doc[d]._doc;
                    if (doc[d].action == "update") {
                        logCompare(doc[d], function (err, rc) {
                            if (err) errHandler(res, err, "compare.json.false");
                            // doc[d].detail = rc;
                            obj.detail = rc;
                            result.push(obj);
                        });
                    } else {
                        result.push(obj);
                    }
                }
            })()
        }
        res.render('logs/logs',{title:'Logs',data:result, appId:appId});
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
    var comparer = new JsonComparer();
    comparer.start(oldLog, newLog, cb) ;
};

module.exports = router;