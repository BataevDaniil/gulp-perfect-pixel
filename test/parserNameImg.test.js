import parseNameImg from '../src/node/parserNameImg';

describe('Parser name image', () => {
let data = {
	value: [
		'index.720|.jpg',
		'index.|720-1200|.jpg',
		'index.|1200.jpg'],
	answer: {
		index: {
			'720|': {
				type: 'right',
				name: '720|',
				one: 720,
				extensionImage: 'jpg'
			},
			'|720-1200|': {
				type: 'left-right',
				name: '|720-1200|',
				one: 720,
				two: 1200,
				extensionImage: 'jpg'
			},
			'|1200': {
				type: 'left',
				name: '|1200',
				one: 1200,
				extensionImage: 'jpg'
			}
		}
	}
};
	test(`name img ${JSON.stringify(data.value)} should parse ${JSON.stringify(data.answer)})`, () => {
		expect(parseNameImg(data.value)).toEqual(data.answer);
	})
});
