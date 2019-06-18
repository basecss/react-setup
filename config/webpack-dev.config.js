const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServerConfig = require('./devserver.config')

module.exports = {
  entry: [
    path.resolve(process.cwd(), 'src/index.js')
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'app.js'
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      include: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      include: path.resolve(process.cwd(), 'src'),
      use: [
        // 'css-hot-loader',
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'less-loader', options: { sourceMap: true } }
      ]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: path.resolve(process.cwd(), 'src'),
      use: [
        { loader: 'babel-loader', options: { cacheDirectory: true } },
        { loader: 'eslint-loader', options: { emitWarning: true, formatter: path.resolve(process.cwd(), '.eslintrc') } }
      ]
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.wasm']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: devServerConfig
}
