function getStyleUser(style) {

	return `
		${style.positionRelative !== 'body' ? `left: ${style.left || 0}` : ''};
		top: ${style.top || 0};
		opacity: ${style.opacity || 1};
	`;
}

function perfectPixel(options) {
	const DEFAULT_ROOT_PATH_IMAGE = 'perfectPixel';

	const DEFAULT_ADAPTIV_SIZE_PAGES = {
		mobile: '740px',
		tablet: '1099px',
	};

	const DEFAULT_EXTENSION_IMAGE = 'jpg';

	const rootPathImg = options.rootPathImg
	                    ||
	                    DEFAULT_ROOT_PATH_IMAGE;

	const DEFAULT_USER_STYLE = {
		positionRelative: 'body', // or 'document'
		top: '0px',
		left: '0px',
		opacity: 0.8,
	};

	const adaptivSizePages = options.adaptivSizePages
                             ||
	                         DEFAULT_ADAPTIV_SIZE_PAGES;

	const baseStyleImag = `
		position: absolute;
		z-index: 100000;
		pointer-events: none;
	`;

	const extension = options.extenstion
	                  ||
	                  DEFAULT_EXTENSION_IMAGE;
	const pageName = options.pageName || 'index';

	let userStyle = {};
	if (options.userStyle && options.userStyle[pageName]) {
		if (options.userStyle[pageName].mobile)
			userStyle.mobile = options.userStyle[pageName].mobile;
		else userStyle.mobile = DEFAULT_EXTENSION_IMAGE;

		if (options.userStyle[pageName].tablet)
			userStyle.tablet = options.userStyle[pageName].tablet;
		else userStyle.tablet = DEFAULT_EXTENSION_IMAGE;

		if (options.userStyle[pageName].desktop)
			userStyle.desktop = options.userStyle[pageName].desktop;
		else userStyle.desktop = DEFAULT_EXTENSION_IMAGE;
	} else userStyle = {
		mobile: DEFAULT_USER_STYLE,
		tablet: DEFAULT_USER_STYLE,
		desktop: DEFAULT_USER_STYLE,
	};

	const id = generateId();
	const stylesForAdaptiv = `
		.perfect-pixel-img-${id} {
			${baseStyleImag}
		}
		@media (max-width: ${adaptivSizePages.mobile}) {
			.perfect-pixel-img-${id} {
				content:url('${rootPathImg}/${pageName}.mobile.${extension}');
				${getStyleUser(userStyle.mobile)}
			}
		}
		@media (min-width: ${adaptivSizePages.mobile}) and (max-width: ${adaptivSizePages.tablet}) {
			.perfect-pixel-img-${id} {
				content:url('${rootPathImg}/${pageName}.tablet.${extension}');
				${getStyleUser(userStyle.tablet)}
			}
		}
		@media (min-width: ${adaptivSizePages.tablet}) {
			.perfect-pixel-img-${id} {
				content:url('${rootPathImg}/${pageName}.desktop.${extension}');
				${getStyleUser(userStyle.desktop)}
			}
		}
	`;

	const keepRelativBody = `<script>
	{
	  	const adaptivSizePages = {
			mobile: '${parseInt(adaptivSizePages.mobile)}',
			tablet: '${parseInt(adaptivSizePages.tablet)}',
		};
		const leftAll = {
			mobile: '${userStyle.mobile.left}',
			tablet: '${userStyle.tablet.left}',
			desktop: '${userStyle.desktop.left}',
		};
	  	const img = document.getElementsByClassName('${`perfect-pixel-img-${id}`}')[0];
		window.addEventListener('resize', function (e) {
		  	const left = document.body.getBoundingClientRect().left;
		  	const displayWidth = document.documentElement.clientWidth;
		  	const shift = (str) => {
		  	  console.log(!str);
		  		if (!str || str === 'undefined') return left + 'px';
		  		let tmp = parseInt(str) || 0;
		  		let tmp1 = str.slice(tmp.toString().length) || 'px';
		  		console.log('tmp = ', tmp);
		  		console.log('tmp1 = ', tmp1);
		  		return (left + tmp).toString() + tmp1;
		  	};
		  	if (displayWidth < adaptivSizePages.mobile)
		  		img.style.left = shift(leftAll.mobile);
		  	else if (adaptivSizePages.mobile < displayWidth && displayWidth < adaptivSizePages.tablet)
		  		img.style.left = shift(leftAll.tablet);
		  	else if (adaptivSizePages.tablet < displayWidth)
		  		img.style.left = shift(leftAll.desktop);


		});
	}
	</script>`;
	return `
		<div class="perfect-pixel-wrapper-${id}">
			<img class="perfect-pixel-img-${id}">
			<style>${stylesForAdaptiv}</style>
			${keepRelativBody}
		</div>
	`;
}

export default perfectPixel;
