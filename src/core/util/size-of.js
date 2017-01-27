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

import {keys} from './keys.js';
import {isArrayLike} from './is-array-like.js';
import {isString} from './is-string.js';
import {isSet} from './is-set.js';
import {isMap} from './is-map.js';
import {isIterable} from './is-iterable.js';
import {isNil} from './is-nil.js';
import {isObject} from './is-object.js';

/**
 * Get the `size` of a given value:
 * - The length value for an array (or an array-like) object.
 * - The number of properties for an object.
 *
 * @param {*} obj Value to get the size.
 * @return {number} The computed size.
 */
export function sizeOf(obj) {
  if (isNil(obj)) {
    return 0;
  }

  // For string and array-like object, just return the length property.
  if (isString(obj) || isArrayLike(obj)) {
    return obj.length;
  }

  // For set and map object, just return the size property.
  if (isSet(obj) || isMap(obj)) {
    return obj.size;
  }

  // For iterable objects, use the for..of loop to get the size.
  if (isIterable(obj)) {
    let size = 0;

    // eslint-disable-next-line no-unused-vars
    for (const x of obj) {
      size++;
    }

    return size;
  }

  // Last option: return the number of keys for an object.
  if (isObject(obj)) {
    return keys(obj).length;
  }

  return -1;
}
