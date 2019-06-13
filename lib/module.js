const path = require('path');

module.exports = function kenticocloud (moduleOptions) {
  const options = Object.assign({
    projectId: process.env.KENTICOCLOUD_PROJECTID || '',
    previewApiKey: process.env.KENTICOCLOUD_PREVIEWAPIKEY || null,
    enableAdvancedLogging: process.env.KENTICOCLOUD_ENABLEADVANCEDLOGGING || false,
    enablePreviewMode: process.env.KENTICOCLOUD_ENABLEPREVIEWMODE || false,
    defaultLanguage: process.env.KENTICOCLOUD_DEFAULTLANGUAGE || null,
    retryAttempts: process.env.KENTICOCLOUD_RETRYATTEMPTS || null,
    baseUrl: process.env.KENTICOCLOUD_BASEURL || null,
    proxyUrl: process.env.KENTICOCLOUD_PROXYURL || null,
    securedApiKey: process.env.KENTICOCLOUD_SECUREDAPIKEY || null,
    enableSecuredMode: process.env.KENTICOCLOUD_ENABLESECUREDMODE || false,
    config: {
      environment: this.options.dev ? 'development' : 'production'
    }
  }, this.options.kenticocloud, moduleOptions);

  if (!options.projectId) {
    /* eslint-disable no-console */
    console.info('nuxt:kentico-cloud-nuxt-module disabled because no projectId was found');
    /* eslint-enable no-console */
    return;
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/dist/plugin.template.js'),
    fileName: 'kenticocloud-nuxt-module.js',
    ssr: true,
    options
  });
};

module.exports.meta = require('../package.json');
