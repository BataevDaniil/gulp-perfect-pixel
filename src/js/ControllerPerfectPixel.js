import PerfectPixel from './PerfectPixel';
import DragAndDrop from './DragAndDrop';
import HandlerKeyBoard from './HandlerKeyBoard';

class ControllerPerfectPixel extends PerfectPixel {
	constructor(size, options) {
		super(size, options);
		{
			const title = document.getElementsByClassName('perfect-pixel__control-panel__title')[0];
			this.controllerPanel = document.getElementsByClassName('perfect-pixel__control-panel')[0];
			this.dragAndDropController = new DragAndDrop(title, this.controllerPanel)
		}
		{
			const img = document.getElementsByClassName('perfect-pixel__img')[0];
			this.dragAndDropImage = new DragAndDrop(img, undefined, x => this.leftNative = x,  x => this.top = x)
		}
		this.buttonLock = document.getElementsByClassName('perfect-pixel__control-panel__button-lock-drag-image')[0];
		this.buttonLock.addEventListener('click', this.handlerButtonLockDragImage);

		this.buttonHide = document.getElementsByClassName('perfect-pixel__control-panel__button-hide-image')[0];
		this.buttonHide.addEventListener('click', this.handlerButtonHideImage);

		this.buttonClose = document.getElementsByClassName('perfect-pixel__control-panel__title__close')[0];
		this.buttonClose.addEventListener('click', this.handlerCloseControllerPanel);

		this.initHotKey();
	}
	initHotKey() {
		this.keyBoard = new HandlerKeyBoard();
		this.keyBoard.add('AltLeft+KeyP', this.handlerKeyBoardForCloseControllerPanel);
		this.keyBoard.add('AltLeft+KeyQ', this.handlerCloseControllerPanel);
		this.keyBoard.add('AltLeft+KeyL', this.handlerButtonLockDragImage);
		this.keyBoard.add('AltLeft+KeyH', this.handlerButtonHideImage);
	}

	handlerKeyBoardForCloseControllerPanel = event => {
		this.controllerPanel.style.display = '';
	};

	handlerCloseControllerPanel = () => {
		this.controllerPanel.style.display = 'none';
	};

	handlerButtonLockDragImage = () => {
		if (this.dragAndDropImage.toggleEnable())
			this.buttonLock.innerText = 'lock';
		else
			this.buttonLock.innerText = 'unlock';
	};

	handlerButtonHideImage = () => {
		if (this.toggleShow())
			this.buttonHide.innerText = 'hide';
		else
			this.buttonHide.innerText = 'unhide';
	};
}

const controllerPerfectPixel =  new ControllerPerfectPixel(size, options);
