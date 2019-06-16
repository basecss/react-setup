const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist/',
    libraryTarget: 'umd',
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      include: path.resolve('./src')
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          formatter: require('./.eslintrc')
        }
      }]
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
      title: 'React Setup',
      filename: '../index.html',
      template: './index.html',
      alwaysWriteToDisk: true,
      inject: true,
      hash: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: 8088,
    inline: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      })
    ],
  }
}
