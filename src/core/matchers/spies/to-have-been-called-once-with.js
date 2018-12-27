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

import {pp} from '../../jasmine/pp.js';

/**
 * Check that the tested object is a spy that has been called once (and exactly
 * once) with expected arguments.
 *
 * @message
 *   Expect [actual] to have been called once but was called [count] time(s)
 *   Expect [actual] to have been called once but was called [count] time(s) with different arguments
 *
 * @example
 *   const spy = jasmine.createSpy('foo');
 *   expect(spy).not.toHaveBeenCalledOnce();
 *
 *   spy('foo');
 *   expect(spy).toHaveBeenCalledOnceWith('foo');
 *   expect(spy).not.toHaveBeenCalledOnceWith('bar');
 *
 * @param {Object} ctx Test context.
 * @param {...*} args Expected call arguments.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toHaveBeenCalledOnceWith({actual, callCount, equals, argsFor}, ...args) {
  const count = callCount(actual) || 0;
  const wasCalledOnce = count === 1;
  const ok = wasCalledOnce && equals(argsFor(actual, 0), args);
  const msg = wasCalledOnce && !ok ? ' with different arguments' : '';

  return {
    pass: ok,
    message() {
      return `Expect ${pp(actual)} {{not}} to have been called once but was called ${pp(count)} time(s)${msg}`;
    },
  };
}
