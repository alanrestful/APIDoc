/**
 * Created by macbook on 16/9/22.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _UpdateLog = new Schema({
    applicationId: {type: String},
    author: {type: String},
    path: {type: String},
    oldContent: {type: Object, default: ''},
    newContent: {type: Object, default: ''},
    action: {type: String},
    createdAt: {type: Date, default: Date.now}
});

_UpdateLog.method("queryLogs", function(opts, cb) {
    opts = opts || {};
    var query = {};
    if (opts.appId) {
        query.applicationId = opts.appId;
    }
    if (opts.author) {
        query.author = opts.author;
    }
    if (opts.action) {
        query.action = opts.action;
    }
    return this.model('update_logs')
        .find(query)
        .sort('-_id')
        .skip(opts.start)
        .limit(opts.size)
        .exec( function(err, doc) {
            cb(err, doc);
    });
});



exports.UpdateLogs = mongoose.model('update_logs',_UpdateLog);