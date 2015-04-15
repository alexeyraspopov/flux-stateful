var gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	browserify = require('gulp-browserify'),
	file = require('gulp-file');

gulp.task('specs', function(){
	return gulp.src('specs.js')
		.pipe(jasmine());
});

gulp.task('browserify', ['browserify-simple', 'browserify-pure']);

gulp.task('browserify-simple', function() {
	return file('index.browser.js', 'window.Store = require("./index");', { src: true })
		.pipe(browserify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('browserify-pure', function() {
	return file('immutable.browser.js', 'window.ImmutableStore = require("./immutable");', { src: true })
		.pipe(browserify())
		.pipe(gulp.dest('./dist'));
})

gulp.task('default', ['specs', 'browserify']);