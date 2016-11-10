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

import {forEach} from '../util/for-each.js';

/**
 * Create a message by replacing interpolated values with a pretty string
 * output (using the result of `jasmine.pp` function).
 *
 * The format is the following:
 *  - For a given string: 'String With Parameter: {{%0}} {{%1}}'
 *  - The result of pp(message, 'val1', 'val2') will be: 'String with parameter val1 val2'
 *
 * Each parameter of the `pp` function will be used to replace {{%i}} pattern where `i`
 * is the position of the parameter in the arguments signature.
 *
 * @param {string} message Message to transform.
 * @param {Array<*>} placeholders All placeholders for `{{%i}}` pattern.
 * @return {string} The interpolated message.
 */
export function pp(message, ...placeholders) {
  let interpolatedMessage = message;

  forEach(placeholders, (placeholder, i) => {
    const pattern = `{{%${i}}}`;
    const replacement = jasmine.pp(placeholder);
    interpolatedMessage = interpolatedMessage.replace(pattern, replacement);
  });

  return interpolatedMessage;
}
