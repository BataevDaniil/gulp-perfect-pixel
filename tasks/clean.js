const gulp = require('gulp');
const rimraf = require('rimraf');

const path = require('../config/application');

gulp.task('clean', callback => rimraf(path.clean, callback));
