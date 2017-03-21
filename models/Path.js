var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', false);


var PathKey = new Schema({
  applicationId: {type: String, default: ''},
  apiPath: {type: String, default: ''}
});

PathKey.method('findBy', function(appId, api, cb) {
  return this.model('path_key').find({applicationId: appId, apiPath: {$regex: api}}, cb);
});

exports.PathKey = mongoose.model('path_key', PathKey);