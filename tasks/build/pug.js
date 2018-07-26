const gulp = require('gulp');
const through = require('through2').obj;
const {reload}= require('browser-sync');

const pug = require('gulp-pug');

const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const removeComments = require('gulp-remove-html-comments');

const path = require('../../config/application');
const mode = require('../mode');

let perfectPixel = () => through((file, enc, cb) => cb(null, file));

gulp.task('pug-build', function () {
	const src = (mode === 'production')
	             ? path.src.pugProduction
	             : (mode === 'development-gulp-perfect-pixel')
	             ? path.src.pugGulp
	             : path.src.pug;
	if(mode === 'development-gulp-perfect-pixel')
		resetRequireGulpPerfectPixel();

	return gulp.src(src)
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Error pug',
					message: err.message
				}
			})
		}))
		.pipe(pug({pretty: (mode === 'development')}))
		.pipe(gulpif('development-gulp-perfect-pixel' === mode, perfectPixel()))
		.pipe(gulpif('production' === mode, removeComments()))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

function resetRequireGulpPerfectPixel() {
	['../../build/index',
	 '../../build/wrapper',
	 '../../build/helpers',
	].forEach(path => delCashRequire(path));

	perfectPixel = require('../../build/index');
}

function delCashRequire(str) {
	delete require.cache[require.resolve(str)];
}
