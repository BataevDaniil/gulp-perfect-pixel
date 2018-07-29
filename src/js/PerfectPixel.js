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
	eventChangeStyle = [];

	constructor(size, options = {}) {
		this.initSize(size);
		this.pageName = options.pageName  || PerfectPixel.DEFAULT.PAGE_NAME;
		this.rootUrlImg = options.rootUrlImg || PerfectPixel.DEFAULT.ROOT_URL_IMAGE;
		this.img = document.getElementsByClassName(PerfectPixel.DEFAULT.CLASS_IMG)[0];

		window.addEventListener('load', this.adaptiveImg);
		window.addEventListener('resize', this.adaptiveImg);
		this.adaptiveImg();
	}
	addEventChangeStyle(callBack) {
		this.eventChangeStyle.push(callBack);
	}
	eventDispatch(event) {
		this.eventChangeStyle.forEach(cb => cb(event))
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
		this.leftRelative = undefined;
		this.img.src = this.currentImg;
	};

	get bodyLeft() {
		const currAdapt = this.currentAdaptive;
		let bodyLeft = 0;
		if (currAdapt.positionRelative === 'body')
			bodyLeft = document.body.getBoundingClientRect().left;
		return bodyLeft;
	}

	get left() {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false)
			return currAdapt.style.left + this.bodyLeft;
		else
			return 0;
	}
	set left(x) {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false) {
			if (x !== undefined) {
				currAdapt.style.left = x - this.bodyLeft;
				this.img.style.left = `${x}px`;
			}
			else
				this.img.style.left = `${currAdapt.style.left + this.bodyLeft}px`;
			this.eventDispatch();

		}
	}

	get leftRelative() {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false)
			return currAdapt.style.left;
		else
			return 0;
	}

	set leftRelative(x) {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false) {
			if (x !== undefined)
				currAdapt.style.left = x;
			this.img.style.left = `${currAdapt.style.left + this.bodyLeft}px`;
			this.eventDispatch();
		}
	}

	get top() {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false)
			return currAdapt.style.top;
		else
			return 0;
	}

	set top(x) {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false) {
			if (x !== undefined)
				currAdapt.style.top = x;
			this.img.style.top = `${currAdapt.style.top}px`;
			this.eventDispatch();
		}
	}

	get opacity() {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false)
			return currAdapt.style.opacity;
		else
			return 0;
	}

	set opacity(x) {
		const currAdapt = this.currentAdaptive;
		if (currAdapt !== false) {
			if (x !== undefined)
				currAdapt.style.opacity = x;
			this.eventDispatch();
			this.img.style.opacity = currAdapt.style.opacity;

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
