var gulp = require('gulp'),
    sass = require('gulp-sass');

// 编译sass
gulp.task('sass', function(){
  return gulp.src('public/stylesheets/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets/'));
});

// sass监听
gulp.task('w', function(){
  gulp.watch('public/stylesheets/app.scss', ['sass']);
});
