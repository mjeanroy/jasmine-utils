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

import {isArray} from '../util/is-array.js';
import {index} from '../util/index.js';
import {has} from '../util/has.js';
import {forEachWritableProperties} from './internal/for-each-writable-properties.js';
import {reset} from './internal/reset.js';

/**
 * Reset all spy methods in object except given methods.
 *
 * @param {Object} obj The object to reset.
 * @param {Array<string>|string} methods The method or the array of methods to ignore.
 * @return {Object} The spy object.
 */
export function resetAllExcept(obj, methods = []) {
  const array = isArray(methods) ? methods : [methods];
  const map = index(array, (x) => x);

  forEachWritableProperties(obj, (target, i) => {
    const spy = target[i];
    if (jasmine.isSpy(spy) && !has(map, i)) {
      reset(spy);
    }
  });

  return obj;
}
