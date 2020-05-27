var MyPlugin = require('./index')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
    filename: 'out.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MyPlugin({
      fileName: 'index3.html',
      baseSrc: 'http://www.baidu.com'
    })
  ] 
}