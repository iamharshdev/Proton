'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');
const { parallel, src, dest } = require('gulp');

function javascript() {
	return src('src/js/*.js').pipe(dest('dist/'));
}

function css() {
	return gulp
		.src('./src/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
}

function minifyCss() {
	return gulp
		.src('./src/sass/**/*.scss')
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./dist/minified/'));
}

gulp.task('sass:watch', function () {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});

exports.build = parallel(javascript, css, minifyCss);
