const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const WebpackMonitor = require('webpack-monitor')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

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
        { loader: 'css-hot-loader' },
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      include: path.resolve(process.cwd(), 'src'),
      use: [
        { loader: 'css-hot-loader' },
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
    // http://localhost:3031
    new WebpackMonitor({
      capture: true, // -> default 'true'
      launch: false, // -> default 'false'
      port: 3031, // default -> 8081
    }),
    // http://localhost:3032
    new BundleAnalyzerPlugin({
      analyzerPort: 3032,
      openAnalyzer: false,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: devServerConfig
}
