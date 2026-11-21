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
const karma = require('karma');
const log = require('../log');
const config = require('../config');

/**
 * Run unit tests and exit.
 *
 * @param {function} done The `done` callback.
 * @return {void}
 */
function test(done) {
  startKarma('test', done);
}

/**
 * Run unit test and watch for changes to re-run test suite.
 *
 * @param {function} done The `done` callback.
 * @return {void}
 */
function tdd(done) {
  startKarma('tdd', done);
}

/**
 * Run test suite and output test coverage.
 *
 * @param {function} done The `done` callback.
 * @return {void}
 */
function coverage(done) {
  startKarma('coverage', done);
}

/**
 * Run test suite on saucelab.
 *
 * @param {function} done The `done` callback.
 * @return {void}
 */
function saucelab(done) {
  startKarma('saucelab', done);
}

/**
 * Run test suite:
 * - On saucelab if appropriate environment variables are available (i.e saucelab credentials).
 * - Or "classical" test suite otherwise.
 *
 * This task is usually run by travis.
 *
 * @param {function} done The `done` callback.
 * @return {void}
 */
function auto(done) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    log.debug('SauceLab environment not set, running classic test suite');
    test(done);
  } else {
    saucelab(done);
  }
}

/**
 * Read all values of a CLI option, supporting both `--name value` and `--name=value`.
 *
 * @param {Array<string>} argv The CLI arguments.
 * @param {string} name The option name (without leading dashes).
 * @return {Array<string>} The option values.
 */
function readOption(argv, name) {
  const flag = `--${name}`;
  const values = [];

  for (let i = 0; i < argv.length; ++i) {
    const arg = argv[i];
    if (arg === flag && i + 1 < argv.length) {
      values.push(argv[i + 1]);
      i += 1;
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }

  return values;
}

/**
 * Build Karma options overriding the configuration file, from CLI arguments:
 * - `--file <path>` (repeatable, globs allowed): run only these spec files instead of `test/index.js`.
 * - `--filter <pattern>`: run only specs whose full name matches the pattern (`/regex/flags` is supported).
 *
 * @param {Array<string>} argv The CLI arguments.
 * @return {Object} The Karma CLI options.
 */
function readCliOptions(argv) {
  const cliOptions = {};

  const specs = readOption(argv, 'file').map((spec) => path.resolve(config.root, spec));
  if (specs.length > 0) {
    log.debug(`Running spec files: ${specs.join(', ')}`);
    cliOptions.files = specs;
    cliOptions.preprocessors = {};
    specs.forEach((spec) => {
      cliOptions.preprocessors[spec] = ['rollup'];
    });
  }

  const filter = readOption(argv, 'filter');
  if (filter.length > 0) {
    log.debug(`Running specs matching: ${filter[0]}`);
    cliOptions.client = {
      args: ['--grep', filter[0]],
    };
  }

  return cliOptions;
}

/**
 * Start Karma Server and run unit tests.
 *
 * @param {string} mode The test mode (test or tdd).
 * @param {function} done The done callback.
 * @return {void}
 */
function startKarma(mode, done) {
  const fileName = `karma.${mode}.conf.js`;
  const configFilePath = path.join(__dirname, fileName);
  const cliOptions = readCliOptions(process.argv.slice(2));

  log.debug(`Parsing karma configuration from: ${configFilePath}`);
  const parseOptions = { promiseConfig: true, throwErrors: true };
  karma.config.parseConfig(configFilePath, cliOptions, parseOptions).then((karmaConfig) => {
    const srv = new karma.Server(karmaConfig, (err) => {
      log.debug('Calling done callback of Karma');
      done(err);
    });

    log.debug('Starting karma server');
    srv.start();
  });
}

module.exports = {
  tdd,
  test,
  coverage,
  auto,
};
