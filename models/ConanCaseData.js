var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanCaseData= new Schema({
    mid : {type: String},
    name : {type: String, default: ''},
    data : {type: String, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.ConanCaseData = mongoose.model('conan_case_data', _ConanCaseData);
