/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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

import {toBeDOMElementWithClasses} from '../../../src/core/matchers/dom/to-be-dom-element-with-classes.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toBeDOMElementWithClasses', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    div.className = 'foo bar';
  });

  it('should pass with a dom element with expected classes as an array', () => {
    const actual = div;
    const classes = ['foo', 'bar'];
    const ctx = createFakeContext(actual);

    const result = toBeDOMElementWithClasses(ctx, classes);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect <div class="foo bar"> {{not}} to be a DOM element with classes [ 'foo', 'bar' ] ` +
        `but was [ 'foo', 'bar' ]`
    );
  });

  it('should pass with a dom element with expected classes as a string', () => {
    const actual = div;
    const classes = ' foo  bar ';
    const ctx = createFakeContext(actual);

    const result = toBeDOMElementWithClasses(ctx, classes);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect <div class="foo bar"> {{not}} to be a DOM element with classes [ 'foo', 'bar' ] ` +
        `but was [ 'foo', 'bar' ]`
    );
  });

  it('should not pass without a DOM element', () => {
    const actual = '<div></div>';
    const ctx = createFakeContext(actual);

    const result = toBeDOMElementWithClasses(ctx, 'foo');

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect '<div></div>' {{not}} to be a DOM element`
    );
  });

  it('should not pass with a DOM element but not all the expected classes', () => {
    const actual = div;
    const classes = 'foo bar baz';
    const ctx = createFakeContext(actual);

    const result = toBeDOMElementWithClasses(ctx, classes);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect <div class="foo bar"> {{not}} to be a DOM element with classes [ 'foo', 'bar', 'baz' ] ` +
        `but was [ 'foo', 'bar' ]`
    );
  });
});
