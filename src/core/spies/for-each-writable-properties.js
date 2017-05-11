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

import {isNil} from '../util/is-nil.js';
import {filter} from '../util/filter.js';
import {forEach} from '../util/for-each.js';

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

    // Create a Set, with a fallback for old browsers without `Set` structure.
    const foundProps = typeof Set === 'undefined' ?
      new ArraySet() :
      new Set();

    while (current) {
      // First, use the for .. in loop.
      // eslint-disable-next-line guard-for-in
      for (let i in current) {
        const prop = current[i];
        if (!foundProps.has(prop)) {
          foundProps.add(prop);
          iterator(current, i);
        }
      }

      // Spy non enumerable properties.
      // Object.getOwnPropertyNames is supported since IE9.
      if (Object.getOwnPropertyNames) {
        let getProtoResult = null;

        // Be careful, some browsers (like PhantomJS) may return restricted property
        // such as `arguments` or `caller` that cannot be read.
        const props = filter(Object.getOwnPropertyNames(current), (name) => {
          try {
            current[name];
            return false;
          } catch(e) {
            return true;
          }
        });

        if (!current.prototype && Object.getPrototypeOf) {
          getProtoResult = Object.getPrototypeOf(current);
          if (getProtoResult !== Object.getPrototypeOf({})) {
            forEach(Object.getOwnPropertyNames(getProtoResult), (p) => {
              if (p !== 'constructor' && props.indexOf(p) === -1) {
                props.push(p);
              }
            });
          }
        }

        const size = props.length;
        for (let i = 0; i < size; ++i) {
          const propName = props[i];
          const prop = current[propName];

          // Handle property if it is has not been seen yet.
          if (propName !== 'prototype' && !foundProps.has(prop)) {
            const descriptor =
              Object.getOwnPropertyDescriptor(current, propName) ||
              Object.getOwnPropertyDescriptor(Object.getPrototypeOf(current), propName);

            if (descriptor.writable) {
              foundProps.add(prop);
              iterator(current, propName);
            }
          }
        }
      }

      // Go up in the prototype chain.
      if (current.prototype) {
        current = current.prototype;
      } else {
        current = null;
      }
    }
  }
}

/**
 * Fallback implementation for set ES6 datastructure.
 */
class ArraySet {
  /**
   * Create the new Set.
   */
  constructor() {
    this.o = [];
  }

  /**
   * Check that given value has been added to the set.
   * @param {*} x Value to check.
   * @return {boolean} `true` if `x` is in the set, false otherwise.
   */
  has(x) {
    return this.o.indexOf(x) >= 0;
  }

  /**
   * Add new value to the set.
   * @param {*} x Value to add.
   * @return {ArraySet} The current set.
   */
  add(x) {
    this.o.push(x);
    return this;
  }
}
