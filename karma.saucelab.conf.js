/**
 * Karma Configuration.
 */

const _ = require('lodash');
const conf = require('./karma.common.conf.js');

const browsers = {
  SL_Win10_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11',
  },

  SL_Win81_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11',
  },

  SL_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10',
  },

  SL_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9',
  },

  SL_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
  },

  SL_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
  },

  SL_safari_8: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '8.0',
  },

  SL_safari_9: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '9.0',
  },

  SL_safari_10: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '10.0',
  },
};

module.exports = (config) => {
  config.set(_.extend(conf(config), {
    autoWatch: false,
    singleRun: true,

    reporters: ['dots', 'saucelabs'],
    browsers: _.keys(browsers),
    concurrency: 1,
    captureTimeout: 120000,
    browserNoActivityTimeout: 45000,
    customLaunchers: browsers,

    sauceLabs: {
      build: `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`,
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    },
  }));
};
