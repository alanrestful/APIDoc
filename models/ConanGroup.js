var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanGroup = new Schema({
    pid : {type: String},
    name : {type: String, default: ''},
    flag : {type: Boolean, default: ''},
    isCase : {type: Boolean, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

exports.ConanGroup = mongoose.model('conan_group', _ConanGroup);
