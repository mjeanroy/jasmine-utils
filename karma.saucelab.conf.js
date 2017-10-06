/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Karma Configuration.
 */

const _ = require('lodash');
const conf = require('./karma.common.conf.js');

const browsers = {
  SL_Win10_edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    platform: 'Windows 10',
  },

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

  SL_ie_8: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '8',
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
    browsers: _.keys(browsers).concat(
      'PhantomJS'
    ),

    concurrency: 1,
    captureTimeout: 120000,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 1,
    customLaunchers: browsers,

    sauceLabs: {
      build: `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`,
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    },
  }));
};
