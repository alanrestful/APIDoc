var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//APIPath schema
var _APIDefinition = new Schema({
    applicationId : {type : String, default : ''},
    definition_json : {},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_APIDefinition.method("findByAid", function(aId, cb) {
    return this.model('api_definitions').find({'applicationId': aId}, {_id:0}, cb);
});

exports.APIDefinition = mongoose.model('api_definitions', _APIDefinition);
