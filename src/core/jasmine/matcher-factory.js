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

import {version} from './version.js';
import {jasmine1MatcherFactory} from './j1-matcher-factory.js';
import {jasmine2MatcherFactory} from './j2-matcher-factory.js';
import {jasmine3MatcherFactory} from './j3-matcher-factory.js';

const factories = {
  1: jasmine1MatcherFactory,
  2: jasmine2MatcherFactory,
  3: jasmine3MatcherFactory,
};

/**
 * Create Jasmine matcher.
 * The created matcher will depends on the jasmine's version being used.
 *
 * @param {function} matcher Generic matcher function.
 * @return {function} A matcher that can be used with Jasmine 1.3.X / 2.X.X / 3.X.X.
 */
export function createMatcher(matcher) {
  return (factories[version] || jasmine3MatcherFactory)(matcher);
}
