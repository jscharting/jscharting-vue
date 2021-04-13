const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? '/jscharting-vue-examples/'
		: '/',
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, 'node_modules/jscharting/dist/'),
					to: path.join(__dirname, 'dist/assets/jscharting/'),
					ignore: ['jscharting.*']
				}
			])
		]
	}
};
