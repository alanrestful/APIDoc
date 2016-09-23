var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Project schema
var _Project = new Schema({
  name : {type : String, default : ''},
  owner : {type : String, default : ''},
  env_json : {},
  created_at : {type : Date, default: Date.now},
  updated_at : {type : Date, default: Date.now}
});

_Project.method('findByName', function(name ,callback){
    return this.model('api_projects').find({name: name}, callback);
});

// export Project
exports.Project = mongoose.model('api_projects', _Project);
