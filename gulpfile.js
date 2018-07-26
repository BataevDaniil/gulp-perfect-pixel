const gulp = require('gulp');

const path = require('./config/application');
const mode = require('./tasks/mode');

const requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });

console.log(mode);

gulp.task('build',
	gulp.series('clean',
	gulp.parallel(
		'js-build',
		'sass-build',
		(mode === 'development-gulp-perfect-pixel' || mode === 'production')
		? gulp.series('node-build', 'pug-build')
		: 'pug-build'
	)));

gulp.task('watch', () => {
	gulp.watch(path.watch.pug, gulp.series('pug-build'));
	gulp.watch(path.watch.sass, gulp.series('sass-build'));
	if (mode === 'development-gulp-perfect-pixel')
		gulp.watch(path.watch.node, gulp.series('node-build', 'pug-build'));
});

gulp.task('production', gulp.series('build'));

gulp.task('default',
	gulp.series('build',
	gulp.parallel(
	              'browser-sync',
	              'watch')));
