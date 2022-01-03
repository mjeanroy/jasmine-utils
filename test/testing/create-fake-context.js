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

/**
 * Create fake matcher context to use in unit tests.
 *
 * @param {*} actual Actual Object.
 * @param {Object} options Optional parameter.
 * @returns {Object} Matcher context.
 */
export function createFakeContext(actual, options = {}) {
  return {
    actual,
    isNot: options.isNot || false,

    argsFor: options.argsFor || jasmine.createSpy('argsFor').and.returnValue([]),
    callCount: options.callCount || jasmine.createSpy('callCount').and.returnValue(0),

    equals: options.equals || jasmine.createSpy('equals').and.callFake((x, y) => {
      const matchersUtil = jasmine.MatchersUtil ? new jasmine.MatchersUtil() : jasmine.matchersUtil;
      return matchersUtil.equals(x, y);
    }),

    pp: options.pp || jasmine.createSpy('pp').and.callFake((value) => {
      const pp = jasmine.makePrettyPrinter ? jasmine.makePrettyPrinter() : jasmine.pp;
      return pp(value);
    }),
  };
}
