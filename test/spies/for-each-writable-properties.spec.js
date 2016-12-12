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

import {Klass} from '../fixtures/klass.js';
import {nonLooseClassFactory} from '../fixtures/non-loose-class-generator';
import {forEachWritableProperties} from 'src/core/spies/for-each-writable-properties.js';
const NonLooseClass = nonLooseClassFactory();

describe('forEachWritableProperties', () => {
  it('should execute callback for all object properties', () => {
    const o = {
      id: 1,
      foo() {},
      bar() {},
    };

    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(o, iteratee);

    expect(iteratee).toHaveBeenCalled();
    expect(iteratee.calls.count()).toBe(3);
    expect(iteratee).toHaveBeenCalledWith(o, 'id');
    expect(iteratee).toHaveBeenCalledWith(o, 'foo');
    expect(iteratee).toHaveBeenCalledWith(o, 'bar');
  });

  it('should execute callback for non enumerable and writable properties', () => {
    const o = {
      foo() {},
    };

    Object.defineProperty(o, 'bar', {
        value: 1,
        configurable: true,
        enumerable: false,
        writable: true,
    });

    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(o, iteratee);

    expect(iteratee).toHaveBeenCalled();
    expect(iteratee.calls.count()).toBe(2);
    expect(iteratee).toHaveBeenCalledWith(o, 'foo');
    expect(iteratee).toHaveBeenCalledWith(o, 'bar');
  });

  it('should execute callback and ignore non writable properties', () => {
    const o = {
      foo() {},
    };

    Object.defineProperty(o, 'bar', {
        value: 1,
        configurable: true,
        enumerable: false,
        writable: false,
    });

    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(o, iteratee);

    expect(iteratee).toHaveBeenCalled();
    expect(iteratee.calls.count()).toBe(1);
    expect(iteratee).toHaveBeenCalledWith(o, 'foo');
  });

  it('should execute callback for all class properties', () => {
    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(Klass, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(3);

    expect(iteratee).toHaveBeenCalledWith(Klass.prototype, 'constructor');
    expect(iteratee).toHaveBeenCalledWith(Klass.prototype, 'foo');
    expect(iteratee).toHaveBeenCalledWith(Klass.prototype, 'bar');
  });

  it('should execute callback for all class properties of a non-loose class', () => {
    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(NonLooseClass, iteratee);
    expect(iteratee).toHaveBeenCalledTimes(4);

    expect(iteratee).toHaveBeenCalledWith(NonLooseClass, 'staticMethodOne');
    expect(iteratee).toHaveBeenCalledWith(NonLooseClass.prototype, 'constructor');
    expect(iteratee).toHaveBeenCalledWith(NonLooseClass.prototype, 'methodOne');
    expect(iteratee).toHaveBeenCalledWith(NonLooseClass.prototype, 'methodTwo');
  });

  it('should execute callback for all instance of class', () => {
    const o = new Klass();
    const iteratee = jasmine.createSpy('iteratee');

    forEachWritableProperties(o, iteratee);
    expect(iteratee).toHaveBeenCalledTimes(3);
    expect(iteratee).toHaveBeenCalledWith(o, 'id');
    expect(iteratee).toHaveBeenCalledWith(o, 'foo');
    expect(iteratee).toHaveBeenCalledWith(o, 'bar');
  });

  it('should execute callback for all instance of a non-loose class', () => {
    const o = new NonLooseClass();
    const iteratee = jasmine.createSpy('iteratee');
    forEachWritableProperties(o, iteratee);
    expect(iteratee).toHaveBeenCalledTimes(3);
    expect(iteratee).toHaveBeenCalledWith(o, 'id');
    expect(iteratee).toHaveBeenCalledWith(o, 'methodOne');
    expect(iteratee).toHaveBeenCalledWith(o, 'methodTwo');
  });
});
