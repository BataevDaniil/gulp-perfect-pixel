import { obj as through } from 'through2';
import path from 'path';
import { PluginError} from 'gulp-util';
import { log } from 'gulp-util';
import { insert } from './helpers';
import wrapper from './wrapper';
import parserNameImg from './parserNameImg';
import fs from 'fs';

function wrapperGulpperfectPixel(size, options) {
	return through(function gulpPerfectPixel(file, enc, callBack) {
		const DEFAULT_ROOT_PATH_IMG = './perfectPixel/img';

		if (file.isStream()) {
			return callBack(new PluginError('gulp-perfect-pixel', 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			try {
				const pageName = path.basename(file.path, path.extname(file.path));
				const opt = Object.assign(options || {}, {
					pageName,
				});
				if (!opt.rootPathImage)
					opt.rootPathImage = DEFAULT_ROOT_PATH_IMG;

				const namesImages = fs.readdirSync(opt.rootPathImage);
				const sizeFromNameImg = parserNameImg(namesImages);

				if (size && size[pageName]) {
					for (let sz in size[pageName]) {
						if (sizeFromNameImg[pageName] && sizeFromNameImg[pageName][sz]) {
							Object.assign(sizeFromNameImg[pageName][sz], size[pageName][sz])
						}
					}
				}

				const code = wrapper(sizeFromNameImg[pageName], opt);
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
