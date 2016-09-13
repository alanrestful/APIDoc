/**
 * Created by macbook on 16/9/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _User = new Schema({
    name : {type: String, default:''},
    mobile : {type: String, default: ''},
    email : {type: String, default: ''},
    password : {type: String, default:''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_User.method.findByName = function(name ,callback){
    return this.model('users').find({name: name}, callback);
};

exports.User = mongoose.model('users', _User);
