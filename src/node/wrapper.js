import fs from 'fs';

function wrapper(size, options) {
	const DEFAULT_NAME_CSS = 'main.css';
	const DEFAULT_NAME_JS = 'ControllerPerfectPixel.js';
	const DEFAULT_NAME_HTML = 'main.html';

	let css = String(fs.readFileSync(`${__dirname}/${DEFAULT_NAME_CSS}`));
	let js = String(fs.readFileSync(`${__dirname}/${DEFAULT_NAME_JS}`));
	let html = String(fs.readFileSync(`${__dirname}/${DEFAULT_NAME_HTML}`));

	return  `
		<div class="perfect-pixel-wrapper">
			${html}
			<style>${css}</style>
			<script>
				var size = ${JSON.stringify(size)};
				var options = ${JSON.stringify(options)};
			</script>
			<script>${js}</script>
		</div>
	`
}

export default wrapper;
