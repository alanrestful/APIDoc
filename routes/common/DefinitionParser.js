/**
 * Created by macbook on 17/3/20.
 */
var ApiDefinition = require('../../models/APIDefinition').APIDefinition;
var definitionDao = new ApiDefinition;
var _ = require('lodash');
var DefinitionParser = function(schema, appId) {
  this.$ref = schema.$ref;
  this.applicationId = appId;
  this.type = schema.type;
  this.modelArray = {};
  this.mockModel = {};
  this.format = schema.format;
  this.schema = schema;
};

DefinitionParser.prototype.gen = function() {
  var _this = this;
  var mockModel ;
  return new Promise(function(resolve, reject) {
    if (_this.$ref) {
      _this.get().then(function (result) {
        mockModel = _this.parseModel();
        resolve(mockModel);
      })
    } else {
      if (_this.type) {
        resolve(mockBase(null, _this.schema));
      }
    }
  })
};


DefinitionParser.prototype.get = function() {
  var _this = this;
  return new Promise(function(resolve, reject) {
    definitionDao.findByAid(_this.applicationId).then(function(result) {
      if (!result || result.length === 0) throw new Error('definitions by applicationId ' + _this.applicationId + ' not exists');

      result.forEach(function(item, i, array) {
        var definitionJson = item['definition_json'];
        var key = _.keys(definitionJson)[0];
        var value = definitionJson[key];
        _this.modelArray[key] = value;
      });
      resolve(_this.modelArray);
    }).catch((function(error) {
      console.error(error);
    }))
  })
};



DefinitionParser.prototype.parseModel = function($ref) {
  //当前ref对象
  var mockModel = {};
  if (!$ref) $ref = this.$ref;
  var DefName = getDefName($ref);
  var modelProps = this.modelArray[DefName]['properties'];
  for(var i in modelProps) {
    var modelProp = modelProps[i];
    if (modelProp.$ref) {
      //如果是对象,递归
      mockModel[i] = this.parseModel(modelProp.$ref);
    } else if (modelProp.items && modelProp.items.$ref && modelProp.type === 'array') {
      mockModel[i] = [];
      for (var j = 0; j < 2; j++) {
        mockModel[i].push(this.parseModel(modelProp.items.$ref));
      }
    } else if (modelProp.type === 'array' && modelProp.items && modelProp.items.type) {
      //直接数组
      mockModel[i] = [];
      for (var j =2 ; j > 0; j--) {
        mockModel[i].push(mockBase(i, modelProp ))
      }
    } else {
      //基本类型,直接填值
      var type = modelProp.type;
      var format = modelProp.format;
      mockModel[i] = mockBase(i, modelProp);
    }
  }
  return mockModel;
};

function parseString(str, format) {
  if (!format) {
    return str ? str: 'example';
  } else if (format === 'date-time') {
    return new Date().getTime();
  }
}

function parseInteger(prop, format) {
  if (['int32','int64'].indexOf(format) !== -1) {
    return parseInt(Math.random()*10);
  } else {
    console.error("parseInteger unknown ", format);
  }
}

function getDefName($ref) {
  if (!$ref) return null;
  return $ref.replace('#\/definitions\/', '');
}

function parseArray(i, type, format) {
  var arr = [];
  for (var i = 0; i < 10; i++ ) {

  }
}

function mockBase(i, schema) {

  switch(schema.type) {
    case 'string':
      return parseString(i, schema.format);
    case 'integer':
      return parseInteger(i, schema.format);
    case 'boolean':
      return parseInt(Math.random()*100) % 2 == 0;
    case 'object':
      return {object: 'object'};
    case 'array':
      var arr = [];
      for (var j = 0 ; j < 2; j ++ ) {
        arr.push(mockBase(i, schema.items));
      }
      return arr;
    default:
      console.error("unknown prop type " + schema.type);
      return null;
  }
}

var Model = function(T) {
  this.T = T;
}


/**
 * 每个字段的属性
 * @param opt
 * @constructor
 */
var Unit = function(opt) {
  this.items = opt.items;
  this.type = opt.type;
  this.format = opt.format;
};

module.exports = {
  DefinitionParser: DefinitionParser,
  mockBase: mockBase,
};