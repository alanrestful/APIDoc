$(function(){

  Handlebars.registerHelper("json", function(json, options) {
    return JSON.stringify(json);
  });

  Handlebars.registerHelper("equals", function(a, b, options) {
    if ((a != null ? a.toString() : void 0) === (b != null ? b.toString() : void 0)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
    var isTrue;
    isTrue = (function() {
      switch (operator) {
        case "==":
          return v1 == v2;
        case "!=":
          return v1 != v2;
        case "===":
          return v1 === v2;
        case "!==":
          return v1 !== v2;
        case "&&":
          return v1 && v2;
        case "||":
          return v1 || v2;
        case "<":
          return v1 < v2;
        case "<=":
          return v1 <= v2;
        case ">":
          return v1 > v2;
        case ">=":
          return v1 >= v2;
        default:
          return eval("" + v1 + operator + v2);
      }
    })();
    if (isTrue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

});
