/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014,205,2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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
const git = require('gulp-git');
const bump = require('gulp-bump');
const gulpFilter = require('gulp-filter');
const tagVersion = require('gulp-tag-version');
const rollup = require('rollup');
const eslint = require('gulp-eslint');
const del = require('del');
const rollupConf = require('./rollup.conf.js');
const options = require('./conf.js');

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

gulp.task('lint', ['clean'], () => {
  const sources = [
    path.join(options.root, '*.js'),
    path.join(options.src, '**', '*.js'),
    path.join(options.test, '**', '*.js'),
  ];

  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['clean', 'lint'], (done) => {
  startKarma('test', done);
});

gulp.task('tdd', ['clean'], (done) => {
  startKarma('tdd', done);
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

gulp.task('clean', () => {
  return del([
    options.dest,
  ]);
});

gulp.task('build', ['clean', 'lint'], () => {
  return rollup
    .rollup(rollupConf)
    .then((bundle) => bundle.write(rollupConf));
});

// Release tasks
['minor', 'major', 'patch'].forEach(function(level) {
  gulp.task(`release:${level}`, ['build'], function() {
    const jsonFilter = gulpFilter('**/*.json', {restore: true});
    const pkgJsonFilter = gulpFilter('**/package.json', {restore: true});
    const bundleFilter = gulpFilter('**/*.js', {restore: true});

    const src = [
      path.join(options.root, 'package.json'),
      path.join(options.root, 'bower.json'),
      options.dest,
    ];

    return gulp.src(src)

      // Bump version.
      .pipe(jsonFilter)
      .pipe(bump({type: level}))
      .pipe(gulp.dest(options.root))
      .pipe(jsonFilter.restore)

      // Commit release.
      .pipe(git.add({args: '-f'}))
      .pipe(git.commit('release: release version'))

      // Create tag.
      .pipe(pkgJsonFilter)
      .pipe(tagVersion())
      .pipe(pkgJsonFilter.restore)

      // Remove generated bundle and commit for the next release.
      .pipe(bundleFilter)
      .pipe(git.rm({args: '-r'}))
      .pipe(git.commit('release: prepare next release'));
  });
});

gulp.task('release', ['release:minor']);
