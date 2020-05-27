const parse5 = require('parse5');
const path = require('path')
const fs = require('fs')

function Plugin (options = {}) {
  const defaultOptions = {
    fileName: 'test.html',
    href: 'http://www.chwech.com'
  }

  this.options = Object.assign(defaultOptions, options)
}

Plugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('injectBaseElementPlugin', (compilation) => {
    // htmlWebpackPlugin v3 的钩子
    let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;

    if (!hook) {
      const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin');

      // htmlWebpackPlugin v3 的钩子
      hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
    }

    hook.tapAsync(
      'webpackPluginForInjectBaseElement', // <-- Set a meaningful name here for stacktraces
      (data, cb) => {
        let document = parse5.parse(data.html);
        document.childNodes[1].childNodes[0].childNodes.push({
          nodeName: "base",
          tagName: "base",
          attrs: [
            {
              name: "href",
              value: this.options.href
            }
          ]
        })
        const html = parse5.serialize(document);
        
        const output = path.resolve(compiler.options.output.path, this.options.fileName)
        
        if (fs.existsSync(compiler.options.output.path)) {
          fs.writeFileSync(output, html)
        } else {
          fs.mkdirSync(compiler.options.output.path)
          fs.writeFileSync(output, html)
        }

        // 可以对html内容修改
        // data.html = html

        // Tell webpack to move on
        cb(null, data)
      }
    )
  })
}

module.exports = Plugin