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

import {spyIfAndCallThrough} from '../../../src/core/spies/internal/spy-if-and-call-through.js';

describe('spyIfAndCallThrough', () => {
  it('should spy method with callThrough strategy', () => {
    const o = {
      id: 1,
      foo() {
        this.id++;
      },
    };

    const spy = spyIfAndCallThrough(o, 'foo');

    expect(spy).toBeDefined();
    expect(spy).toBe(o.foo);
    expect(jasmine.isSpy(o.foo)).toBe(true);
    expect(o.id).toBe(1);

    o.foo();

    expect(o.id).toBe(2);
  });

  it('should not re-spy method', () => {
    const spy = jasmine.createSpy('foo');
    const o = {
      foo: spy,
    };

    const result = spyIfAndCallThrough(o, 'foo');

    expect(result).toBeDefined();
    expect(result).toBe(spy);
  });

  it('should not try to spy non function', () => {
    const o = {
      foo: 1,
    };

    const result = spyIfAndCallThrough(o, 'foo');

    expect(result).toBeDefined();
    expect(result).toBe(1);
  });
});
