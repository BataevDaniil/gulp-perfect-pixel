export default function parserNameImg(filesNames) {
	const sizes = {};
	filesNames.forEach(fileName => {
		const tmp = fileName.split('.');
		const pageName = tmp[0];
		const name = tmp[1];
		const extensionImage = tmp[2];

		const countPipeLine = name.match(/\|/g);
		if (countPipeLine === null)
			throw new Error('not pipe line');

		let one, two, type;
		if (countPipeLine.length === 2) {
			type = 'left-right';
			let tmp = name.slice(1, -1).split('-');
			one = parseInt(tmp[0]);
			two = parseInt(tmp[1]);
		} else if (countPipeLine.length === 1) {
			if (name[0] === '|') {
				type = 'left';
				one = parseInt(name.slice(1));
			}
			else if (name[name.length - 1] === '|') {
				type = 'right';
				one = parseInt(name.slice(0, -1));
			}
		}

		const size = {
			type,
			name,
			one,
			extensionImage,
		};
		if (two)
			size.two = two;

		if (!sizes[pageName])
			sizes[pageName] = {};
		sizes[pageName][name] = size;
	});
	return sizes;
}
