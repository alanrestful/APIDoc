/**
 * Created by macbook on 17/3/20.
 *
 */

var DefinitionParser = require('./DefinitionParser').DefinitionParser;
var MockServer = function() {

};

MockServer.prototype.build = function(req) {

};

MockServer.prototype.mock = function(paths, apiModel) {
  if (!paths || paths.length === 0) return;
  var path = paths[0]['path_json'][apiModel.api][apiModel.method.toLowerCase()];
  if (!path) throw new Error('can not find api');
  var response = path.responses;
  return this.mockResponse(response, apiModel.appId).response200();
};

MockServer.prototype.mockResponse = function(response, appId) {
  return {
    response200: function() {
      return new Promise(function(resolve, reject) {
        if (!response || !response['200'] || !response['200']['schema']) return null;
        var schema = response['200']['schema'];
        var definitionParser = new DefinitionParser(schema, appId);
        definitionParser.gen().then(function(result) {
          resolve(result);
        });
      })
    }
  }
};


var ApiModel = function(api, method, body, appId) {

  var checkPathVariable = function(api) {
    var reg = /(?:\/\d+\/?)/g;
    if (reg.test(api)) {
      var match = api.match(reg)[0];
      if (/\/$/.test(match)) {
        return api.replace(match, '/\\\{[A-Za-z]+\\\}/');
      } else {
        return api.replace(match, '/\\\{[A-Za-z]+\\\}');
      }
    }
    return api;
  };
  this.api = api;
  this.apiSearch = checkPathVariable(api);
  this.method = method;
  this.body = body;
  this.appId = appId;


};

module.exports = {
  MockServer: MockServer,
  ApiModel: ApiModel
};
