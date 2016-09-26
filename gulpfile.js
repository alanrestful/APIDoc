var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpSequence = require('gulp-sequence');

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

gulp.task('w', function(callback){
  gulpSequence('sass', 'watchSass', callback);
})
