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

import {assumeMap} from '../../../detect/assume-map.js';
import '../../../../src/index.js';

describe('toHaveValues', () => {
  it('should pass with object', () => {
    const obj = {
      id: 1,
      name: 'foo',
      array: [1, 2, 3],
      o: {
        id: 10,
      },
    };

    expect(obj).toHaveValues(1, 'foo', [1, 2, 3], {id: 10});
    expect(obj).not.toHaveValues(2, 'bar');
    expect(obj).not.toHaveValues({id: 11});
  });

  it('should pass with map', () => {
    assumeMap();

    const map = new Map();
    map.set('id', 1);
    map.set('name', 'foo');
    map.set('array', [1, 2, 3]);
    map.set('o', {id: 10});

    expect(map).toHaveValues(1, 'foo', [1, 2, 3], {id: 10});
    expect(map).not.toHaveValues(2, 'bar');
    expect(map).not.toHaveValues({id: 11});
  });
});
