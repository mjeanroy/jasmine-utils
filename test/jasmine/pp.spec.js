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

import {assumeMap} from '../detect/assume-map.js';
import {assumeSet} from '../detect/assume-set.js';
import {pp} from 'src/core/jasmine/pp.js';

describe('pp', () => {
  it('should pretty-print null', () => {
    expect(pp(null)).toBe('null');
  });

  it('should pretty-print undefined', () => {
    expect(pp(undefined)).toBe('undefined');
  });

  it('should pretty-print empty array', () => {
    expect(pp([])).toBe('[  ]');
  });

  it('should pretty-print Set', () => {
    assumeSet();
    expect(pp(new Set())).toBeDefined();
    expect(pp(new Set())).not.toBe('');
  });

  it('should pretty-print Map', () => {
    assumeMap();
    expect(pp(new Map())).toBeDefined();
    expect(pp(new Map())).not.toBe('');
  });
});
