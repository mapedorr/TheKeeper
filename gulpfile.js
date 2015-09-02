var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var files = [
  './js/utils.js',
  './js/Circle.js',
  './js/game13k.js',

  './js/states/start.js'
];

gulp.task('default', function(){
  return gulp.src(files)
    .pipe(concat('js13k.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});