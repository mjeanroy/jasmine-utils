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

import {pp} from '../../../src/core/jasmine/pp.js';
import {toHaveBeenCalledOnceWith} from '../../../src/core/matchers/spies/to-have-been-called-once-with.js';

describe('toHaveBeenCalledOnceWith', () => {
  it('should pass if spy has been called once with expected arguments', () => {
    const args = [0, 1, 2, 3];
    const argsFor = jasmine.createSpy('argsFor').and.returnValue(args);
    const equals = jasmine.createSpy('equals').and.returnValue(true);
    const callCount = jasmine.createSpy('callCount').and.returnValue(1);
    const actual = jasmine.createSpy('actual');

    const expectedArgs = [0, 1, 2, 3];
    const result = toHaveBeenCalledOnceWith({actual, callCount, equals, argsFor}, ...expectedArgs);

    expect(callCount).toHaveBeenCalledWith(actual);
    expect(argsFor).toHaveBeenCalledWith(actual, 0);
    expect(equals).toHaveBeenCalledWith(args, expectedArgs);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(`Expect ${pp(actual)} {{not}} to have been called once but was called 1 time(s)`);
  });

  it('should not pass if spy has not been called', () => {
    const args = [0, 1, 2, 3];
    const argsFor = jasmine.createSpy('argsFor').and.returnValue(args);
    const equals = jasmine.createSpy('equals').and.returnValue(true);
    const callCount = jasmine.createSpy('callCount').and.returnValue(0);
    const actual = jasmine.createSpy('actual');

    const expectedArgs = [0, 1, 2, 3];
    const result = toHaveBeenCalledOnceWith({actual, callCount, equals, argsFor}, ...expectedArgs);

    expect(callCount).toHaveBeenCalledWith(actual);
    expect(argsFor).not.toHaveBeenCalled();
    expect(equals).not.toHaveBeenCalled();

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(`Expect ${pp(actual)} {{not}} to have been called once but was called 0 time(s)`);
  });

  it('should not pass if spy has been called more than once', () => {
    const args = [0, 1, 2, 3];
    const argsFor = jasmine.createSpy('argsFor').and.returnValue(args);
    const equals = jasmine.createSpy('equals').and.returnValue(true);
    const callCount = jasmine.createSpy('callCount').and.returnValue(2);
    const actual = jasmine.createSpy('actual');

    const expectedArgs = [0, 1, 2, 3];
    const result = toHaveBeenCalledOnceWith({actual, callCount, equals, argsFor}, ...expectedArgs);

    expect(callCount).toHaveBeenCalledWith(actual);
    expect(argsFor).not.toHaveBeenCalled();
    expect(equals).not.toHaveBeenCalled();

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(`Expect ${pp(actual)} {{not}} to have been called once but was called 2 time(s)`);
  });

  it('should not pass if spy has been called once with different arguments', () => {
    const args = [0, 1, 2];
    const argsFor = jasmine.createSpy('argsFor').and.returnValue(args);
    const equals = jasmine.createSpy('equals').and.returnValue(false);
    const callCount = jasmine.createSpy('callCount').and.returnValue(1);
    const actual = jasmine.createSpy('actual');

    const expectedArgs = [0, 1, 2, 3];
    const result = toHaveBeenCalledOnceWith({actual, callCount, equals, argsFor}, ...expectedArgs);

    expect(callCount).toHaveBeenCalledWith(actual);
    expect(argsFor).toHaveBeenCalledWith(actual, 0);
    expect(equals).toHaveBeenCalledWith(args, expectedArgs);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${pp(actual)} {{not}} to have been called once but was called 1 time(s) with different arguments`
    );
  });
});
