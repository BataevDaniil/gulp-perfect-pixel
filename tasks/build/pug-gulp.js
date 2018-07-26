const gulp = require('gulp');
const through = require('through2').obj;
const {reload}= require('browser-sync');

const pug = require('gulp-pug');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const path = require('../../config/application');

let perfectPixel = () => through((file, enc, cb) => cb(null, file));

gulp.task('pug-gulp-build', function () {
	resetRequireGulpPerfectPixel();
	console.log(perfectPixel);
	return gulp.src(path.src.pugGulp)
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'Error pug',
					message: err.message
				}
			})
		}))
		.pipe(pug({pretty: true}))
		.pipe(perfectPixel())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

function resetRequireGulpPerfectPixel() {
	['../../build/index',
	 '../../build/wrapper',
	 '../../build/helpers',
	].forEach(path => delCashRequire(path));

	perfectPixel = require('../../build/index').default;
}

function delCashRequire(str) {
	delete require.cache[require.resolve(str)];
}
