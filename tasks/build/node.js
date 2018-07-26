const gulp = require('gulp');
const {reload}= require('browser-sync');

const path = require('../../config/application');
const babel = require('gulp-babel');

gulp.task('node-build', function(){
	return gulp.src(path.src.node)
		.pipe(babel())
		.pipe(gulp.dest(path.build.node))
		.pipe(reload({stream: true}));
});
