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

/* eslint-env node */

const gulp = require('gulp');
const clean = require('./scripts/clean');
const lint = require('./scripts/lint');
const build = require('./scripts/build');
const test = require('./scripts/test');
const docs = require('./scripts/docs');
const release = require('./scripts/release');

const prebuild = gulp.series(clean, lint);
const prerelease = gulp.series(prebuild, build, test.auto, docs);

module.exports = {
  'clean': clean,
  'lint': lint,
  'build': gulp.series(prebuild, build),
  'tdd': test.tdd,
  'test': gulp.series(prebuild, test.auto),
  'coverage': gulp.series(clean, test.coverage),
  'docs': docs,
  'release:patch': gulp.series(prerelease, release.patch),
  'release:minor': gulp.series(prerelease, release.minor),
  'release:major': gulp.series(prerelease, release.major),
};
