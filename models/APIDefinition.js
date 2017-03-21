var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//APIPath schema
var _APIDefinition = new Schema({
    applicationId : {type : String, default : ''},
    definition_json : {},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_APIDefinition.method("findByAid", function(aId, cb) {
    return this.model('api_definitions').find({'applicationId': aId}, {_id:0}).sort('_id').exec(cb);
});

_APIDefinition.method("findByRef", function(appId, ref, cb) {
    var refName = 'definition_json.'+ref;
    var query = {};
    query['applicationId'] = appId;
    query[refName] = {$type: 3};
    return this.model('api_definitions').find(query, cb);
});

_APIDefinition.method("updatePath", function(obj, id, appId, cb) {
    var model = this.model('api_definitions');
    model.remove({_id: id}, function(err,doc) {
        console.log("delete " + err);
    });
    new model({
        _id: id,
        definition_json: obj,
        applicationId: appId
    }).save(function(err, doc) {
        console.log(err);
    });
    // model.create({
    //     _id: id,
    //     definition_json: obj,
    //     applicationId: appId
    // }, function(err,doc ) {
    //     console.log("create " + err);
    // })
});

_APIDefinition.method("deleteById", function(id, cb) {
    return this.model('api_definitions').remove({_id: id}, function(err,doc) {
        console.error("delete " + err);
    });
});

exports.APIDefinition = mongoose.model('api_definitions', _APIDefinition);
