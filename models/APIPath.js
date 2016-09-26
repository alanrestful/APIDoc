var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

//APIPath schema
var _APIPath = new Schema({
    path_json : {},
    applicationId : {type : String, default : ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_APIPath.method("findByPath", function(pathKey, applicationId, cb) {
    var pathName = "path_json." + pathKey;
    var query = {};
    query[pathName] = {$type:3};
    query["applicationId"] = applicationId;
    return this.model('api_paths').find(query,cb);
});

_APIPath.method("findByAid", function(aId, cb) {
    return this.model('api_paths').find({'applicationId': aId}, {_id:0},cb);
});

_APIPath.method("updatePath", function(obj, id, appId, cb) {
    var model = this.model('api_paths');
    model.remove({_id: id}, function(err,doc) {
        console.log("delete " + err);
    });
    model.create({
        _id: id,
        path_json: obj,
        applicationId: appId
    }, function(err,doc ) {
        console.log("create " + err);
    })
});

_APIPath.method("deleteById", function(id, cb) {
    return this.model('api_paths').remove({_id: id}, function(err,doc) {
        console.error("delete " + err);
    });
})
exports.APIPath = mongoose.model('api_paths', _APIPath);
