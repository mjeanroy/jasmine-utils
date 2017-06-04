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

'use strict';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const KarmaServer = require('karma').Server;
const options = require('../conf.js');

gulp.task('test', ['clean', 'lint'], (done) => {
  startKarma('test', done);
});

gulp.task('tdd', ['clean'], (done) => {
  startKarma('tdd', done);
});

gulp.task('coverage', ['clean'], (done) => {
  startKarma('coverage', done);
});

gulp.task('saucelab', ['clean'], (done) => {
  startKarma('saucelab', done);
});

gulp.task('travis', ['clean'], (done) => {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    gutil.log(gutil.colors.grey('SauceLab environment not set, running classic test suite'));
    startKarma('test', done);
  } else {
    startKarma('saucelab', done);
  }
});

/**
 * Start Karma Server and run unit tests.
 *
 * @param {string} mode The test mode (test or tdd).
 * @param {function} done The done callback.
 * @return {void}
 */
function startKarma(mode, done) {
  const fileName = `karma.${mode}.conf.js`;
  const configFile = path.join(options.root, fileName);

  const karma = new KarmaServer({configFile}, () => {
    gutil.log(gutil.colors.grey('Calling done callback of Karma'));
    done();
  });

  gutil.log(gutil.colors.grey(`Running karma with configuration: ${fileName}`));
  karma.start();
}
