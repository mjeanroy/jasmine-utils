/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
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

/* eslint-disable global-require */

/**
 * Karma Configuration.
 */

const conf = require('./karma.common.conf');

const browsers = {
  SL_safari_14: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '14',
    platform: 'macOS 11.00',
  },

  SL_safari_15: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '15',
    platform: 'macOS 12',
  },

  SL_safari_16: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '16',
    platform: 'macOS 12',
  },

  SL_safari_17: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '17',
    platform: 'macOS 13',
  },

  SL_Win10_edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: 'latest',
    platform: 'Windows 10',
  },

  SL_Win10_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.285',
    platform: 'Windows 10',
  },

  SL_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'Windows 10',
  },

  SL_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    // Specify version < 90, as there is an issue with `moz:debuggerAddress` capability.
    version: '89',
    platform: 'Windows 10',
  },
};

module.exports = (config) => {
  config.set(Object.assign(conf(config), {
    plugins: [
      require('karma-jasmine'),
      require('karma-rollup-preprocessor'),
      require('karma-sauce-launcher'),
      require('karma-chrome-launcher'),
    ],

    autoWatch: false,
    singleRun: true,

    reporters: [
      'dots',
      'saucelabs',
    ],

    browsers: Object.keys(browsers).concat([
      'CustomHeadlessChrome',
    ]),

    concurrency: 1,
    captureTimeout: 120000,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 1,

    customLaunchers: Object.assign(browsers, {
      CustomHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-translate',
          '--disable-extensions',
        ],
      },
    }),

    sauceLabs: sauceLabsConfiguration(),
  }));
};

/**
 * Create karma saucelabs configuration: detect environment (travis / github actions / local) and
 * create appropriate configuration.
 *
 * @return {Object} Sauce Labs configuration.
 */
function sauceLabsConfiguration() {
  if (process.env.GITHUB_RUN_ID && process.env.GITHUB_RUN_NUMBER) {
    return githubSauceLabsConfiguration();
  }

  return localSauceLabsConfiguration();
}

/**
 * Create karma saucelabs configuration for GitHub Actions.
 *
 * Use GitHub environment variable (described here:
 *   https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables)
 *
 * to set appropriate build ID and tunnel identifier.
 *
 * @return {Object} Sauce Labs configuration.
 */
function githubSauceLabsConfiguration() {
  return {
    build: `GITHUB #${process.env.GITHUB_RUN_ID} (${process.env.GITHUB_RUN_NUMBER})`,
    startConnect: false,
    tunnelIdentifier: `github-action-tunnel-jasmine-utils-${process.env.GITHUB_RUN_ID}`,
  };
}

/**
 * Create karma saucelabs configuration for local environment.
 *
 * @return {Object} Sauce Labs configuration.
 */
function localSauceLabsConfiguration() {
  const tunnelId = process.env.SAUCE_TUNNEL_ID || Date.now().toString();
  return {
    build: `LOCAL #${tunnelId}::${Date.now()}`,
    startConnect: false,
    connectOptions: {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: tunnelId,
    },
  };
}
