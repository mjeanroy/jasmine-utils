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

import { negateMessage } from './negate-message';
import { pp } from './pp';

/**
 * This factory will create a matcher supported by Jasmine 3.X.X.
 *
 * This factory takes a generic matcher function (matcher defined in this project)
 * and returns the matcher that can be used with Jasmine 2.
 *
 * @param {function} fn Generic matcher function.
 * @return {function} Jasmine2 official matcher.
 * @see https://jasmine.github.io/2.5/custom_matcher.html
 */
export function jasmine3MatcherFactory(fn) {
  /**
   * Jasmine 3.X.X matcher.
   *
   * @param {Object} matchersUtil Jasmine util object.
   * @param {Object} args Extra arguments, may contain customEqualityTesters for jasmine < 3.6.
   * @return {Object} An object containing `compare` and `negativeCompare` function that will be executed by Jasmine.
   * @see https://jasmine.github.io/tutorials/upgrading_to_Jasmine_4.0#matchers-cet
   */
  return function jasmine3Matcher(matchersUtil, ...args) {
    const customEqualityTesters = args[0] && !args[0].deprecated ? args[0] : undefined;
    const ctx = {
      // Adapter for `callCount`.
      callCount(spy) {
        return spy.calls.count();
      },

      // Adapter for `argsFor`.
      argsFor(spy, call) {
        return spy.calls.argsFor(call);
      },

      // Adapter for custom equals functions.
      equals(a, b) {
        return matchersUtil.equals(a, b, customEqualityTesters);
      },

      // Adapter pretty print function.
      pp(value) {
        return pp(value, matchersUtil.pp);
      },
    };

    return {
      /**
       * Jasmine compare function that will be called when a custom matcher is used with:
       *  `expect(value).toCustomMatcher(...)`.
       *
       * @param {*} actual Object being tested (the object being given in `expect` call).
       * @param {Array<any>} fnArgs The matcher arguments (arguments being given to `toCustomMatcher` call).
       * @return {Object} The test result.
       */
      compare(actual, ...fnArgs) {
        ctx.actual = actual;
        ctx.isNot = false;

        const result = fn(...[ctx].concat(fnArgs));
        return {
          pass: result.pass,
          message() {
            return negateMessage(false, result.message());
          },
        };
      },

      /**
       * Jasmine compare function that will be called when a custom matcher is used with:
       *  `expect(value).not.toCustomMatcher(...)`.
       *
       * @param {*} actual Object being tested (the object being given in `expect` call).
       * @param {Array<any>} fnArgs The matcher arguments (arguments being given to `toCustomMatcher` call).
       * @return {void}
       */
      negativeCompare(actual, ...fnArgs) {
        ctx.actual = actual;
        ctx.isNot = true;

        const result = fn(...[ctx].concat(fnArgs));
        return {
          pass: !result.pass,
          message() {
            return negateMessage(true, result.message());
          },
        };
      },
    };
  };
}
