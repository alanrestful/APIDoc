/**
 * Created by macbook on 17/3/17.
 */

var JSONFormat = function(str) {
  this.str = str;
  this.jsonObj = {};
  this.result = [];
  this.intend = "\ \ ";
  this.intendNum = -1;
  try {
    this.jsonObj = JSON.parse(str);
  } catch (e) {
    console.error("parse str failed, message: %s", e.message);
  }
};

JSONFormat.prototype = {
  init: function() {
    this.formatObj(this.jsonObj);
    this.formatArray(this.jsonObj);
    // this.result.splice(-1, 1, this.result[this.result.length - 1].replace(',',''));
    // this.result.forEach(function(v, i, a) {
    //   // console.log(v.content + "           " + v.openIndex +  "         " + v.closeIndex);
    // });
    return this;
    // console.log(this.result);
  },

  getResult: function() {
    return this.result;
  },

  getHtml: function() {
    return this.html();
  },

  html: function() {
    var html = '';
    this.result.forEach(function(item, i, a){
      html += '<p style="text-indent:' + item.intendNum + 'em">' + item.content + '</p>'
    }) ;
    return html;
  },

  formatArray: function(array) {
    if (!this.isArray(array)) return;
    var _this = this;
    this.intendNum ++;
    this.result.push(new SpanModel({content: this.intendGen() + "[", openIndex: this.intendNum, intendNum: this.intendNum}));
    array.forEach(function(item, i, array) {
      _this.intendNum ++;
      if (_this.isObject(item)) {
        _this.formatObj(item);
      } else if (_this.isArray(item)) {
        _this.formatArray(item);
      } else {
        _this.result.push(new SpanModel({content: _this.intendGen() + _this.formatUnit(item) + ",", intendNum: this.intendNum}));
      }
      _this.intendNum --;

    });
    this.result.push(new SpanModel({content: this.intendGen() + "],", closeIndex: this.intendNum, intendNum: this.intendNum}));
    this.intendNum --;
  },

  formatObj: function(obj) {
    if (!this.isObject(obj)) return;
    this.intendNum ++;
    this.result.push(new SpanModel({content: this.intendGen() + "{", openIndex: this.intendNum, intendNum: this.intendNum}));
    for (var key in obj) {
      var unit = null;
      this.intendNum ++;
      this.result.push(new SpanModel({content: this.intendGen() +  key + ": ", intendNum: this.intendNum}));
      var resIndex = this.result.length - 1;
      var item = obj[key];
      if (this.isObject(item)) {
        this.formatObj(item);
      } else if (this.isArray(item)) {
        this.formatArray(item);
      } else {
        unit = this.formatUnit(item);
      }
      if (unit) {
        this.result.splice(-1, 1, new SpanModel({content: this.result[resIndex].content + unit + ",", intendNum: this.intendNum}));
      }
      this.intendNum --;
    }
    this.result.push(new SpanModel({content: this.intendGen() + "},", closeIndex: this.intendNum, intendNum: this.intendNum}));
    this.intendNum --;
  },

  formatUnit: function(unit) {
    if (!this.isUnit(unit)) return;
    if (typeof(unit) === 'string') {
      return '"' + unit + '"';
    } else {
      return unit;
    }
  },

  isArray: function(obj) {
    return obj && typeof(obj) === 'object' && obj.constructor.name === 'Array';
  },

  isObject: function(obj) {
    return obj && typeof(obj) === 'object' && obj.constructor.name === 'Object'
  },

  isUnit: function(obj) {
    return obj && ['string', 'number', 'boolean'].indexOf(typeof(obj)) > -1;
  },

  intendGen: function(add) {
    var res = "";
    if (!add) add = 0;
    for (var i = 0; i < this.intendNum + add; i++ ) {
      res += this.intend;
    }
    return res;
  }
};

var SpanModel = function(option) {
  this.openIndex = option.openIndex;
  this.content = option.content;
  this.closeIndex = option.closeIndex;
  this.intendNum = option.intendNum * 4;
}


module.exports = JSONFormat;
// // var obj = [[1,2,3,4],[5,6,7,8]]
// var obj = {a:1,b:2, c: {ca:3, cb:4}, d: [{d1: 'sss'}, {d1: 'www'}]};
// var str = JSON.stringify(obj);
//
// var js = new JSONFormat(str);
// js.init();

