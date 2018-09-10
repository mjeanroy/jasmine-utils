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
const eslint = require('gulp-eslint');
const tslint = require('gulp-tslint');
const options = require('../conf.js');

gulp.task('eslint', ['clean'], () => {
  return gulp.src(getSources('js'))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('tslint', () => {
  return gulp.src(getSources('ts'))
      .pipe(tslint({formatter: 'verbose'}))
      .pipe(tslint.report());
});

gulp.task('lint', ['eslint', 'tslint']);

/**
 * Get all potential sources to run against lint validator.
 *
 * @param {string} ext The file exstension to look for.
 * @return {void}
 */
function getSources(ext) {
  return [
    path.join(options.root, `*.${ext}`),
    path.join(options.tasks,'**', `*.${ext}`),
    path.join(options.src, '**', `*.${ext}`),
    path.join(options.test, '**', `*.${ext}`),
    path.join(options.tasks, '**', `*.${ext}`),
  ];
}
