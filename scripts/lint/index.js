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

const path = require('path');
const fancyLog = require('fancy-log');
const { ESLint } = require('eslint');
const log = require('../log');
const config = require('../config');

/**
 * Get all potential sources to run against lint validator.
 *
 * @param {string} ext The file extension to look for.
 * @return {Array<string>} List of paths.
 */
function getSources(ext) {
  return [
    path.join(config.root, `*.${ext}`),
    path.join(config.scripts, '**', `*.${ext}`),
    path.join(config.src, '**', `*.${ext}`),
    path.join(config.test, '**', `*.${ext}`),
  ];
}

/**
 * Run ESLint against JS source files.
 *
 * @return {WritableStream} The stream pipeline.
 */
module.exports = function lint() {
  const inputs = [
    ...getSources('js'),
    ...getSources('ts'),
  ];

  log.debug('Linting files: ');

  inputs.forEach((input) => (
    log.debug(`  ${input}`)
  ));

  const eslint = new ESLint({
    errorOnUnmatchedPattern: false,
  });

  const lintFiles = eslint.lintFiles(inputs);
  const loadFormatter = eslint.loadFormatter('stylish');

  return Promise.all([lintFiles, loadFormatter]).then(([results, formatter]) => {
    for (let i = 0; i < results.length; ++i) {
      const lintResult = results[i];
      if (lintResult.warningCount > 0 || lintResult.errorCount > 0 || lintResult.fatalErrorCount > 0) {
        fancyLog(formatter.format(results));
        throw new Error('ESLintError');
      }
    }
  });
};
