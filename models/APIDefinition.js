var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//APIPath schema
var _APIDefinition = new Schema({
    applicationId : {type : String, default : ''},
    definition_json : {},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.APIDefinition = mongoose.model('api_definitions', _APIDefinition);
