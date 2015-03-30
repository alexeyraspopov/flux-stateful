var gulp = require('gulp'),
	jasmine = require('gulp-jasmine');

gulp.task('specs', function(){
	require('babel/register')({ modules: 'common' });

	return gulp.src('specs.js')
		.pipe(jasmine());
});

gulp.task('default', ['specs']);