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

'use strict';

const gulp = require('gulp');
const git = require('gulp-git');
const bump = require('gulp-bump');
const tagVersion = require('gulp-tag-version');
const log = require('../log');
const config = require('../config.js');

/**
 * Update version in number in `package.json` file.
 *
 * @param {string} type The semver level identifier (`major`, `minor` or `patch`).
 * @return {WritableStream} The stream pipeline.
 */
function bumpVersion(type) {
  log.debug(`Bump version to next ${type} version`);
  return gulp.src([config.pkg, config.bower])
      .pipe(bump({type}))
      .pipe(gulp.dest(config.root));
}

/**
 * Commit the current changes:
 * - The `dist` directory containing final bundle.
 * - The `package.json` containing the new version number.
 *
 * @return {WritableStream} The stream pipeline.
 */
function performRelease() {
  log.debug('Perform release, commit current working directory');
  return gulp.src([config.pkg, config.bower, config.dest, config.readme])
      .pipe(git.add({args: '-f'}))
      .pipe(git.commit('release: release version'));
}

/**
 * Tag current version: the tag name will be extracted from
 * the `version` field in the `package.json` file.
 *
 * @return {WritableStream} The stream pipeline.
 */
function tagRelease() {
  log.debug('Tag release');
  return gulp.src(config.pkg).pipe(tagVersion());
}

/**
 * Prepare the next release cycle:
 * - Remove the `dist` directory containing bundle tagged on given version.
 * - Create a new commit preparing the next release.
 *
 * @return {WritableStream} The stream pipeline.
 */
function prepareNextRelease() {
  log.debug('Prepare repository for next release');
  return gulp.src(config.dest)
      .pipe(git.rm({args: '-r'}))
      .pipe(git.commit('release: prepare next release'));
}

/**
 * Create the release task for a given semver identifier.
 *
 * @param {string} type The semver level identifier (`major`, `minor` or `patch`).
 * @return {function} The task function.
 */
function createReleaseTask(type) {
  /**
   * Prepare the release: this is a just a wrapper around the `bumpVersion`
   * function with a pre-defined parameter.
   *
   * @return {WritableStream} The stream pipeline.
   */
  function prepareRelease() {
    return bumpVersion(type);
  }

  return gulp.series(
      prepareRelease,
      performRelease,
      tagRelease,
      prepareNextRelease
  );
}

module.exports = {
  patch: createReleaseTask('patch'),
  minor: createReleaseTask('minor'),
  major: createReleaseTask('major'),
};
