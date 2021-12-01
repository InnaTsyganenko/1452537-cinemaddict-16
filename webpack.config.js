const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public/'),
  },
  devServer: {
    hot: false,
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }
    ]
  }
};
