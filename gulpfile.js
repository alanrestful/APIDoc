var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plug = require('gulp-load-plugins')();
    streamqueue = require('streamqueue'); // 连续并入

// 编译sass
gulp.task('compileScss', function(){
  return gulp.src('public/stylesheets/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets/'));
});

// sass监听
gulp.task('watchScss', function(){
  gulp.watch('public/stylesheets/app.scss', ['compileScss']);
});

gulp.task('compileTemplate', function(){

  var stream = streamqueue({ objectMode: true });

  stream.queue(
    gulp.src("./public/javascripts/lib/handlebars.js")
  );

  stream.queue(
    gulp.src("./public/javascripts/lib/helper.js")
  );

  stream.queue(
   gulp.src("./views/**/templates/*.hbs")
     .pipe(plug.handlebars({handlebars: require('handlebars')}))
     .pipe(plug.wrap('Handlebars.template(<%= contents %>)'))
     .pipe(plug.declare({namespace: 'Handlebars.templates',noRedeclare:true, processName: function(filePath) {
       return plug.declare.processNameByPath(filePath.replace('views/', '').replace('templates/', ''));
     }}))
  );

  return stream.done()
    .pipe(plug.concat("templates.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

/**
 * 监听模版文件变化
 */
gulp.task('watchTemplate', function(){
  gulp.watch("./views/**/templates/*.hbs", function (event) {
    plug.sequence('compileTemplate')(function (err) {
      if (err) log(err)
    })
  });
});

gulp.task('watch', function(cb){
  plug.sequence(["compileScss", "compileTemplate"], ["watchTemplate", "watchScss"], cb)(function () {
      console.log("########### 编译完成 ###########");
  });
});
