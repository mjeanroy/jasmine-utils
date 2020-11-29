/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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
const babel = require('@rollup/plugin-babel').default;
const conf = require('../config.js');
const entryPoint = path.join(conf.test, 'index.js');

module.exports = (config) => ({
  // base path, that will be used to resolve files and exclude
  basePath: conf.root,

  frameworks: [
    'jasmine',
  ],

  files: [
    entryPoint,
  ],

  exclude: [
  ],

  // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
  // CLI --reporters progress
  reporters: [
    'progress',
  ],

  // web server port
  // CLI --port 9876
  port: 9876,

  // cli runner port
  // CLI --runner-port 9100
  runnerPort: 9100,

  // enable / disable colors in the output (reporters and logs)
  // CLI --colors --no-colors
  colors: true,

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  // CLI --log-level debug
  logLevel: config.LOG_INFO,

  // enable / disable watching file and executing tests whenever any file changes
  // CLI --auto-watch --no-auto-watch
  autoWatch: true,

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera
  // - Safari (only Mac)
  // - PhantomJS
  // - IE (only Windows)
  // CLI --browsers Chrome,Firefox,Safari
  browsers: [
    'Chrome',
  ],

  // If browser does not capture in given timeout [ms], kill it
  // CLI --capture-timeout 5000
  captureTimeout: 10000,

  // Auto run tests on start (when browsers are captured) and exit
  // CLI --single-run --no-single-run
  singleRun: false,

  // report which specs are slower than 500ms
  // CLI --report-slower-than 500
  reportSlowerThan: 500,

  preprocessors: {
    [entryPoint]: ['rollup'],
  },

  // Rollup test configuration
  rollupPreprocessor: {
    output: {
      format: 'iife',
      name: 'JasmineUtils',
      sourcemap: false,
    },

    plugins: [
      babel(),
    ],
  },
});
