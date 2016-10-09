var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanCaseData= new Schema({
    mid : {type: String},
    name : {type: String, default: ''},
    data : {type: String, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_ConanCaseData.method('findById', function(id ,callback){
    return this.model('conan_case_data').find({_id: id}, callback);
});

_ConanCaseData.method('findByMid', function(id ,callback){
    return this.model('conan_case_data').findOne({mid: id}, callback);
});

exports.ConanCaseData = mongoose.model('conan_case_data', _ConanCaseData);
