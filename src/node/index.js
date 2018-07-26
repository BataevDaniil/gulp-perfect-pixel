const through = require('through2').obj;
const path = require('path');
const PluginError = require('gulp-util').PluginError;
const log = require('gulp-util').log;
const insert = require('./helpers').insert;
import wrapper from './wrapper';
// const wrapper = require('./wrapper');

module.exports = function wrapperGulpperfectPixel(options) {
	return through(function gulpPerfectPixel(file, enc, callBack) {

		if (file.isStream()) {
			return callBack(new PluginError('gulp-perfect-pixel', 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			try {
				const pageName = path.basename(file.path, path.extname(file.path));
				const opt = Object.assign(options || {}, {
					pageName,
				});

				const code = wrapper(opt);
				let contents = String(file.contents);
				const index = contents.indexOf('</body>');
				contents = insert(contents, index, code);
				log(`Add perfect pixel in ${file.relative}`);
				file.contents = new Buffer(contents);
			} catch (e) {
				return callBack(new PluginError('gulp-perfect-pixel', e));
			}
		}
		callBack(null, file);
	});
};
