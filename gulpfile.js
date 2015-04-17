var gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	browserify = require('gulp-browserify'),
	complexity = require('gulp-complexity'),
	file = require('gulp-file');

gulp.task('specs', function(){
	return gulp.src('specs.js')
		.pipe(jasmine());
});

gulp.task('complexity', function() {
	return gulp.src(['index.js', 'immutable.js', 'mutable.js', 'src/*.js'])
		.pipe(complexity());
});

gulp.task('browserify-stateful', function() {
	return file('stateful.browser.js', 'window.StatefulStore = require("./index");', { src: true })
		.pipe(browserify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('browserify-pure', function() {
	return file('immutable.browser.js', 'window.ImmutableStore = require("./immutable");', { src: true })
		.pipe(browserify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('browserify-mutable', function() {
	return file('mutable.browser.js', 'window.MutableStore = require("./mutable");', { src: true })
		.pipe(browserify())
		.pipe(gulp.dest('./dist'));
})

gulp.task('browserify', ['browserify-stateful', 'browserify-pure', 'browserify-mutable']);
gulp.task('default', ['specs', 'complexity', 'browserify']);