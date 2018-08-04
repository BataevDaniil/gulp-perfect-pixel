class Road {
	isPress = false;
	handelrs = [];
	min = 0;
	max = 1;

	constructor(road, grab, options = {}) {
		this.road = road;
		this.grab = grab;

		if (options.min)
			this.min = options.min;
		if (options.max)
			this.max= options.max;

		this.road.addEventListener('mousedown', this.handlerPressRoad);
		this.grab.addEventListener('mousedown', this.handlerPressRoad);
		document.addEventListener('mouseup', this.handlerMouseUp);
		document.addEventListener('mousemove', this.handlerMouseMove)
	}

	handlerPressRoad = event => {
		this.isPress = true;
		this.handlerMouseMove(event);
	};

	handlerMouseUp = () => this.isPress = false;

	handlerMouseMove = event => {
		if (!this.isPress)
			return;

		let w = event.clientX - this.road.getBoundingClientRect().left;
		if (w < 0)
			w = 0;
		else if (w > this.road.clientWidth)
			w = this.road.clientWidth;
		this.grab.style.width = `${this.mapW(w)}%`;
		this.handelrs.forEach(callBack => callBack(this.map(this.mapW(w))));
	};

	mapW = x => x * 100 / this.road.clientWidth;

	map = x => this.min + (this.max - this.min) / 100.0 * x;

	addEventListener = (callBack) => this.handelrs.push(callBack);
}

export default Road;
