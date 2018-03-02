module.exports = function kenticocloud (moduleOptions) {
     // Merge options
  const options = Object.assign({
    project_id: process.env.KENTICOCLOUD_PROJECT_ID || '',
    preview_key: process.env.KENTICOCLOUD_PREVIEW_KEY || null,
    cache_timeout: process.env.KENTICOCLOUD_CACHE_TIMEOUT || null,
    config: {
      environment: this.options.dev ? 'development' : 'production'
    }
  }, this.options.kenticocloud, moduleOptions)


  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'kentico-cloud.js',
    options,
    ssr: false
  })
}

module.exports.meta = require('../package.json')