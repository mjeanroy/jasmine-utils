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
  toBeASet,
  toBeAMap,
  toBeIterable,
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
  toBeDateBefore,
  toBeDateBeforeNow,
  toBeSameDay,
  toBeToday,
  toBeNull,
  toBeNil,
  toBeANumber,
  toBeABoolean,
  toBeTrue,
  toBeFalse,
  toBeAString,
  toBeAnEmptyString,
  toEqualIgnoringCase,
  toStartWith,
  toEndWith,
  toBeAFunction,
  toBeZero,
  toBePositive,
  toBeNegative,
  toBeOddNumber,
  toBeEvenNumber,
  toBeNumeric,
  toBeInteger,
  toBeFloat,
  toBeInRange,
  toBeSorted,
  toContainsOnlyTruthyValues,
  toContainsOnlyFalsyValues,
  toContainsDistinctValues,
  toVerify,
  toHaveSome,
  toBePartiallyEqualTo,
  toHaveBeenCalledOnce,
  toHaveBeenCalledOnceWith,
  toBeInstanceOf,
  toBeDOMElement,
  toBeDOMElementWithId,
  toBeDOMElementWithAttributes,
  toBeDOMElementWithClasses,
  toBeOneOf,
  toEqualOneOf,
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
  toBeASet: createMatcher(toBeASet),
  toBeAMap: createMatcher(toBeAMap),
  toBeIterable: createMatcher(toBeIterable),
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
  toBeDateBeforeNow: createMatcher(toBeDateBeforeNow),
  toBeSameDay: createMatcher(toBeSameDay),
  toBeToday: createMatcher(toBeToday),
  toBeNull: createMatcher(toBeNull),
  toBeNil: createMatcher(toBeNil),
  toBeANumber: createMatcher(toBeANumber),
  toBeABoolean: createMatcher(toBeABoolean),
  toBeTrue: createMatcher(toBeTrue),
  toBeFalse: createMatcher(toBeFalse),
  toBeAString: createMatcher(toBeAString),
  toBeAnEmptyString: createMatcher(toBeAnEmptyString),
  toEqualIgnoringCase: createMatcher(toEqualIgnoringCase),
  toStartWith: createMatcher(toStartWith),
  toEndWith: createMatcher(toEndWith),
  toBeAFunction: createMatcher(toBeAFunction),
  toBeZero: createMatcher(toBeZero),
  toBePositive: createMatcher(toBePositive),
  toBeNegative: createMatcher(toBeNegative),
  toBeOddNumber: createMatcher(toBeOddNumber),
  toBeEvenNumber: createMatcher(toBeEvenNumber),
  toBeNumeric: createMatcher(toBeNumeric),
  toBeInteger: createMatcher(toBeInteger),
  toBeFloat: createMatcher(toBeFloat),
  toBeInRange: createMatcher(toBeInRange),
  toBeSorted: createMatcher(toBeSorted),
  toContainsOnlyTruthyValues: createMatcher(toContainsOnlyTruthyValues),
  toContainsOnlyFalsyValues: createMatcher(toContainsOnlyFalsyValues),
  toContainsDistinctValues: createMatcher(toContainsDistinctValues),
  toVerify: createMatcher(toVerify),
  toHaveSome: createMatcher(toHaveSome),
  toBePartiallyEqualTo: createMatcher(toBePartiallyEqualTo),
  toHaveBeenCalledOnce: createMatcher(toHaveBeenCalledOnce),
  toHaveBeenCalledOnceWith: createMatcher(toHaveBeenCalledOnceWith),
  toBeInstanceOf: createMatcher(toBeInstanceOf),
  toBeDOMElement: createMatcher(toBeDOMElement),
  toBeDOMElementWithId: createMatcher(toBeDOMElementWithId),
  toBeDOMElementWithAttributes: createMatcher(toBeDOMElementWithAttributes),
  toBeDOMElementWithClasses: createMatcher(toBeDOMElementWithClasses),
  toBeOneOf: createMatcher(toBeOneOf),
  toEqualOneOf: createMatcher(toEqualOneOf),
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
