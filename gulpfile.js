var gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	complexity = require('gulp-complexity');

gulp.task('specs', function(){
	return gulp.src('specs.js')
		.pipe(jasmine());
});

gulp.task('complexity', function() {
	return gulp.src(['index.js'])
		.pipe(complexity());
});

gulp.task('default', ['specs', 'complexity']);