// webpack.config.js
var path = require('path');

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './bundle.js',
  },
  devtool: 'source-map',
};
