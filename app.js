var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
// hbs渲染
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

// route设置
var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var apiIndexs = require('./routes/apiIndexs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('hbs', exphbs({
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

// app.use(function(req, res, next){
//     var reqData = [];
//     var size = 0;
//     req.on('data', function (data) {
//       console.log('>>>req on');
//       reqData.push(data);
//       size += data.length;
//     });
//     req.on('end', function () {
//       req.reqData = Buffer.concat(reqData, size);
//     });
//     next();
// });
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);
app.use('/apiIndexs', apiIndexs);

/// 初始化mongodb的连接池（默认pool=5）
mongoose.connect(config.get("mongodb.uri"), config.get("mongodb.options"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var server = app.listen(config.get("server.port"), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

//设置不同的启动环境export NODE_ENV=default && node app.js
