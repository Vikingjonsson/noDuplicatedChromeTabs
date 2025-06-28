const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/background.ts',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'webworker', // Chrome extension service worker
  optimization: {
    minimize: false, // No minification for development
  },
  devtool: 'source-map', // Generate source maps for debugging
};
