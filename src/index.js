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

import {createMatcher} from './core/jasmine/matcher-factory.js';
import {version} from './core/jasmine/version.js';
import {keys} from './core/util/keys';
import {forEach} from './core/util/for-each.js';

import * as matchers from './core/matchers/index.js';
import * as spyUtilties from './core/spies/index.js';

// Expose utility functions.
forEach(keys(spyUtilties), (id) => {
  jasmine[id] = spyUtilties[id];
});

// Create matchers and add it to the current jasmine environment.
const jasmineMatchers = {};

forEach(keys(matchers), (id) => {
  jasmineMatchers[id] = createMatcher(matchers[id]);
});

/**
 * Create a deprecated method (will log a warning before executing the function).
 *
 * @param {string} name Name of the deprecated method.
 * @param {string} alternative Name of the new method to use.
 * @param {function} func The new method to use.
 * @return {function} The deprecated method.
 */
function createDeprecated(name, alternative, func) {
  return function(...args) {
    console.warn(`Matcher "${name}" is deprecated and will be removed, please use "${alternative}" instead.`);
    return func(...args);
  };
}

const deprecateds = {
  toStartsWith: 'toStartWith',
  toEndsWith: 'toEndWith',
  toEqualsIgnoringCase: 'toEqualIgnoringCase',
  toBePartiallyEqualsTo: 'toBePartiallyEqualTo',
};

forEach(keys(deprecateds), (name) => {
  const alternative = deprecateds[name];
  const func = jasmineMatchers[alternative];
  jasmineMatchers[name] = createDeprecated(name, alternative, func);
});

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
