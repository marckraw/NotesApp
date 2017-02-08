var gulp = require("gulp"),
    $ = require("gulp-load-plugins")({
      lazy: true
    }),
    // sass = require("gulp-sass"),
    // autoprefixer = require("gulp-autoprefixer"),
    // plumber = require("gulp-plumber"),
    // useref = require("gulp-useref"),
    // gulpif = require("gulp-if"),
    // gutil = require("gulp-util");

    browserSync = require("browser-sync"),
    del = require("del"),
    runSequence = require("run-sequence")


gulp.task("css", function() {

  $.util.log( $.util.colors.yellow("Compiling SASS to CSS...") );

  return gulp.src("src/sass/style.scss")
      .pipe($.plumber())
      .pipe($.sass.sync({
        outputStyle: "expanded"
      }))
      .pipe($.autoprefixer({
        browsers: ["last 5 version", "IE 9"]
      }))
      .pipe(gulp.dest("src/css/"))
      .pipe(browserSync.stream());

});


gulp.task("watch", function() {

  gulp.watch("src/sass/**/*.scss", ["css"]);
  gulp.watch(["src/*.html", "src/templates/**/*.html", "src/**/*.js"], browserSync.reload);

});


gulp.task("server", function() {

  browserSync.init({
    server: "src/"
  });

});


gulp.task("clean", function() {

  return del("dist/");

});


gulp.task("html", function() {

  gulp.src("src/*.html")
      .pipe($.useref())
      .pipe( $.if("*.js", $.uglify() ) )
      .pipe(gulp.dest("dist/"));

});


gulp.task("copy", function() {

  return gulp.src(["src/css/**/*.css", "src/img/*", "src/templates/**/**/*"], {
    base: "src"
  })
      .pipe(gulp.dest("dist/"));

});


gulp.task("build", function(cb) {

  runSequence("clean", "html", "copy", cb);

});


gulp.task("default", ["css", "server", "watch"]);
