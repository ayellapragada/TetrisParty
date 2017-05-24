// webpack.config.js
var path = require('path');

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};
