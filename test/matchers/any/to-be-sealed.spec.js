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

import {assumeSeal} from '../../detect/assume-seal.js';
import {toBeSealed} from '../../../src/core/matchers/any/to-be-sealed.js';

describe('toBeSealed', () => {
  it('should check for null', () => {
    const actual = null;
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect null {{not}} to be sealed`,
    });
  });

  it('should check for undefined', () => {
    const actual = undefined;
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect undefined {{not}} to be sealed`,
    });
  });

  it('should check for numbers', () => {
    const actual = 1;
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect 1 {{not}} to be sealed`,
    });
  });

  it('should check for strings', () => {
    const actual = '';
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect '' {{not}} to be sealed`,
    });
  });

  it('should check for booleans', () => {
    const actual = true;
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect true {{not}} to be sealed`,
    });
  });

  it('should check for non sealed object', () => {
    const actual = {};
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: false,
      message: `Expect Object({  }) {{not}} to be sealed`,
    });
  });

  it('should check for non sealed array', () => {
    const actual = [];
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: false,
      message: `Expect [  ] {{not}} to be sealed`,
    });
  });

  it('should check for sealed object', () => {
    assumeSeal();

    const actual = Object.seal({});
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect Object({  }) {{not}} to be sealed`,
    });
  });

  it('should check for sealed array', () => {
    assumeSeal();

    const actual = Object.seal([]);
    const result = toBeSealed({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect [  ] {{not}} to be sealed`,
    });
  });
});
