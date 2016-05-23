'use strict';

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var banner = require('./utils/banner');
var LIB_NAME = 'react-video';
var GLOBAL_VAR = 'ReactVideo';

module.exports = {
  entry: './lib/' + LIB_NAME + '.jsx',
  output: {
    path: __dirname + '/dist',
    filename: LIB_NAME + '.js',
    library: GLOBAL_VAR
  },
	externals: {
	'react': 'React'
	},
  module: {
    loaders: [
			{
				test: /\.jsx?$/,
        include: path.join(__dirname, 'lib'),
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-1'],
				}
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
    new webpack.BannerPlugin(banner, { raw: true, entryOnly: true })
  ]
};
