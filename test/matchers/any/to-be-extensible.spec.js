/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
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

import {assumeFreeze} from '../../detect/assume-freeze.js';
import {assumePreventExtensions} from '../../detect/assume-prevent-extensions.js';
import {assumeSeal} from '../../detect/assume-seal.js';
import {toBeExtensible} from '../../../src/core/matchers/any/to-be-extensible.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toBeExtensible', () => {
  it('should check for null', () => {
    const actual = null;
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect null {{not}} to be extensible`
    );
  });

  it('should check for undefined', () => {
    const actual = undefined;
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect undefined {{not}} to be extensible`
    );
  });

  it('should check for numbers', () => {
    const actual = 1;
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect 1 {{not}} to be extensible`
    );
  });

  it('should check for strings', () => {
    const actual = '';
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect '' {{not}} to be extensible`
    );
  });

  it('should check for booleans', () => {
    const actual = true;
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect true {{not}} to be extensible`
    );
  });

  it('should check for simple object', () => {
    const actual = {};
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({  }) {{not}} to be extensible`
    );
  });

  it('should check for simple array', () => {
    const actual = [];
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [  ] {{not}} to be extensible`
    );
  });

  it('should check for frozen object', () => {
    assumeFreeze();

    const actual = Object.freeze({});
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({  }) {{not}} to be extensible`
    );
  });

  it('should check for frozen array', () => {
    assumeFreeze();

    const actual = Object.freeze([]);
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [  ] {{not}} to be extensible`
    );
  });

  it('should check for sealed object', () => {
    assumeSeal();

    const actual = Object.seal({});
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({  }) {{not}} to be extensible`
    );
  });

  it('should check for sealed array', () => {
    assumeSeal();

    const actual = Object.seal([]);
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [  ] {{not}} to be extensible`
    );
  });

  it('should check for non extensible object', () => {
    assumePreventExtensions();

    const actual = Object.preventExtensions({});
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({  }) {{not}} to be extensible`
    );
  });

  it('should check for frozen array', () => {
    assumePreventExtensions();

    const actual = Object.preventExtensions([]);
    const ctx = createFakeContext(actual);

    const result = toBeExtensible(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [  ] {{not}} to be extensible`
    );
  });
});
