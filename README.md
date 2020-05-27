# Inject Base Element Webpack Plugin
在html-webpack-plugin注入资源后，复制一份html, 并在其中注入一个base标签

## Install
```
npm i --save-dev @chwech/inject-base-element-webpack-plugin
```

## Usage
**webpack.config.js**

```javascript
const InjectBaseElementWebpackPlugin = require('@chwech/inject-base-element-webpack-plugin')

module.exports = {
  plugins: [
    new InjectBaseElementWebpackPlugin()
  ]
}
```
## options
Name | Type | Default | Description
--|--|--|--
fileName| {string} | 'test.html'| 生成的html文件名
href | {string} | 'http://www.chwech.com' | base标签的href属性值

example:

**webpack.config.js**

```javascript
const InjectBaseElementWebpackPlugin = require('@chwech/inject-base-element-webpack-plugin')

module.exports = {
  plugins: [
    new InjectBaseElementWebpackPlugin({
      fileName: 'example.html',
      href: 'http://www.domain.com'
    })
  ]
}
```

