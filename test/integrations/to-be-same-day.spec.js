/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import 'src/index.js';

describe('toBeSameDay', () => {
  it('should pass with dates', () => {
    const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
    const date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
    const date3 = new Date(2014, 5, 6, 10, 0, 0, 0);

    expect(date1).toBeSameDay(date2);
    expect(date1).not.toBeSameDay(date3);
  });

  it('should pass with strings', () => {
    const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);

    expect(date1).toBeSameDay('2014-06-05');
    expect(date1).not.toBeSameDay('2014-06-06');
  });
});
