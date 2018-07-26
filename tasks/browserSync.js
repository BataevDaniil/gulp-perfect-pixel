const gulp = require('gulp');
const browserSync = require('browser-sync');

const browserSyncConfig = require('../config/browsersync');

gulp.task('browser-sync', () => {
	browserSync.init(browserSyncConfig);
});
