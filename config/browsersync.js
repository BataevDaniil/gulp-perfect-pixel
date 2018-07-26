const browserSyncConfig = {
	logPrefix: 'server',
	port: 3000,
	ui: {
		port: 3001
	},
	server: {
		baseDir: './build',
		// directory: true
		routes: {
			"/perfectPixel": "mock/img"
		}
	}
};

module.exports = browserSyncConfig;
