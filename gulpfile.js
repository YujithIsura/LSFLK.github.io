var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var open         = require('gulp-open');

var Paths = {
  HERE                 : './',
  DIST                 : 'dist/',
  CSS                  : './assets/css/',
  SCSS_TOOLKIT_SOURCES : './assets/scss/material-dashboard.scss',
  SCSS                 : './assets/scss/**/**',
  JS                 : './assets/js/sub'
};

gulp.task('compile-scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('js',function(){
  gulp.src([
      'node_modules/ejs/ejs.js',
      'node_modules/orgchart/dist/js/jquery.orgchart.min.js'
    ])
      .pipe(gulp.dest(Paths.JS));
});
gulp.task('css',function(){
  gulp.src([
      'node_modules/orgchart/dist/css/jquery.orgchart.min.css'
    ])
      .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, ['compile-scss']);
});

gulp.task('open', function(){
  gulp.src('index.html')
  .pipe(open());
});

gulp.task('open-app', ['css','js','open', 'watch']);
