import PerfectPixel from './PerfectPixel';
import DragAndDrop from './DragAndDrop';
import HandlerKeyBoard from './HandlerKeyBoard';
import { $ } from './helpers';

class ControllerPerfectPixel extends PerfectPixel {
	static DEFAULT_SPEED_CHANGE_POSITION = 1;
	constructor(size, options) {
		super(size, options);
		{
			const title = $('.perfect-pixel__control-panel__title');
			this.controllerPanel = $('.perfect-pixel__control-panel');
			this.dragAndDropController = new DragAndDrop(title, this.controllerPanel)
		}
		{
			const img = $('.perfect-pixel__img');
			this.dragAndDropImage = new DragAndDrop(img, undefined, x => this.left = x, x => this.top = x)
		}
		this.initButtons();
		this.initHotKey();
		this.initField();
		this.addEventChangeStyle(this.handlerField)
	}
	initField() {
		this.fieldPositionX = $('.perfect-pixel__control-panel__wrapper-input__position-x');
		this.fieldPositionX.addEventListener('input', this.handlerChangeInputPositionX);

		this.fieldPositionY = $('.perfect-pixel__control-panel__wrapper-input__position-y');
		this.fieldPositionY.addEventListener('input', this.handlerChangeInputPositionY);
	}
	initButtons() {
		this.buttonLock = $('.perfect-pixel__control-panel__button-lock-drag-image');
		this.buttonLock.addEventListener('click', this.handlerButtonLockDragImage);

		this.buttonHide = $('.perfect-pixel__control-panel__button-hide-image');
		this.buttonHide.addEventListener('click', this.handlerButtonHideImage);

		this.buttonClose = $('.perfect-pixel__control-panel__title__close');
		this.buttonClose.addEventListener('click', this.handlerCloseControllerPanel);
	}
	initHotKey() {
		this.keyBoard = new HandlerKeyBoard();
		this.keyBoard.add('AltLeft+KeyP', this.handlerKeyBoardOpenControllerPanel);
		this.keyBoard.add('AltLeft+KeyQ', this.handlerCloseControllerPanel);
		this.keyBoard.add('AltLeft+KeyL', this.handlerButtonLockDragImage);
		this.keyBoard.add('AltLeft+KeyH', this.handlerButtonHideImage);

		this.keyBoard.add('ArrowUp', this.handlerKeyBoardArrowUp);
		this.keyBoard.add('ArrowRight', this.handlerKeyBoardArrowRight);
		this.keyBoard.add('ArrowDown', this.handlerKeyBoardArrowDown);
		this.keyBoard.add('ArrowLeft', this.handlerKeyBoardArrowLeft);
	}

	handlerKeyBoardArrowUp = event =>
		(event.preventDefault(), this.top = this.top - ControllerPerfectPixel.DEFAULT_SPEED_CHANGE_POSITION);
	handlerKeyBoardArrowRight = event =>
		(event.preventDefault(), this.left = this.left + ControllerPerfectPixel.DEFAULT_SPEED_CHANGE_POSITION);
	handlerKeyBoardArrowDown = event =>
		(event.preventDefault(), this.top = this.top + ControllerPerfectPixel.DEFAULT_SPEED_CHANGE_POSITION);
	handlerKeyBoardArrowLeft = event =>
		(event.preventDefault(), this.left = this.left - ControllerPerfectPixel.DEFAULT_SPEED_CHANGE_POSITION);

	handlerChangeInputPositionX = event => this.leftRelative = parseFloat(event.target.value) || 0;
	handlerChangeInputPositionY = event => this.top = parseFloat(event.target.value) || 0;

	handlerField = () => {
		this.fieldPositionX.value = this.leftRelative;
		this.fieldPositionY.value = this.top;
	};

	handlerKeyBoardOpenControllerPanel = () => this.controllerPanel.style.display = '';
	handlerCloseControllerPanel = () => this.controllerPanel.style.display = 'none';

	handlerButtonLockDragImage = () =>
		this.buttonLock.innerText = this.dragAndDropImage.toggleEnable() ? 'lock' : 'unlock';

	handlerButtonHideImage = () =>
		this.buttonHide.innerText = this.toggleShow() ? 'hide' : 'unhide';
}

const controllerPerfectPixel =  new ControllerPerfectPixel(size, options);
