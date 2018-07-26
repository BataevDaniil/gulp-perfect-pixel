class PerfectPixel {
	static TYPE_ADAPTIVE = {
		LEFT : 'left',
		RIGHT: 'right',
		LEFT_RIGHT: 'left-right',
	};

	static DEFAULT = {
		CLASS_IMG: 'perfect-pixel__img',
		ROOT_URL_IMAGE: 'perfectPixel',
		EXTENSION_IMAGE: 'jpg',
		PAGE_NAME: 'index',
		SIZE: [
			{
				type: PerfectPixel.TYPE_ADAPTIVE.RIGHT,
				name: '720|',
				one: 720,
				style: {
					top: 0,
					left: 0,
					opacity: 0.8,
				},
				positionRelative: 'body', // or 'document'
			},
			{
				type: PerfectPixel.TYPE_ADAPTIVE.LEFT_RIGHT,
				name: '|720-1200|',
				one: 720,
				two: 1200,
				style: {
					top: 0,
					left: 0,
					opacity: 0.8,
				},
				positionRelative: 'body', // or 'document'
			},
			{
				type: PerfectPixel.TYPE_ADAPTIVE.LEFT,
				one: 1200,
				name: '|1200',
				style: {
					top: 0,
					left: 0,
					opacity: 0.8,
				},
				positionRelative: 'body', // or 'document'
			},
		]
	};

	constructor(size = PerfectPixel.DEFAULT.SIZE, options = {}) {
		this.size = size;
		this.pageName = options.pageName  || PerfectPixel.DEFAULT.PAGE_NAME;
		this.rootUrlImg = options.rootUrlImg || PerfectPixel.DEFAULT.ROOT_URL_IMAGE;
		this.extensionImage = options.extensionImage || PerfectPixel.DEFAULT.EXTENSION_IMAGE;
		this.img = document.getElementsByClassName(PerfectPixel.DEFAULT.CLASS_IMG)[0];

		window.addEventListener('load', this.adaptiveImg);
		window.addEventListener('resize', this.adaptiveImg);
	}
	adaptiveImg = () => {
		this.opacity = undefined;
		this.top = undefined;
		this.left = undefined;
		this.img.src = this.currentImg;
	};
	set left(x) {
		if (x !== undefined)
			this.currentAdaptive.style.left = x;
		this.img.style.left = this.imgStyle.left;
	}

	set top(x) {
		if (x !== undefined)
			this.currentAdaptive.style.top = x;
		this.img.style.top = this.imgStyle.top;
	}

	set opacity(x) {
		if (x !== undefined)
			this.currentAdaptive.style.opacity = x;
		this.img.style.opacity = this.imgStyle.opacity;
	}

	get imgStyle() {
		const currAdapt = this.currentAdaptive;
		const { top, left, opacity } = currAdapt.style;

		let bodyLeft = 0;
		if (currAdapt.positionRelative === 'body')
			bodyLeft = document.body.getBoundingClientRect().left;

		return {
			left: `${left + bodyLeft}px`,
			top: `${top}px`,
			opacity,
		}
	}

	get currentAdaptive() {
		for (let i = 0; i < this.size.length; i++) {
			const { type, one, two } = this.size[i];
			switch (type) {
				case PerfectPixel.TYPE_ADAPTIVE.LEFT: {
					if (window.matchMedia(`(min-width: ${one}px)`).matches)
						return this.size[i];
					else
						break;
				}
				case PerfectPixel.TYPE_ADAPTIVE.RIGHT: {
					if (window.matchMedia(`(max-width: ${one}px)`).matches)
						return this.size[i];
					else
						break;
				}
				case PerfectPixel.TYPE_ADAPTIVE.LEFT_RIGHT: {
					if (window.matchMedia(`(min-width: ${one}px)`).matches && window.matchMedia(`(max-width: ${two}px)`).matches)
						return this.size[i];
					else
						break;
				}
				default:
					console.error(`type no ${type}`);
			}
		}
		return false;
	}

	get currentImg () {
		return `${this.rootUrlImg}/${this.pageName}.${this.currentAdaptive.name}.${this.extensionImage}`;
	}
}
var size, options;

const perfectPixel =  new PerfectPixel(size, options);
