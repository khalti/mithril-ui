var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  devtool: "source-map",
  target: 'web',
  entry: './index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'mithri.ui.js',
    library: 'ui',
    libraryTarget: 'var'
  },
  externals: {
    mithril: "m",
    powerfrom: "powerform",
		"component-componentx": "component",
    "validate.js": "validate"
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
