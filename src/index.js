/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {createMatcher} from './core/jasmine/matcher-factory.js';
import {version} from './core/jasmine/version.js';

import {
  toHaveKeys,
  toHaveFunctions,
  toHaveSize,
  toBeEmpty,
  toHaveValues,
  toHaveLength,
  toHaveSameLengthAs,
  toHaveSameSizeAs,
  toBeAnArray,
  toBeADate,
  toBeDateCloseTo,
  toBeDateCloseToNow,
  toBeDateAfter,
  toBeDateAfterNow,
} from './core/matchers/matchers.js';

const jasmineMatchers = {
  toHaveKeys: createMatcher(toHaveKeys),
  toHaveFunctions: createMatcher(toHaveFunctions),
  toHaveSize: createMatcher(toHaveSize),
  toBeEmpty: createMatcher(toBeEmpty),
  toHaveValues: createMatcher(toHaveValues),
  toHaveLength: createMatcher(toHaveLength),
  toHaveSameLengthAs: createMatcher(toHaveSameLengthAs),
  toHaveSameSizeAs: createMatcher(toHaveSameSizeAs),
  toBeAnArray: createMatcher(toBeAnArray),
  toBeADate: createMatcher(toBeADate),
  toBeDateCloseTo: createMatcher(toBeDateCloseTo),
  toBeDateCloseToNow: createMatcher(toBeDateCloseToNow),
  toBeDateAfter: createMatcher(toBeDateAfter),
  toBeDateAfterNow: createMatcher(toBeDateAfterNow),
  toBeDateBefore: createMatcher(toBeDateBefore),
};

/**
 * The `beforeEach` function executed by Jasmine before each tests that addMatchers
 * all custom matchers.
 *
 * @return {void}
 */
function jasmineUtilBeforeEach() {
  if (version === 1) {
    // eslint-disable-next-line no-invalid-this
    this.addMatchers(jasmineMatchers);
  } else {
    jasmine.addMatchers(jasmineMatchers);
  }
}

beforeEach(jasmineUtilBeforeEach);
