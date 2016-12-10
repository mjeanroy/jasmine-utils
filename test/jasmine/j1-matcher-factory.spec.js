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

import {jasmine1MatcherFactory} from 'src/core/jasmine/j1-matcher-factory.js';

describe('jasmine1MatcherFactory', () => {
  it('should create matcher function', () => {
    const matcher = jasmine.createSpy('matcher');
    const j1Matcher = jasmine1MatcherFactory(matcher);
    expect(j1Matcher).toBeDefined();
  });

  it('once created', () => {
    let matcher;
    let j1Matcher;

    beforeEach(() => {
      matcher = jasmine.createSpy('matcher');
      j1Matcher = jasmine1MatcherFactory(matcher);
    });

    it('should compare two values', () => {
      matcher.and.returnValue({
        pass: true,
      });

      const actual = {};
      const arg0 = 0;
      const arg1 = 1;
      const jasmineContext = {
        actual: actual,
        isNot: false,
        env: {
          equals_: jasmine.createSpy('equals_').and.returnValue(true),
        },
      };

      const result = j1Matcher.call(jasmineContext, arg0, arg1);

      expect(result).toBe(true);
      expect(matcher).toHaveBeenCalled();

      const args = matcher.calls.mostRecent().calls;

      expect(args.length).toBe(3);
      expect(args[1]).toBe(arg0);
      expect(args[2]).toBe(arg1);

      // Check for expected context.
      expect(args[0]).toEqual({
        actual: actual,
        isNot: false,
        callCount: jasmine.any(Function),
        argsFor: jasmine.any(Function),
        equals: jasmine.any(Function),
      });
    });
  });
});
