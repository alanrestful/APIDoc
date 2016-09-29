var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanCaseModel= new Schema({
    gid : {type: String},
    name : {type: String, default: ''},
    fragment : {type: String, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_ConanCaseModel.method('findById', function(id ,callback){
    return this.model('conan_case_model').find({_id: id}, callback);
});


_ConanCaseModel.method('findByGid', function(id ,callback){
    return this.model('conan_case_model').find({gid: id}, callback);
});

exports.ConanCaseModel = mongoose.model('conan_case_model', _ConanCaseModel);
