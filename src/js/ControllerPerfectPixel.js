import PerfectPixel from './PerfectPixel';
import DragAndDrop from './DragAndDrop';

class ControllerPerfectPixel extends PerfectPixel {
	constructor(size, options) {
		super(size, options);
		this.dragAndDropController = new DragAndDrop(document.getElementsByClassName('perfect-pixel__control-panel__title')[0], document.getElementsByClassName('perfect-pixel__control-panel')[0])
		this.dragAndDropImage = new DragAndDrop(document.getElementsByClassName('perfect-pixel__img')[0], undefined, x => this.leftNative = x,  x => this.top = x)
		this.buttonLock = document.getElementsByClassName('perfect-pixel__control-panel__button-lock-drag-image')[0];
		this.buttonLock.addEventListener('click', this.handlerButtonLock);
	}

	handlerButtonLock = () => {
		if (this.dragAndDropImage.toggleEnable())
			this.buttonLock.innerText = ' lock';
		else
			this.buttonLock.innerText = ' unlock';
	}
}

const controllerPerfectPixel =  new ControllerPerfectPixel(size, options);
