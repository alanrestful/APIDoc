var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// hbs渲染
var exphbs  = require('express-handlebars');

var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var apiIndexs = require('./routes/apiIndexs');
var apiManager = require('./routes/apiManager');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);

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

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('123'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'anywhere',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url : 'mongodb://localhost/apidoc',
        ttl : 60 * 60,
    })
}));

/// session
app.use(function(req,res,next){
    // console.log(JSON.stringify(req.session));
    var url = req.originalUrl;
    if (req.session.user){
        next();
    } else {
        if (url !== '/'){
            res.send();
            res.redirect('/');
        }
    }
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);
app.use('/apiIndexs', apiIndexs);
app.use('/apiManager', apiManager);

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

var server = app.listen(9010, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
