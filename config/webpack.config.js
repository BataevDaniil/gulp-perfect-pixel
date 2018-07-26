const mode = require('../tasks/mode');

let config = {
	mode: (mode === 'production')
	      ? 'production'
	      : 'development',
	watch: (mode !== 'production'),
	// devtool: 'source-map',
	devtool: 'eval',
	watchOptions: {
		aggregateTimeout: 100,
		poll: 100
	},
	resolve: {
		modules: ['./node_modules'],
		extensions: ['.js', '.json']
	},
	resolveLoader: {
		modules: ['./node_modules'],
		moduleExtensions: ['-loader'],
		extensions: ['.js']
	},
	module: {
		rules: [{
			test: /\.js?$/i,
			exclude:/(node_modules)/,
			use: ['babel']
		}]

	},
};

module.exports = config;
