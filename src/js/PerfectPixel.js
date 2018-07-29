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
		SIZE: {
			style: {
				top: 0,
				left: 0,
				opacity: 0.8,
			},
			positionRelative: 'body', // or 'document'
			extensionImage: 'jpg'
		},
		SIZES: {
			'720|': {
				type: PerfectPixel.TYPE_ADAPTIVE.RIGHT,
				name: '720|',
				one: 720,
				style: {
					top: 0,
					left: 0,
					opacity: 0.8,
				},
				positionRelative: 'body', // or 'document'
				extensionImage: 'jpg'
			},
			'|720-1200|': {
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
				extensionImage: 'jpg'
			},
			'|1200' : {
				type: PerfectPixel.TYPE_ADAPTIVE.LEFT,
				name: '|1200',
				one: 1200,
				style: {
					top: 0,
					left: 0,
					opacity: 0.8,
				},
				positionRelative: 'body', // or 'document'
				extensionImage: 'jpg'
			}
		}
	};

	isShow = true;

	constructor(size, options = {}) {
		this.initSize(size);
		this.pageName = options.pageName  || PerfectPixel.DEFAULT.PAGE_NAME;
		this.rootUrlImg = options.rootUrlImg || PerfectPixel.DEFAULT.ROOT_URL_IMAGE;
		this.img = document.getElementsByClassName(PerfectPixel.DEFAULT.CLASS_IMG)[0];

		window.addEventListener('load', this.adaptiveImg);
		window.addEventListener('resize', this.adaptiveImg);
	}
	initSize(size) {
		if (size === null || size === undefined)
			this.size = PerfectPixel.DEFAULT.SIZES;
		else {
			this.size = Object.create(size);
			for (let sz in this.size) {
				if (!this.size[sz].positionRelative)
					this.size[sz].positionRelative = PerfectPixel.DEFAULT.SIZE.positionRelative;

				if (!this.size[sz].extensionImage)
					this.size.extensionImage = PerfectPixel.DEFAULT.SIZE.positionRelative;

				if (!this.size[sz].style)
					this.size[sz].style = PerfectPixel.DEFAULT.SIZE.style;
				else {
					if(!this.size[sz].style.top)
						this.size[sz].style.top = PerfectPixel.DEFAULT.SIZE.style.top;

					if(!this.size[sz].style.left)
						this.size[sz].style.left= PerfectPixel.DEFAULT.SIZE.style.left;

					if(!this.size[sz].style.opacity)
						this.size[sz].style.opacity = PerfectPixel.DEFAULT.SIZE.style.opacity;

				}
			}
		}
	}

	toggleShow() {
		if (this.isShow)
			return this.hide();
		else
			return this.show();
	}
	show() {
		this.isShow = true;
		this.adaptiveImg();
		return this.isShow;
	}
	hide() {
		this.img.src = '';
		return this.isShow = false;
	}

	adaptiveImg = () => {
		this.opacity = undefined;
		this.top = undefined;
		this.left = undefined;
		this.img.src = this.currentImg;
	};
	set leftNative(x) {
		if (this.currentAdaptive !== false) {
			this.img.style.left = this.currentAdaptive.style.left = x;
		}
	}

	set left(x) {
		if (this.currentAdaptive !== false) {
			if (x !== undefined)
				this.currentAdaptive.style.left = x;
			this.img.style.left = this.imgStyle.left;
		}
	}

	set top(x) {
		if (this.currentAdaptive !== false) {
			if (x !== undefined)
				this.currentAdaptive.style.top = x;
			this.img.style.top = this.imgStyle.top;
		}
	}

	set opacity(x) {
		if (this.currentAdaptive !== false) {
			if (x !== undefined)
				this.currentAdaptive.style.opacity = x;
			this.img.style.opacity = this.imgStyle.opacity;
		}
	}

	get imgStyle() {
		const currAdapt = this.currentAdaptive;
		if (currAdapt === false)
			return {left: 0, top: 0, opacity: 0.8};
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
		if (!this.isShow)
			return false;

		for (let name in this.size) {
			const { type, one, two } = this.size[name];
			switch (type) {
				case PerfectPixel.TYPE_ADAPTIVE.LEFT: {
					if (window.matchMedia(`(min-width: ${one}px)`).matches)
						return this.size[name];
					else
						break;
				}
				case PerfectPixel.TYPE_ADAPTIVE.RIGHT: {
					if (window.matchMedia(`(max-width: ${one}px)`).matches)
						return this.size[name];
					else
						break;
				}
				case PerfectPixel.TYPE_ADAPTIVE.LEFT_RIGHT: {
					if (window.matchMedia(`(min-width: ${one}px)`).matches && window.matchMedia(`(max-width: ${two}px)`).matches)
						return this.size[name];
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
		const currAdapt = this.currentAdaptive;
		if (currAdapt === false)
			return '';
		return `${this.rootUrlImg}/${this.pageName}.${currAdapt.name}.${currAdapt.extensionImage}`;
	}
}

export default PerfectPixel;
