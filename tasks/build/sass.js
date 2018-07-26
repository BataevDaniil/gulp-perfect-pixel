const gulp = require('gulp');
const {reload}= require('browser-sync');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const removeComments = require('gulp-strip-css-comments');
const sourcemaps = require('gulp-sourcemaps');

const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const path = require('../../config/application');
const mode = require('../mode');


gulp.task('sass-build', () => {
	const src = (mode === 'production')
	             ? path.src.sassProduction
	             : path.src.sass;
	return gulp.src(src)
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
			return {
				title: 'Error style',
				message: err.message
			}})
		}))
		.pipe(gulpif('production' !== mode, sourcemaps.init()))
		.pipe(sass('production' === mode?{
			outputStyle: 'compressed'
		}:undefined))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
		}))
		.pipe(gulpif('production' === mode, removeComments()))
		.pipe(gulpif('production' !== mode, sourcemaps.write()))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});
