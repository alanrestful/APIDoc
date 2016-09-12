var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    email: {type : String, default : ''},
});

var licenseSchema = new Schema({
    name: {type : String, default : ''},,
    url: {type : String, default : ''},
});

var infoSchema = new Schema({
    description: {type : String, default : ''},,
    version: {type : String, default : ''},,
    title: {type : String, default : ''},,
    termsOfService: {type : String, default : ''},,
    contact: contactSchema,
    license: licenseSchema
});

var _Document = Schema({
    swagger: {type : String, default : ''},,
    info: infoSchema,
    host: {type : String, default : ''},,
    basePath: {type : String, default : ''},
});

exports._Document = mongoose.model('api_documents', _Document);
