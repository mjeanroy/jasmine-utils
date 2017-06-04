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

// any
export {toBeEmpty} from './any/to-be-empty.js';
export {toBeExtensible} from './any/to-be-extensible.js';
export {toBeFrozen} from './any/to-be-frozen.js';
export {toBeInstanceOf} from './any/to-be-instance-of.js';
export {toBeOneOf} from './any/to-be-one-of.js';
export {toBeSealed} from './any/to-be-sealed.js';
export {toEqualOneOf} from './any/to-equal-one-of.js';

// arrays
export {toBeSorted} from './arrays/to-be-sorted.js';
export {toContainsDistinctValues} from './arrays/to-contains-distinct-values.js';
export {toContainsOnlyFalsyValues} from './arrays/to-contains-only-falsy-values.js';
export {toContainsOnlyTruthyValues} from './arrays/to-contains-only-truthy-values.js';
export {toHaveLength} from './arrays/to-have-length.js';
export {toHaveSameLengthAs} from './arrays/to-have-same-length-as.js';
export {toHaveSome} from './arrays/to-have-some.js';
export {toVerify} from './arrays/to-verify.js';

// booleans
export {toBeFalse} from './booleans/to-be-false.js';
export {toBeTrue} from './booleans/to-be-true.js';

// dates
export {toBeDateAfterNow} from './dates/to-be-date-after-now.js';
export {toBeDateAfter} from './dates/to-be-date-after.js';
export {toBeDateBeforeNow} from './dates/to-be-date-before-now.js';
export {toBeDateBefore} from './dates/to-be-date-before.js';
export {toBeDateCloseToNow} from './dates/to-be-date-close-to-now.js';
export {toBeDateCloseTo} from './dates/to-be-date-close-to.js';
export {toBeSameDay} from './dates/to-be-same-day.js';
export {toBeToday} from './dates/to-be-today.js';

// dom
export {toBeDOMElement} from './dom/to-be-dom-element.js';
export {toBeDOMElementWithId} from './dom/to-be-dom-element-with-id.js';
export {toBeDOMElementWithAttributes} from './dom/to-be-dom-element-with-attributes.js';
export {toBeDOMElementWithClasses} from './dom/to-be-dom-element-with-classes.js';

// lang
export {toBeABoolean} from './lang/to-be-a-boolean.js';
export {toBeADate} from './lang/to-be-a-date.js';
export {toBeAFunction} from './lang/to-be-a-function.js';
export {toBeAMap} from './lang/to-be-a-map.js';
export {toBeANumber} from './lang/to-be-a-number.js';
export {toBeASet} from './lang/to-be-a-set.js';
export {toBeAString} from './lang/to-be-a-string.js';
export {toBeAnArray} from './lang/to-be-an-array.js';
export {toBeArguments} from './lang/to-be-arguments.js';
export {toBeIterable} from './lang/to-be-iterable.js';
export {toBeNil} from './lang/to-be-nil.js';
export {toBeNull} from './lang/to-be-null.js';

// numbers
export {toBeEvenNumber} from './numbers/to-be-even-number.js';
export {toBeFloat} from './numbers/to-be-float.js';
export {toBeInRange} from './numbers/to-be-in-range.js';
export {toBeInteger} from './numbers/to-be-integer.js';
export {toBeNegative} from './numbers/to-be-negative.js';
export {toBeNumeric} from './numbers/to-be-numeric.js';
export {toBeOddNumber} from './numbers/to-be-odd-number.js';
export {toBePositive} from './numbers/to-be-positive.js';
export {toBeZero} from './numbers/to-be-zero.js';

// objects
export {toBePartiallyEqualTo} from './objects/to-be-partially-equal-to.js';
export {toHaveFunctions} from './objects/to-have-functions.js';
export {toHaveKeys} from './objects/to-have-keys.js';
export {toHaveSameSizeAs} from './objects/to-have-same-size-as.js';
export {toHaveSize} from './objects/to-have-size.js';
export {toHaveValues} from './objects/to-have-values.js';

// spies
export {toHaveBeenCalledOnceWith} from './spies/to-have-been-called-once-with.js';
export {toHaveBeenCalledOnce} from './spies/to-have-been-called-once.js';

// strings
export {toBeAnEmptyString} from './strings/to-be-an-empty-string';
export {toEndWith} from './strings/to-end-with.js';
export {toEqualIgnoringCase} from './strings/to-equal-ignoring-case.js';
export {toStartWith} from './strings/to-start-with.js';
