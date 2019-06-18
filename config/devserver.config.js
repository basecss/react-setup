const path = require('path')

module.exports = {
  compress: true,
  contentBase: path.join(process.cwd(), 'public'),
  historyApiFallback: true,
  hot: true,
  overlay: true,
  port: 8080,
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/
  }
}
