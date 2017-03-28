/**
 * Created by macbook on 2017/3/27.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);

var Mock = new Schema({
  applicationId: {type: String, default: ''},
  name: {type: String, default: ''},
  path: {type: String, default: '/'},
  method: {type: String, default: 'get'},
  criteria: {type: Object, default: null},
  mockData: {type: Object, default: null},
  createdAt:  {type : Date, default: Date.now}
});

/**
 * 返回某一接口的模拟数据列表
 * @param: api 接口路径
 * @param: appId 应用id
 * @return: [{mock_data}]
 */
Mock.method('findBy', function(appId, api, method, cb) {
  var query = {};
  query.applicationId = appId;
  query.path = api;
  if (method) {
    query.method = method;
  }
  return this.model('mock_datas').find(query, {}, cb);
});

/**
 * 查找某一具体的模拟数据
 */
Mock.method('findById', function(id, cb) {
  return Mock.findById(id, cb);
});

exports.Mock = mongoose.model('mock_datas', Mock);