var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//APIPath schema
var _APIDifinition = new Schema({
    difinition_json : {},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.APIDifinition = mongoose.model('api_difinitions', _APIDifinition);
