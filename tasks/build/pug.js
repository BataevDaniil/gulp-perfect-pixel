const gulp = require('gulp');
const {reload}= require('browser-sync');

const pug = require('gulp-pug');

const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const removeComments = require('gulp-remove-html-comments');

const path = require('../../config/application');
const mode = require('../mode');

gulp.task('pug-build', function () {
	const src = (mode === 'development')
		? path.src.pugPerfectPixel
		: path.src.pug;
	return gulp.src(src)
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Error pug',
					message: err.message
				}
			})
		}))
		.pipe(pug({pretty: (mode !== 'production')}))
		.pipe(gulpif('production' === mode, removeComments()))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});
