/**
 * Karma Configuration.
 */

const _ = require('lodash');
const conf = require('./karma.common.conf.js');

const browsers = {
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11',
  },

  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9',
  },

  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
  },

  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
  },
};

module.exports = (config) => {
  config.set(_.extend(conf(config), {
    autoWatch: false,
    singleRun: true,

    reporters: ['dots', 'saucelabs'],
    browsers: Object.keys(browsers),
    concurrency: 5,
    captureTimeout: 120000,
    browserNoActivityTimeout: 45000,
    customLaunchers: browsers,

    sauceLabs: {
      startConnect: false,
    },
  }));
};
