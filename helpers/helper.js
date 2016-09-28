var moment = require('moment');

module.exports = {
  json: function(json, options) {
    return JSON.stringify(json);
  },

  equals: function(a, b, options) {
    if ((a != null ? a.toString() : void 0) === (b != null ? b.toString() : void 0)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  formatDate :function(date, type, options) {
    if (!date) {
      return;
    }
    switch (type) {
      case "gmt":
        return moment(date).format("EEE MMM dd HH:mm:ss Z yyyy");
      case "day":
        return moment(date).format("YYYY-MM-DD");
      case "minute":
        return moment(date).format("YYYY-MM-DD HH:mm");
      default:
        if (typeof type === "string") {
          return moment(date).format(type);
        } else {
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    }
  },

  add: function(a, b, opts) {
    return a + b;
  }
}
