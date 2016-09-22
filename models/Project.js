var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Project schema
var _Project = new Schema({
    _id : {type : String},
    name : {type : String, default : ''},
    type : {type : Number, default : 1},
    owner : {type : String, default : ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_Project.method('findByName', function(name ,callback){
    return this.model('api_projects').find({name: name}, callback);
});

// export Project
exports.Project = mongoose.model('api_projects', _Project);
