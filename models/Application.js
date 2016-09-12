var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Application schema
var _Application = new Schema({
    name : {type : String, default : ''},
    projectId : {type : String, default : ''},
    tag : {type : String, default : ''},
    creator : {type : String, default : ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_Application.methods.findByProjectId = function(projectId, callback) {
    return this.model('api_applications').find({projectId: projectId}, callback);
}

_Application.methods.findById = function(appId, callback) {
    return this.model('api_applications').find({_id: appId}, callback);
}

// export Application
exports.Application = mongoose.model('api_applications', _Application);
