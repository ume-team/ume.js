// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var devEnvObj = require('./dev.env');
var prodEnvObj = require('./prod.env');

var contextPath = '';
var argv = process.argv;
if (argv !== undefined && argv.length > 2) {
  contextPath = argv[2];
} else if (prodEnvObj.CONTEXT_PATH !== undefined) {
  contextPath = prodEnvObj.CONTEXT_PATH;
} else {
  contextPath = 'ume-emc';
}
contextPath = '/' + contextPath + '/';

function getEnvConfig(key) {
  var env = process.env.NODE_ENV === 'production' ? prodEnvObj : devEnvObj;
  return env[key].replace(/"/g, '');
}

var outputFolder = '../../../../target/dist';

var config = {
  build: {
    env: prodEnvObj,
    index: path.resolve(__dirname, outputFolder + '/index.html'),
    assetsRoot: path.resolve(__dirname, outputFolder),
    assetsSubDirectory: 'web-static-resource',
    assetsPublicPath: contextPath.replace(/"/g, ''),
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnvObj,
    port: 8082,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // cann't use es6 grammar, so define it in other ways
    proxyTable: {
      '/ume-ems/rest/s01/': {
        target: 'http://localhost:8081/ume-ems/rest/s01/',
        changeOrigin: true,
        pathRewrite: {
          '^/ume-ems/rest/s01/': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
module.exports = config;
