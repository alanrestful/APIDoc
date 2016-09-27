var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Application schema
var _Application = new Schema({
    name : {type : String, default : ''},
    projectId : {type : String, default : ''},
    env : {type : String, default : ''},
    domain : {type : String, default : ''},
    owner : {type : String, default : ''},
    tag : {type : String, default : ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});


_Application.method('findByPidAndEnv', function(pid, env ,callback){
    return this.model('api_applications').find({projectId: pid, env: env}, {}, callback);
});


// export Application
exports.Application = mongoose.model('api_applications', _Application);
