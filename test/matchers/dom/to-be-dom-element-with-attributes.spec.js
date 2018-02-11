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

import {toBeDOMElementWithAttributes} from '../../../src/core/matchers/dom/to-be-dom-element-with-attributes.js';

describe('toBeDOMElementWithAttributes', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    div.setAttribute('foo', 'bar');
    div.setAttribute('bar', 'baz');
  });

  it('should pass with a dom element with expected attributes', () => {
    const actual = div;
    const equals = jasmine.createSpy('equals').and.callFake((x, y) => (
      jasmine.matchersUtil.equals(x, y)
    ));

    const attrs = {foo: 'bar', bar: 'baz'};
    const result = toBeDOMElementWithAttributes({actual, equals}, attrs);

    expect(equals).toHaveBeenCalled();

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect <div foo="bar" bar="baz"> {{not}} to be a DOM element with attributes [object Object] ` +
      `but was [object Object]`
    );
  });

  it('should pass with a dom element with anything matcher', () => {
    const actual = div;
    const equals = jasmine.createSpy('equals').and.callFake((x, y) => (
      jasmine.matchersUtil.equals(x, y)
    ));

    const attrs = {foo: jasmine.anything(), bar: jasmine.anything()};
    const result = toBeDOMElementWithAttributes({actual, equals}, attrs);

    expect(equals).toHaveBeenCalled();

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect <div foo="bar" bar="baz"> {{not}} to be a DOM element with attributes [object Object] ` +
      `but was [object Object]`
    );
  });

  it('should not pass without a DOM element', () => {
    const actual = '<div></div>';
    const equals = jasmine.createSpy('equals').and.callFake((x, y) => (
      jasmine.matchersUtil.equals(x, y)
    ));

    const result = toBeDOMElementWithAttributes({actual, equals}, {foo: 'bar'});

    expect(equals).not.toHaveBeenCalled();

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect '<div></div>' {{not}} to be a DOM element`
    );
  });

  it('should not pass with a DOM element but not the expected attributes', () => {
    const actual = div;
    const equals = jasmine.createSpy('equals').and.callFake((x, y) => (
      jasmine.matchersUtil.equals(x, y)
    ));

    const result = toBeDOMElementWithAttributes({actual, equals}, {foo: 'baz', bar: 'baz'});

    expect(equals).toHaveBeenCalled();
    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect <div foo="bar" bar="baz"> {{not}} to be a DOM element with attributes [object Object] ` +
      `but was [object Object]`
    );
  });
});
