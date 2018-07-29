class HandlerKeyBoard {
	pressed = {};
	handlers = {};

	constructor() {
		window.addEventListener('keydown', this.handlerKeyDown);
		window.addEventListener('keyup', this.handlerKeyUp)
	}

	add(key, callBack) {
		if (!this.handlers[key])
			this.handlers[key] = [];

		this.handlers[key].push(callBack);
	}

	remove(key, callBack) {
		if (this.handlers[key]) {
			this.handlers[key] = this.handlers[key].filter(cb => cb !== callBack);
			if (this.handlers[key].length === 0)
				delete this.handlers[key];
		}
	}

	handlerKeyDown = event => {
		this.pressed[event.code] = true;
		const callBacks = this.handlers[Object.keys(this.pressed).join('+')];
		if (callBacks)
			callBacks.forEach(callBack => callBack(event));
	};

	handlerKeyUp = event => {
		delete this.pressed[event.code];
	}
}

export default HandlerKeyBoard;
