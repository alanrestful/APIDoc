/**
 * Created by macbook on 16/9/9.
 */
var mongoose = require('mongoose');

var db = mongoose.connect("mongodb://localhost/apidoc");
var Schema = db.Schema;
var userSchema = new Schema({
    name    : String,
    password: String
});

exports.user = db.model('user',userSchema);