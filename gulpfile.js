var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var files = [
  './js/states/start.js',
  './js/states/intro.js',
  './js/states/lvl1.js',

  './js/utils.js',
  './js/Circle.js',
  './js/game13k.js'
];

gulp.task('minjs', function(){
  return gulp.src(files)
    .pipe(concat('js13k.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});
