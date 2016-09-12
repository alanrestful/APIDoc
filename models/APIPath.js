var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//APIPath schema
var _APIPath = new Schema({
    path_json : {},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.APIPath = mongoose.model('api_paths', _APIPath);
