/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {spyAllExcept} from 'src/core/spies/spy-all-except.js';

describe('resetAll', () => {
  it('should spy methods of object except one', () => {
    const o = {
      id: 1,
      foo() {},
      bar() {},
      baz() {},
    };

    spyAllExcept(o, 'foo');

    expect(jasmine.isSpy(o.foo)).toBe(false);
    expect(jasmine.isSpy(o.bar)).toBe(true);
    expect(jasmine.isSpy(o.baz)).toBe(true);

    expect(o.id).toBe(1);
  });

  it('should spy methods of object except ones', () => {
    const o = {
      id: 1,
      foo() {},
      bar() {},
      baz() {},
    };

    spyAllExcept(o, ['foo', 'bar']);

    expect(jasmine.isSpy(o.foo)).toBe(false);
    expect(jasmine.isSpy(o.bar)).toBe(false);
    expect(jasmine.isSpy(o.baz)).toBe(true);

    expect(o.id).toBe(1);
  });
});
