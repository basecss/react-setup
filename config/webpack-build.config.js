const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const WebpackMonitor = require('webpack-monitor')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  bail: true,
  entry: [
    path.resolve(process.cwd(), 'src/index.js')
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'app.[hash:8].min.js'
  },
  mode: 'production',
  devtool: 'source-map',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.[hash:8].min.css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true
      },
      hash: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(), 'public/static'),
        to: 'static'
      }
    ]),
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
    })
  ],
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
    ]
  }
}
