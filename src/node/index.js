import { obj as through } from 'through2';
import path from 'path';
import { PluginError} from 'gulp-util';
import { log } from 'gulp-util';
import { insert } from './helpers';
import wrapper from './wrapper';
import fs from 'fs';

function wrapperGulpperfectPixel(size, options) {
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
				// TODO: typing parse name img
				fs.readdirSync('./mock/img');
				///////////////////////////

				const code = wrapper(size && size[pageName], opt);
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
}

export default wrapperGulpperfectPixel;
