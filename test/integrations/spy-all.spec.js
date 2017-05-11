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

import {assumeGetOwnPropertyNames} from '../detect/assume-get-own-property-names.js';
import 'src/index.js';
import {Klass} from '../fixtures/klass.js';
import {nonLooseClassFactory} from '../fixtures/non-loose-class-generator';
const NonLooseClass = nonLooseClassFactory();

describe('spyAll and spyAllExcept', () => {
  it('should spy all methods', () => {
    const obj = {
      foo() {},
      bar() {},
    };

    jasmine.spyAll(obj);

    expect(jasmine.isSpy(obj.foo)).toBeTruthy();
    expect(jasmine.isSpy(obj.bar)).toBeTruthy();
  });

  it('should spy all methods with non-enumerable writable property', () => {
    assumeGetOwnPropertyNames();

    const obj = new Klass();

    Object.defineProperty(obj, 'nonEnumerableProperty', {
      value: () => {},
      enumerable: false,
      writable: true,
    });

    expect(obj.nonEnumerableProperty).toBeDefined();
    expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();

    jasmine.spyAll(obj);

    expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeTruthy();
  });

  it('should not try to spy non-enumerable methods and non writable property', () => {
    assumeGetOwnPropertyNames();

    const obj = new Klass();

    Object.defineProperty(obj, 'nonEnumerableProperty', {
      value: () => {},
      enumerable: false,
      writable: false,
    });

    expect(obj.nonEnumerableProperty).toBeDefined();
    expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();

    jasmine.spyAll(obj);

    expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();
  });

  it('should spy all methods except bar', () => {
    const obj = {
      foo() {},
      bar() {},
    };

    jasmine.spyAllExcept(obj, 'bar');

    expect(jasmine.isSpy(obj.foo)).toBeTruthy();
    expect(jasmine.isSpy(obj.bar)).toBeFalsy();
  });

  it('should spy all methods except foo and bar', () => {
    const obj = new Klass();

    jasmine.spyAllExcept(obj, ['foo', 'bar']);

    expect(jasmine.isSpy(obj.foo)).toBeFalsy();
    expect(jasmine.isSpy(obj.bar)).toBeFalsy();
  });

  it('should spy each methods with one argument', () => {
    const obj = {
      foo() {},
      bar() {},
    };

    jasmine.spyEach(obj, 'bar');

    expect(jasmine.isSpy(obj.foo)).toBeFalsy();
    expect(jasmine.isSpy(obj.bar)).toBeTruthy();
  });

  it('should spy each methods', () => {
    const obj = {
      foo() {},
      bar() {},
      baz() {},
    };

    jasmine.spyEach(obj, ['bar', 'foo']);

    expect(jasmine.isSpy(obj.foo)).toBeTruthy();
    expect(jasmine.isSpy(obj.bar)).toBeTruthy();
  });

  it('should not spy a method that is already a spy', () => {
    const obj = {
      foo() {},
      bar() {},
    };

    spyOn(obj, 'foo').and.returnValue(true);

    jasmine.spyAll(obj);

    expect(jasmine.isSpy(obj.foo)).toBeTruthy();
    expect(jasmine.isSpy(obj.bar)).toBeTruthy();
  });

  it('should spy class methods', () => {
    jasmine.spyAll(Klass);

    expect(jasmine.isSpy(Klass.prototype.foo)).toBeTruthy();
    expect(jasmine.isSpy(Klass.prototype.bar)).toBeTruthy();
  });

  it('should spy babel transformed instance methods', () => {
    const instance = new NonLooseClass();
    jasmine.spyAll(instance);
    expect(jasmine.isSpy(instance.methodOne)).toBeTruthy();
    expect(jasmine.isSpy(instance.methodTwo)).toBeTruthy();
  });
});
