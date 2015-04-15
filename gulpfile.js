var gulp = require('gulp'),
	jasmine = require('gulp-jasmine');

gulp.task('specs', function(){
	return gulp.src('specs.js')
		.pipe(jasmine());
});

gulp.task('default', ['specs']);