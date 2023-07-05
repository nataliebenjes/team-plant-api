const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new ESLintPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Team-Plant',
      template: './src/index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'name.html',
      template: './src/name.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'zipcode.html',
      template: './src/zipcode.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'criteria.html',
      template: './src/criteria.html',
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};