var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var files = [
  './js/states/start.js',
  './js/states/lvl1.js',
  './js/states/lvl2.js',
  './js/states/lvl3.js',
  './js/states/ready.js',
  './js/states/intro.js',
  './js/states/lvlgen.js',
  './js/states/skills.js',

  './js/game13k.js',
  './js/utils.js',
  './js/Circle.js',
  './js/level.js'
];

gulp.task('minjs', function(){
  return gulp.src(files)
    .pipe(concat('keeper.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});
