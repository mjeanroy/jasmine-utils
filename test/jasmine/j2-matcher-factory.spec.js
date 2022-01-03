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

import {jasmine2MatcherFactory} from '../../src/core/jasmine/j2-matcher-factory.js';

describe('jasmine2MatcherFactory', () => {
  it('should create matcher', () => {
    const matcher = jasmine.createSpy('matcher');
    const j2Matcher = jasmine2MatcherFactory(matcher);
    expect(j2Matcher).toBeDefined();
  });

  describe('matcher', () => {
    let matcher;
    let j2Matcher;

    let util;
    let customEqualityTesters;

    beforeEach(() => {
      matcher = jasmine.createSpy('matcher');
      j2Matcher = jasmine2MatcherFactory(matcher);

      customEqualityTesters = {};
      util = {
        equals: jasmine.createSpy('equals').and.returnValue(true),
      };
    });

    it('should execute matcher with the compare function', () => {
      const pass = true;
      const message = jasmine.createSpy('message').and.returnValue('A {{not}} message');

      matcher.and.returnValue({
        pass,
        message,
      });

      const actual = {};
      const arg0 = 0;
      const arg1 = 1;
      const result = j2Matcher(util, customEqualityTesters).compare(actual, arg0, arg1);

      expect(matcher).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.pass).toEqual(pass);
      expect(result.message).not.toBe(message);
      expect(message).not.toHaveBeenCalled();
      expect(result.message()).toBe('A message');
      expect(message).toHaveBeenCalled();

      const args = matcher.calls.mostRecent().args;

      // Check for expected context.
      expect(args[0]).toEqual({
        actual: actual,
        isNot: false,
        callCount: jasmine.any(Function),
        argsFor: jasmine.any(Function),
        equals: jasmine.any(Function),
        pp: jasmine.any(Function),
      });

      expect(args[1]).toBe(arg0);
      expect(args[2]).toBe(arg1);
    });

    it('should execute matcher with the negativeCompare function', () => {
      const pass = true;
      const message = jasmine.createSpy('message').and.returnValue('A {{not}} message');
      matcher.and.returnValue({
        pass,
        message,
      });

      const actual = {};
      const arg0 = 0;
      const arg1 = 1;
      const result = j2Matcher(util, customEqualityTesters).negativeCompare(actual, arg0, arg1);

      expect(matcher).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.pass).toBe(!pass);
      expect(result.message).not.toBe(message);
      expect(message).not.toHaveBeenCalled();
      expect(result.message()).toBe('A not message');
      expect(message).toHaveBeenCalled();

      const args = matcher.calls.mostRecent().args;

      expect(args.length).toBe(3);
      expect(args[1]).toBe(arg0);
      expect(args[2]).toBe(arg1);

      // Check for expected context.
      expect(args[0]).toEqual({
        actual: actual,
        isNot: true,
        callCount: jasmine.any(Function),
        argsFor: jasmine.any(Function),
        equals: jasmine.any(Function),
        pp: jasmine.any(Function),
      });
    });

    describe('context', () => {
      let ctx;

      beforeEach(() => {
        matcher.and.returnValue({
          pass: true,
          message: 'a message',
        });

        j2Matcher(util, customEqualityTesters).negativeCompare({});
        ctx = matcher.calls.mostRecent().args[0];
      });

      it('should return callCount of a spy', () => {
        const callCount = ctx.callCount({
          calls: {
            count: jasmine.createSpy('callCount').and.returnValue(1),
          },
        });

        expect(callCount).toBe(1);
      });

      it('should get args for a given call', () => {
        const actualArgs = [0, 1, 2];
        const spy = {
          calls: {
            argsFor: jasmine.createSpy('argsFor').and.returnValue(actualArgs),
          },
        };

        const argsForCall0 = ctx.argsFor(spy, 0);

        expect(argsForCall0).toEqual(actualArgs);
        expect(spy.calls.argsFor).toHaveBeenCalledWith(0);
      });

      it('should check for equality', () => {
        const a = {};
        const b = {};

        const areEquals = ctx.equals(a, b);

        expect(areEquals).toBe(true);
        expect(util.equals).toHaveBeenCalledWith(a, b, customEqualityTesters);
      });
    });
  });
});
