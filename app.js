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

var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

// route设置
var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var cases = require('./routes/cases');
var applications = require('./routes/applications');
var codeGen = require('./routes/codeGen');
var logs = require('./routes/logs');
var mockRequest = require('./routes/mockRequest');
var mockServer = require('./routes/mockServer');
var oauth = require('./routes/oauth');


var util = require('util'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    path = require('path'),
    // swagger-editor must be served from root
    SWAGGER_EDITOR_SERVE_PATH = '/edit',
    // swagger-editor expects to GET the file here
    SWAGGER_EDITOR_LOAD_PATH = '/editor/spec',
    // swagger-editor PUTs the file back here
    SWAGGER_EDITOR_SAVE_PATH = '/editor/spec',
    // swagger-editor ask for defaults
    SWAGGER_EDITOR_DEFAULTS = '/config',
    SWAGGER_EDITOR_DEFAULTS_DIR = path.join(__dirname, './config'),
    SWAGGER_EDITOR_DIR = path.join(__dirname, './swagger-editor');

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('hbs', exphbs({
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: require('./helpers/helper')
}));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('123'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'anywhere',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url : config.get("mongodb.uri"),
        ttl : 60 * 60,
    })
}));

// session拦截器
app.use(function(req,res,next){
    app.locals.User = req.session.user;
    var url = req.originalUrl;
    console.log(url);
    if (req.session.user) {
        next();
    } else {
        var allow = ['/','/users/login','/users/register','/codegen/.*', '/api/.*', '/auth/.*','/api/cases/group', '/mock-server.*'];
        var allowTag = false;
        for (var s in allow) {
            if(new RegExp("^" + allow[s] + "$").test(url)) {
                allowTag = true;
                break;
            }
        }

        if (!allowTag) {
            res.redirect('/');
        } else {
            next();
        }
    }
});

app.use(SWAGGER_EDITOR_SAVE_PATH, function (req, res, next) {

    if (req.method !== 'PUT') {
        return next();
    }

    var stream = fs.createWriteStream('./swagger.json');
    req.pipe(stream);
    stream.on('finish', function () {
        res.end('ok');
    });

});

// serve defaults
app.use(SWAGGER_EDITOR_DEFAULTS, serveStatic(SWAGGER_EDITOR_DEFAULTS_DIR));
// retrieve the project swagger file for the swagger-editor
app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic('./swagger.json'));
// serve swagger-editor
app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(SWAGGER_EDITOR_DIR));


app.use('/', routes);
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/cases', cases);
app.use('/api/applications', applications);
app.use('/codegen', codeGen);
app.use('/logs', logs);
app.use('/api/mock-request', mockRequest);
app.use('/mock-server', mockServer);
app.use('/oauth', oauth);

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
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

//设置不同的启动环境export NODE_ENV=default && node app.js
