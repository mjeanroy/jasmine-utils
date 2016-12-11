/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {isNil} from '../util/is-nil.js';

/**
 * Iterate over all entries in object and execute iterator function on it.
 *
 * @param {*} obj Object to iterate over.
 * @param {function} iterator Iterator function.
 * @return {void}
 */
export function forEachWritableProperties(obj, iterator) {
  if (!isNil(obj)) {
    let current = obj;

    while (current) {
      const foundProps = {};
      // First, use the for .. in loop.
      // eslint-disable-next-line guard-for-in
      for (let i in current) {
        foundProps[i] = true;
        iterator(current, i);
      }

      // Spy non enumerable properties.
      // Object.getOwnPropertyNames is supported since IE9.
      if (Object.getOwnPropertyNames) {
        const props = Object.getOwnPropertyNames(current);
        const size = props.length;
        for (let i = 0; i < size; ++i) {
          const propName = props[i];

          // Handle property if it is as not been seen yet.
          if (foundProps[propName] !== true) {
            const descriptor = Object.getOwnPropertyDescriptor(current, propName);
            if (descriptor.writable) {
              iterator(current, props[i]);
            }
          }
        }
      }

      // Go up in the prototype chain.
      if (current.prototype) {
        current = current.prototype;
      } else if(Object.getPrototypeOf) {
        // for babel transformed es6 classes
        current = Object.getPrototypeOf(current);
        // if it's just the default Object prototype, we don't want to continue
        if(current === Object.getPrototypeOf({})) {
          current = null;
        }
      } else {
        current = null;
      }
    }
  }
}
