const path = require('path');

module.exports = function kenticokontent (moduleOptions) {
  const options = Object.assign({
    projectId: process.env.KENTICOKONTENT_PROJECTID || '',
    previewApiKey: process.env.KENTICOKONTENT_PREVIEWAPIKEY || null,
    enableAdvancedLogging: process.env.KENTICOKONTENT_ENABLEADVANCEDLOGGING || false,
    enablePreviewMode: process.env.KENTICOKONTENT_ENABLEPREVIEWMODE || false,
    defaultLanguage: process.env.KENTICOKONTENT_DEFAULTLANGUAGE || null,
    retryAttempts: process.env.KENTICOKONTENT_RETRYATTEMPTS || null,
    baseUrl: process.env.KENTICOKONTENT_BASEURL || null,
    proxyUrl: process.env.KENTICOKONTENT_PROXYURL || null,
    securedApiKey: process.env.KENTICOKONTENT_SECUREDAPIKEY || null,
    enableSecuredMode: process.env.KENTICOKONTENT_ENABLESECUREDMODE || false,
    isDeveloperMode: process.env.KENTICOKONTENT_ISDEVELOPERMODE || false,
    config: {
      environment: this.options.dev ? 'development' : 'production'
    }
  }, this.options.kenticokontent, moduleOptions);

  if (!options.projectId) {
    /* eslint-disable no-console */
    console.info('nuxt:kentico-kontent-nuxt-module disabled because no projectId was found');
    /* eslint-enable no-console */
    return;
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/dist/plugin.template.js'),
    fileName: 'kentico-kontent-nuxt-module.js',
    ssr: true,
    options
  });
};

module.exports.meta = require('../package.json');
