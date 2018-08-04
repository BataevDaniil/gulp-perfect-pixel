import PerfectPixel from './PerfectPixel';
import DragAndDrop from './DragAndDrop';
import HandlerKeyBoard from './HandlerKeyBoard';
import Road from './Road';
import { $ } from './helpers';

class ControllerPerfectPixel extends PerfectPixel {
	static DEFAULT_SPEED_CHANGE_POSITION = 1;
	constructor(size, options) {
		super(size, options);
		this.lock();
		{
			const title = $('.perfect-pixel__control-panel__title');
			this.controllerPanel = $('.perfect-pixel__control-panel');
			this.dragAndDropController = new DragAndDrop(title, this.controllerPanel)
		}
		{
			const img = $('.perfect-pixel__img');
			this.dragAndDropImage = new DragAndDrop(img, undefined, x => this.left = x, x => this.top = x)
			this.dragAndDropImage.disable();
		}
		{
			this.miniControllerPanel = $('.perfect-pixel__mini-control-panel');
			this.miniControllerPanel.addEventListener('dblclick', this.handlerCloseMiniControlPanel);
			this.dragAndDropController = new DragAndDrop(this.miniControllerPanel)
		}
		this.initButtons();
		this.initHotKey();
		this.initField();
		this.addEventChangeStyle(this.handlerField)
	}
	initField() {
		this.fieldPositionX = $('.perfect-pixel__control-panel__wrapper-position__x');
		this.fieldPositionX.addEventListener('input', this.handlerChangeInputPositionX);

		this.fieldPositionY = $('.perfect-pixel__control-panel__wrapper-position__y');
		this.fieldPositionY.addEventListener('input', this.handlerChangeInputPositionY);

		this.rangeOpacity = new Road($('.perfect-pixel__control-panel__wrapper-opacity_range'), $('.perfect-pixel__control-panel__wrapper-opacity_grab'), {min: 0, max: 1});
		this.rangeOpacity.addEventListener(this.handlerChangeOpacity);
	}
	initButtons() {
		this.buttonLock = $('.perfect-pixel__control-panel__button-lock-drag-image');
		this.buttonLock.addEventListener('click', this.handlerButtonLockDragImage);

		this.buttonLockMini = $('.perfect-pixel__mini-control-panel__button-lock-drag-image');
		this.buttonLockMini.addEventListener('click', this.handlerButtonMiniLockDragImage);

		this.buttonHide = $('.perfect-pixel__control-panel__button-hide-image');
		this.buttonHide.addEventListener('click', this.handlerButtonHideImage);

		this.buttonHideMini = $('.perfect-pixel__mini-control-panel__button-hide-image');
		this.buttonHideMini.addEventListener('click', this.handlerButtonMiniHideImage);

		this.buttonClose = $('.perfect-pixel__control-panel__title__close');
		this.buttonClose.addEventListener('click', this.handlerCloseControllerPanel);

		this.radioButtonBody = $('.perfect-pixel__control-panel__wrapper-relative__body');
		this.radioButtonBody.addEventListener('change', this.handlerRelativePositionBody);

		this.radioButtonDocument = $('.perfect-pixel__control-panel__wrapper-relative__document');
		this.radioButtonDocument.addEventListener('change', this.handlerRelativePositionDocument);

		this.buttonOpenMiniControlPanel = $('.perfect-pixel__control-panel__title__button-open-mini-control-panel');
		this.buttonOpenMiniControlPanel.addEventListener('click', this.handlerOpenMiniControlPanel)
	}
	initHotKey() {
		this.keyBoard = new HandlerKeyBoard();
		this.keyBoard.add('AltLeft+KeyP', this.handlerKeyBoardOpenCloseControllerPanel);
		this.keyBoard.add('AltLeft+KeyL', this.handlerButtonLockDragImage);
		this.keyBoard.add('AltLeft+KeyH', this.handlerButtonHideImage);

		this.keyBoard.add('ArrowUp', this.handlerKeyBoardArrowUp);
		this.keyBoard.add('ArrowRight', this.handlerKeyBoardArrowRight);
		this.keyBoard.add('ArrowDown', this.handlerKeyBoardArrowDown);
		this.keyBoard.add('ArrowLeft', this.handlerKeyBoardArrowLeft);
	}

	handlerCloseMiniControlPanel = event => {
		if (event.target !== event.currentTarget)
			return;

		this.miniControllerPanel.style.display = 'none';
		this.handlerOpenControllerPanel()
	};

	handlerOpenMiniControlPanel = () => {
		const bounding = this.controllerPanel.getBoundingClientRect();
		this.miniControllerPanel.style.left = bounding.left;
		this.miniControllerPanel.style.top = bounding.top;
		this.miniControllerPanel.style.display = 'initial';
		this.handlerCloseControllerPanel();
		this.initButtonMiniLock();
		this.initButtonMiniHide();
	};

	handlerChangeOpacity = value => this.opacity = value;

	handlerRelativePositionDocument = () => this.positionRelative = 'document';
	handlerRelativePositionBody = () => this.positionRelative = 'body';

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

		this.rangeOpacity.value = this.opacity;

		if (this.positionRelative === 'body')
			this.radioButtonBody.checked = true;
		else
			this.radioButtonDocument.checked = true;
	};

	handlerKeyBoardOpenCloseControllerPanel = () =>
		this.controllerPanel.style.display = (this.controllerPanel.style.display === 'none') ? '' : 'none';
	handlerCloseControllerPanel = () =>
		this.controllerPanel.style.display = 'none';
	handlerOpenControllerPanel = () =>
		this.controllerPanel.style.display = '';

	handlerButtonLockDragImage = () => {
		this.dragAndDropImage.toggleEnable();
		this.toggleLock();
		this.buttonLock.innerText =  this.isLock ? 'unLock' : 'lock';
	};

	initButtonMiniLock = () =>
		this.buttonLockMini
			.classList[ this.isLock ? 'remove' : 'add' ]('perfect-pixel__mini-control-panel__button-lock-drag-image_close');

	handlerButtonMiniLockDragImage = () => {
		this.handlerButtonLockDragImage();
		this.initButtonMiniLock();
	};

	handlerButtonHideImage = () =>
		this.buttonHide.innerText = this.toggleShow() ? 'hide' : 'unHide';

	initButtonMiniHide = () =>
		this.buttonHideMini
			.classList[ this.isShow ? 'remove' : 'add' ]('perfect-pixel__mini-control-panel__button-hide-image_open');

	handlerButtonMiniHideImage = () => {
		this.handlerButtonHideImage();
		this.initButtonMiniHide();
	}
}

const controllerPerfectPixel =  new ControllerPerfectPixel(size, options);
