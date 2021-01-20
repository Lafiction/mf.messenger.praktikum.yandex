const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/app.ts', './styles/style.scss'],
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './static'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: { fs: false },
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      publicPath: '/static',
    }),
  ],
};
