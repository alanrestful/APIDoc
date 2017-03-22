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
  try {
    this.checkParams(path, apiModel);
  } catch (e) {
    return this.mockResponse(response, apiModel.appId).response400(e.message);
  }
  return this.mockResponse(response, apiModel.appId).response200();
};

//核对方法参数是否一致
MockServer.prototype.checkParams = function(path, apiModel) {
  let parameters = path.parameters;
  if (!parameters || parameters.length === 0) return;
  let body = apiModel.body;
  parameters.forEach((param, i, array) => {
    this.checkRequired(param, apiModel.body);
    // this.checkType();
  })
};

MockServer.prototype.checkRequired = function(pathParam, reqParams) {
    if ((pathParam.required && reqParams[pathParam.name]) || !pathParam.required) {
      // try {
    } else {
      throw new ParamError("Required param '" + pathParam.name + "' not present!");
    }
};

//检查类型
MockServer.prototype.checkType = function(pathParam, reqParams) {
    // if (pathParam.type )
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
    },
    response400: function(message) {
      return Promise.reject(message);
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


function ParamError(message) {
  this.message = message;
}
/**
 @type {string}
 */
ParamError.prototype.name = null;
/**
 @type {string}
 */
ParamError.prototype.message = null;


module.exports = {
  MockServer: MockServer,
  ApiModel: ApiModel
};
