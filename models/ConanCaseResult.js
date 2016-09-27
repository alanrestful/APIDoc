var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanCaseResult= new Schema({
    did : {type: Number},
    result : {type: String, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.ConanCaseResult = mongoose.model('conan_case_result', _ConanCaseResult);
