'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var banner = require('./utils/banner');
var LIB_NAME = 'react-video';
var GLOBAL_VAR = 'ReactVideo';

module.exports = {
  entry: './lib/' + LIB_NAME + '.jsx',
  output: {
    path: __dirname + '/dist',
    filename: LIB_NAME + '.js',
    libraryTarget: 'umd',
    library: GLOBAL_VAR
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
			{
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: true,
          plugins: [
            // 'transform-runtime' should do as little as possible.
            // https://github.com/este/este/issues/862
            ['transform-runtime', { polyfill: false, regenerator: false }],
            'add-module-exports',
          ],
          presets: ['es2015', 'react', 'stage-1'],
          env: {
            development: {
              presets: ['react-hmre']
            },
            production: {
              plugins: [
                'transform-react-constant-elements',
                'transform-react-inline-elements'
              ]
            }
          }
        }
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
