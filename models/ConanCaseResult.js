var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanCaseResult= new Schema({
    did : {type: Number},
    result : {type: String, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_ConanCaseResult.method('findById', function(id ,callback){
    return this.model('conan_case_result').find({_id: id}, callback);
});

exports.ConanCaseResult = mongoose.model('conan_case_result', _ConanCaseResult);
