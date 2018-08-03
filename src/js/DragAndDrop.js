class DragAndDrop {
	isPress = false;
	grab = {left: 0, top: 0};
	isEnable = true;

	constructor(target, drager, setLeft, setTop) {
		if (setLeft)
			this.setLeft = setLeft;
		if (setTop)
			this.setTop = setTop;
		this.target = target;
		this.drager = drager || target;

		this.target.addEventListener('mousedown', this.handlerPress);
		window.addEventListener('mouseup', this.handlerRelease);
		window.addEventListener('mousemove', this.handlerDrag);
	}

	handlerPress = event => {
		if (event.target !== this.target)
			return;
		if (!this.isEnable)
			return;
		this.isPress = true;
		this.addCursor();
		let { left, top } = this.drager.getBoundingClientRect();
		this.grab = {
			left: event.pageX - left,
			top: event.clientY - top,
		};
	};

	handlerRelease = () => {
		this.isPress = false;
		this.removeCursor();
	};

	handlerDrag = event => {
		event.preventDefault();
		if (!this.isPress)
			return;
		const position = window.getComputedStyle(this.drager).position;
		let x = 0, y = 0;
		if (position === 'absolute') {
			x = event.pageX;
			y = event.pageY;
		} else if (position === 'fixed') {
			x = event.clientX;
			y = event.clientY;
		}
		else
			console.warn('DragAndDrop: you not set drager element in style position absolute or fixed');

		this.left = x - this.grab.left;
		this.top = y - this.grab.top;
	};

	addCursor = () => this.target.style.cursor = 'move';
	removeCursor = () => this.target.style.cursor = '';

	toggleEnable = () => this.isEnable = !this.isEnable;
	enable = () => this.isEnable = true;
	disable = () => this.isEnable = false;

	set left(x) {
		if (this.setLeft)
			this.setLeft(x);
		else
			this.drager.style.left = `${x}px`;
	}
	set top(x) {
		if (this.setTop)
			this.setTop(x);
		else
			this.drager.style.top = `${x}px`;
	}
}

export default DragAndDrop;
