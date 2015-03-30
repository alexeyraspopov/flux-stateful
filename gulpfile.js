var gulp = require('gulp'),
	babel = require('gulp-babel'),
	mocha = require('gulp-mocha'),
	map = require('map-stream');

gulp.task('specs', function(){
	return gulp.src('specs.js')
		.pipe(babel())
		.pipe(map(function(file, done){
			eval(file.contents.toString());
			done(null, file);
		}));
});

gulp.task('default', ['specs']);