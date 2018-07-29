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
		this.drager = (drager) ? drager : target;

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
		const { left, top } = this.target.getBoundingClientRect();
		this.grab = {
			left: event.pageX - left,
			top: event.pageY - top,
		};
	};

	handlerRelease = event => {
		this.isPress = false;
		this.removeCursor();
	};

	handlerDrag = event => {
		event.preventDefault();
		if (!this.isPress)
			return;
		this.left = event.pageX - this.grab.left;
		this.top = event.pageY - this.grab.top;
	};

	addCursor() {
		this.target.style.cursor = 'move';
	}

	removeCursor() {
		this.target.style.cursor = '';
	}

	toggleEnable() {
		return this.isEnable = !this.isEnable;
	}

	enable() {
		return this.isEnable = true;
	}

	disable() {
		return this.isEnable = false;
	}

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
