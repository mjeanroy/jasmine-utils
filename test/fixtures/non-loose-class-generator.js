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

/**
 * This is meant to replicate a real-world babel transformed class that isn't using the 'loose'
 * preset.
 */

export const nonLooseClassFactory = function() {
  /**
   * Define property on target object using native `Object.defineProperty`.
   *
   * @param {Object} target Target object.
   * @param {Array<Object>} props The properties.
   * @return {void}
   */
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }

      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  /**
   * @constructor NonLooseClass
   */
  function NonLooseClass() {
    this.id = 42;
  }

  defineProperties(NonLooseClass.prototype, [
    {key: 'methodOne', value: function methodOne() {}},
    {key: 'methodTwo', value: function methodTwo() {}},
  ]);

  defineProperties(NonLooseClass, [
    {key: 'staticMethodOne', value: function staticMethodOne() {}},
  ]);

  return NonLooseClass;
};
