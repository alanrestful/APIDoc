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

exports.APIPath = mongoose.model('api_paths', _APIPath);
