var webpack = require('webpack');

module.exports = {
	entry: './build/js/app.js',
	output: {
		path: __dirname + '/dist/js',
		filename: 'app.min.js'
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};