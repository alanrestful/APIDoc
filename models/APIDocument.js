var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: {type : String, default : ''},
    email: {type : String, default : ''}
});

var licenseSchema = new Schema({
    name: {type : String, default : ''},
    url: {type : String, default : ''}
});

var infoSchema = new Schema({
    description: {type : String, default : ''},
    version: {type : String, default : ''},
    title: {type : String, default : ''},
    termsOfService: {type : String, default : ''},
    contact: contactSchema,
    license: licenseSchema
});

var _APIDocument = Schema({
    applicationId : {type : String, default : ''},
    swagger: {type : String, default : ''},
    info: infoSchema,
    host: {type : String, default : ''},
    basePath: {type : String, default : ''},
});

_APIDocument.method("findByAid", function(aId, cb) {
    return this.model('api_documents').findOne({'applicationId': aId}, {_id:0}, cb);
});

exports.APIDocument = mongoose.model('api_documents', _APIDocument);
