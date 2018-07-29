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
		.pipe(perfectPixel({
			index: {
				'|720-1200|':{
					style: {
						top: 100,
						opacity: 0.3,
					}
				},
				'720|':{
					style: {
						top: 100,
						left: 80,
						opacity: 0.3,
					}
				}
			},
			from: {
				'600|':{
					style: {
						top: 100,
						opacity: 0.3,
					}
				},
				'|600-1000|':{
					style: {
						top: 100,
						left: 80,
						opacity: 0.1,
					}
				}
			},
		},{
			rootPathImage: './mock/img'
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

function resetRequireGulpPerfectPixel() {
	['../../build/index',
	 '../../build/wrapper',
	 '../../build/helpers',
	 '../../build/parserNameImg',
	].forEach(path => delCashRequire(path));

	perfectPixel = require('../../build/index').default;
}

function delCashRequire(str) {
	delete require.cache[require.resolve(str)];
}
