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

import {pp} from '../../jasmine/pp.js';
import {isDOMElement} from '../../util/is-dom-element.js';
import {keys} from '../../util/keys.js';

/**
 * Check that the tested object is a DOM element with expected attributes (using
 * the `getAttribute` function).
 *
 * Note that the attribute value can also be a jasmine matcher (`jasmine.any(String)` for example).
 *
 * @message Expect [actual] (not) to be a DOM element with attributes [attributes] but was [actualAttributes]
 * @example
 *   const span = document.createElement('span');
 *   span.setAttribute('foo', 'foo');
 *   span.setAttribute('bar', 'bar');
 *
 *   expect(span).toBeDOMElementWithAttributes({ foo: 'foo', bar: jasmine.any(String) });
 *
 * @param {Object} ctx Test context.
 * @param {Object} attributes Expected attributes.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeDOMElementWithAttributes({actual, equals}, attributes) {
  const isElement = isDOMElement(actual);

  let msg = `Expect ${pp(actual)} {{not}} to be a DOM element`;
  let ok = isElement;

  if (isElement) {
    const attrs = keys(attributes);
    const actualAttributes = {};

    for (let i = 0, size = attrs.length; i < size; ++i) {
      const key = attrs[i];
      actualAttributes[key] = actual.getAttribute(key);
    }

    ok = ok && equals(attributes, actualAttributes);
    msg += ` with attributes ${attributes} but was ${actualAttributes}`;
  }

  return {
    pass: ok,
    message: msg,
  };
}
