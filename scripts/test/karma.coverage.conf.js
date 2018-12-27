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

const path = require('path');
const _ = require('lodash');
const istanbul = require('rollup-plugin-istanbul');
const commonConf = require('./karma.common.conf.js');
const conf = require('../config.js');

module.exports = (config) => {
  const c = commonConf(config);

  // Add rollup-plugin-istanbul.
  c.rollupPreprocessor.plugins.unshift(istanbul({
    exclude: [
      path.join(conf.test, '**', '*.js'),
    ],
  }));

  config.set(_.extend(c, {
    autoWatch: false,
    singleRun: true,
    browsers: [
      'ChromeHeadless',
    ],

    reporters: [
      'coverage',
      'progress',
    ],

    customLaunchers: {
      CustomHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--disable-translate',
          '--disable-extensions',
        ],
      },
    },

    coverageReporter: {
      type: 'html',
      dir: conf.coverage,
    },
  }));
};
