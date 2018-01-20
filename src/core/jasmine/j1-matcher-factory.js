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

import {negateMessage} from './negate-message.js';

/**
 * This factory will create a matcher supported by Jasmine 1.3.X.
 *
 * This factory takes a generic matcher function (matcher defined in this project)
 * and returns the matcher that can be used with Jasmine 1.3.
 *
 * @param {function} fn Generic matcher function.
 * @return {function} Jasmine 1.3 official matcher.
 * @see https://jasmine.github.io/1.3/introduction#section-Writing_a_custom_matcher
 */
export function jasmine1MatcherFactory(fn) {
  /**
   * Jasmine 1.3.X matcher.
   *
   * @return {boolean} The result of the expectation.
   */
  return function jasmine1Matcher(...args) {
    // The `this` object is equals to the current test context.

    // eslint-disable-next-line no-invalid-this
    const env = this.env;

    // eslint-disable-next-line no-invalid-this
    const equals_ = this.env.equals_;

    // eslint-disable-next-line no-invalid-this
    const actual = this.actual;

    // eslint-disable-next-line no-invalid-this
    const isNot = this.isNot;

    const ctx = {
      actual: actual,
      isNot: isNot,

      // Adapter for `callCount`
      // https://jasmine.github.io/1.3/introduction#section-Spies
      callCount(spy) {
        return spy.callCount;
      },

      // Adapter for `argsFor`
      // https://jasmine.github.io/1.3/introduction#section-Spies
      argsFor(spy, call) {
        return spy.argsForCall[call];
      },

      // Adapter for custom equality.
      equals(...equalsArgs) {
        return equals_.apply(env, equalsArgs);
      },
    };

    const result = fn.apply(ctx, [ctx].concat(args));
    const pass = isNot ? !result.pass : result.pass;

    if (!pass) {
      // eslint-disable-next-line no-invalid-this
      this.message = function() {
        return negateMessage(isNot, result.message());
      };
    }

    return pass;
  };
}
