var gulp  = require('gulp');
var sass  = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('sass', function () {
  gulp.src('assets/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['sass']);
// gulp.task('sass:watch', function () {
  gulp.watch(['assets/sass/*.scss'], ['default']);
// });
