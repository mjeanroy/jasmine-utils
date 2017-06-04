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

import {createMatcher} from './core/jasmine/matcher-factory.js';
import {version} from './core/jasmine/version.js';
import {keys} from './core/util/keys';
import {forEach} from './core/util/for-each.js';

import {
  // any
  toBeEmpty,
  toBeExtensible,
  toBeFrozen,
  toBeInstanceOf,
  toBeOneOf,
  toBeSealed,
  toEqualOneOf,

  // arrays
  toBeSorted,
  toContainsDistinctValues,
  toContainsOnlyFalsyValues,
  toContainsOnlyTruthyValues,
  toHaveLength,
  toHaveSameLengthAs,
  toHaveSome,
  toVerify,

  // booleans
  toBeFalse,
  toBeTrue,

  // dates
  toBeDateAfterNow,
  toBeDateAfter,
  toBeDateBeforeNow,
  toBeDateBefore,
  toBeDateCloseToNow,
  toBeDateCloseTo,
  toBeSameDay,
  toBeToday,

  // dom
  toBeDOMElementWithAttributes,
  toBeDOMElementWithClasses,
  toBeDOMElementWithId,
  toBeDOMElement,

  // lang
  toBeABoolean,
  toBeADate,
  toBeAFunction,
  toBeAMap,
  toBeANumber,
  toBeASet,
  toBeAString,
  toBeAnArray,
  toBeIterable,
  toBeNil,
  toBeNull,

  // numbers
  toBeEvenNumber,
  toBeFloat,
  toBeInRange,
  toBeInteger,
  toBeNegative,
  toBeNumeric,
  toBeOddNumber,
  toBePositive,
  toBeZero,

  // objects
  toBePartiallyEqualTo,
  toHaveFunctions,
  toHaveKeys,
  toHaveSameSizeAs,
  toHaveSize,
  toHaveValues,

  // spies
  toHaveBeenCalledOnceWith,
  toHaveBeenCalledOnce,

  // strings
  toBeAnEmptyString,
  toEndWith,
  toEqualIgnoringCase,
  toStartWith,
} from './core/matchers/index.js';

import {
  spyIf,
  resetAll,
  resetAllExcept,
  resetEach,
  spyAll,
  spyAllExcept,
  spyEach,
} from './core/spies/index.js';

// Expose utility functions.
jasmine.spyIf = spyIf;
jasmine.resetAll = resetAll;
jasmine.resetAllExcept = resetAllExcept;
jasmine.resetEach = resetEach;
jasmine.spyAll = spyAll;
jasmine.spyAllExcept = spyAllExcept;
jasmine.spyEach = spyEach;

// Create matchers and add it to the current jasmine environment.
const jasmineMatchers = {
  // any
  toBeEmpty: createMatcher(toBeEmpty),
  toBeExtensible: createMatcher(toBeExtensible),
  toBeFrozen: createMatcher(toBeFrozen),
  toBeInstanceOf: createMatcher(toBeInstanceOf),
  toBeOneOf: createMatcher(toBeOneOf),
  toBeSealed: createMatcher(toBeSealed),
  toEqualOneOf: createMatcher(toEqualOneOf),

  // arrays
  toBeSorted: createMatcher(toBeSorted),
  toContainsDistinctValues: createMatcher(toContainsDistinctValues),
  toContainsOnlyFalsyValues: createMatcher(toContainsOnlyFalsyValues),
  toContainsOnlyTruthyValues: createMatcher(toContainsOnlyTruthyValues),
  toHaveLength: createMatcher(toHaveLength),
  toHaveSameLengthAs: createMatcher(toHaveSameLengthAs),
  toHaveSome: createMatcher(toHaveSome),
  toVerify: createMatcher(toVerify),

  // booleans
  toBeTrue: createMatcher(toBeTrue),
  toBeFalse: createMatcher(toBeFalse),

  // dates
  toBeDateAfterNow: createMatcher(toBeDateAfterNow),
  toBeDateAfter: createMatcher(toBeDateAfter),
  toBeDateBeforeNow: createMatcher(toBeDateBeforeNow),
  toBeDateBefore: createMatcher(toBeDateBefore),
  toBeDateCloseToNow: createMatcher(toBeDateCloseToNow),
  toBeDateCloseTo: createMatcher(toBeDateCloseTo),
  toBeSameDay: createMatcher(toBeSameDay),
  toBeToday: createMatcher(toBeToday),

  // dom
  toBeDOMElementWithAttributes: createMatcher(toBeDOMElementWithAttributes),
  toBeDOMElementWithClasses: createMatcher(toBeDOMElementWithClasses),
  toBeDOMElementWithId: createMatcher(toBeDOMElementWithId),
  toBeDOMElement: createMatcher(toBeDOMElement),

  // lang
  toBeABoolean: createMatcher(toBeABoolean),
  toBeADate: createMatcher(toBeADate),
  toBeAFunction: createMatcher(toBeAFunction),
  toBeAMap: createMatcher(toBeAMap),
  toBeANumber: createMatcher(toBeANumber),
  toBeASet: createMatcher(toBeASet),
  toBeAString: createMatcher(toBeAString),
  toBeAnArray: createMatcher(toBeAnArray),
  toBeIterable: createMatcher(toBeIterable),
  toBeNil: createMatcher(toBeNil),
  toBeNull: createMatcher(toBeNull),

  // numbers
  toBeEvenNumber: createMatcher(toBeEvenNumber),
  toBeFloat: createMatcher(toBeFloat),
  toBeInRange: createMatcher(toBeInRange),
  toBeInteger: createMatcher(toBeInteger),
  toBeNegative: createMatcher(toBeNegative),
  toBeNumeric: createMatcher(toBeNumeric),
  toBeOddNumber: createMatcher(toBeOddNumber),
  toBePositive: createMatcher(toBePositive),
  toBeZero: createMatcher(toBeZero),

  // objects
  toBePartiallyEqualTo: createMatcher(toBePartiallyEqualTo),
  toHaveFunctions: createMatcher(toHaveFunctions),
  toHaveKeys: createMatcher(toHaveKeys),
  toHaveSameSizeAs: createMatcher(toHaveSameSizeAs),
  toHaveSize: createMatcher(toHaveSize),
  toHaveValues: createMatcher(toHaveValues),

  // spies
  toHaveBeenCalledOnceWith: createMatcher(toHaveBeenCalledOnceWith),
  toHaveBeenCalledOnce: createMatcher(toHaveBeenCalledOnce),

  // strings
  toBeAnEmptyString: createMatcher(toBeAnEmptyString),
  toEndWith: createMatcher(toEndWith),
  toEqualIgnoringCase: createMatcher(toEqualIgnoringCase),
  toStartWith: createMatcher(toStartWith),
};

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
