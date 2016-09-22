/**
 * Created by macbook on 16/9/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _User = new Schema({
    name : {type: String, default:''},
    mobile : {type: String, default: ''},
    email : {type: String, default: ''},
    avatar : {type: String, default: ''},
    type : {type: String, default: ''},
    password : {type: String, default:''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_User.method('findByName', function(name ,callback){
    return this.model('users').find({name: name}, callback);
});

_User.method('findExists',function(opt ,callback){
    return this.model('users').find({$or:[{name:opt.userName},{mobile:opt.mobile},{email:opt.email}]},callback)
});

exports.User = mongoose.model('users', _User);
