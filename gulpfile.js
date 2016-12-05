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

const path = require('path');
const gulp = require('gulp');
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
 * @param {boolean} singleRun If it runs once and exit or not.
 * @param {function} done The done callback.
 * @return {void}
 */
function startKarma(singleRun, done) {
  const opts = {
    configFile: path.join(options.root, '/karma.conf.js'),
  };

  if (singleRun) {
    opts.autoWatch = true;
    opts.singleRun = true;
    opts.browsers = ['PhantomJS'];
  }

  const karma = new KarmaServer(opts, () => done());

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

gulp.task('test', ['clean'], (done) => {
  startKarma(true, done);
});

gulp.task('tdd', ['clean'], (done) => {
  startKarma(false, done);
});

gulp.task('clean', () => {
  return del([
    options.dest,
  ]);
});

gulp.task('build', ['clean', 'lint', 'test'], () => {
  return rollup
    .rollup(rollupConf)
    .then((bundle) => bundle.write(rollupConf));
});

// Release tasks
['minor', 'major', 'patch'].forEach(function(level) {
  gulp.task('release:' + level, ['build'], function() {
    const packageJsonFilter = gulpFilter((file) => file.relative === 'package.json');
    const src = ['package.json', 'bower.json'].map((file) => path.join(options.root, file));

    return gulp.src(src)
      .pipe(bump({type: level}))
      .pipe(gulp.dest(options.root))
      .pipe(git.add({args: '-f'}))
      .pipe(git.commit('release: release version'))
      .pipe(packageJsonFilter)
      .pipe(tagVersion());
  });
});

gulp.task('release', ['release:minor']);
