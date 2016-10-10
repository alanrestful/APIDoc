var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ConanGroup = new Schema({
    pid : {type: String},
    name : {type: String, default: ''},
    flag : {type: Boolean, default: ''},
    created_at : {type : Date, default: Date.now},
    updated_at : {type : Date, default: Date.now}
});

_ConanGroup.method('findById', function(id, callback){
    return this.model('conan_group').find({_id: id}, {}, callback);
});

_ConanGroup.method('findByPid', function(id, callback){
    return this.model('conan_group').find({pid: id}, {}, callback);
});

_ConanGroup.method('findOrSave', function(id, name, callback){
    var that = this;
    this.model('conan_group').findOne({pid: id ,name: name}, {}, function(err, g){
      if(g == null){
        that.model('conan_group').create({pid: id, name: name}, function(err, g){
          callback(err, g);
        });
      }
    });
});

exports.ConanGroup = mongoose.model('conan_group', _ConanGroup);
