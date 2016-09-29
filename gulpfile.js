var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpSequence = require('gulp-sequence'),
    exec = require('child_process').exec;

//创建test任务
gulp.task('test', function(){
  console.log("this is a test task");
});

// 编译sass
gulp.task('sass', function(){
  return gulp.src('public/stylesheets/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets/'));
});

// sass监听
gulp.task('watchSass', function(){
  gulp.watch('public/stylesheets/app.scss', ['sass']);
});

// 启动express
gulp.task('run', function (cb) {
  exec('supervisor app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// 启动服务
gulp.task('serve', function(callback){
  gulpSequence('run', 'sass', 'watchSass', callback);
})
