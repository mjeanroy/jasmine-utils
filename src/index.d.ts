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

type CustomDate = Date | number | string;
type MatcherResult = boolean | void;

interface PredicateFunction<T> {
  (current: T, index?: number, collection?: T[]): boolean;
}

interface SortFunction<T> {
  (o1: T, o2: T): number;
}

// Extend the `jasmine` namespace with:
// - New custom matchers.
// - New spy utilities (spyAll, etc.).
declare namespace jasmine {
  function spyIf(obj: any, methodName: string): jasmine.Spy;

  function spyAll <T>(obj: T): T;
  function spyAllExcept <T>(obj: T, excepts: string | string[]): T;
  function spyEach <T>(obj: T, excepts: string | string[]): T;

  function resetAll <T>(obj: T): T;
  function resetAllExcept <T>(obj: T, excepts: string | string[]): T;
  function resetEach <T>(obj: T, excepts: string | string[]): T;

  interface Matchers<T> {
    // Any
    toBeEmpty(): MatcherResult;
    toBeExtensible(): MatcherResult;
    toBeFrozen(): MatcherResult;
    toBeInstanceOf(expected: any): MatcherResult;
    toBeOneOf(expected: T[]): MatcherResult;
    toBeSealed(): MatcherResult;
    toEqualOneOf(expected: T[]): MatcherResult;

    // Booleans
    toBeTrue(): MatcherResult;
    toBeFalse(): MatcherResult;

    // Dates
    toBeDateAfterNow(): MatcherResult;
    toBeDateAfter(lower: CustomDate): MatcherResult;
    toBeDateBeforeNow(): MatcherResult;
    toBeDateBefore(upper: CustomDate): MatcherResult;
    toBeDateCloseToNow(): MatcherResult;
    toBeDateCloseTo(date: CustomDate, max?: number): MatcherResult;
    toBeSameDay(day: CustomDate): MatcherResult;
    toBeToday(): MatcherResult;

    // DOM
    toBeDOMelementWithAttributes(attributes: {[name: string]: string}): MatcherResult;
    toBeDOMElementWithClasses(classes: string | string[]): MatcherResult;
    toBeDOMElementWithId(id: string): MatcherResult;
    toBeDOMElement(): MatcherResult;

    // Lang
    toBeABoolean(): MatcherResult;
    toBeADate(): MatcherResult;
    toBeAFunction(): MatcherResult;
    toBeAMap(): MatcherResult;
    toBeANumber(): MatcherResult;
    toBeASet(): MatcherResult;
    toBeAString(): MatcherResult;
    toBeAnArray(): MatcherResult;
    toBeArguments(): MatcherResult;
    toBeIterable(): MatcherResult;
    toBeNil(): MatcherResult;
    toBeNull(): MatcherResult;
    toBeOk(): MatcherResult;

    // Numbers
    toBeEvenNumber(): MatcherResult;
    toBeFiniteNumber(): MatcherResult;
    toBeFloat(): MatcherResult;
    toBeInRange(lower: number, upper: number): MatcherResult;
    toBeInteger(): MatcherResult;
    toBeNegative(): MatcherResult;
    toBeNumeric(): MatcherResult;
    toBeOddNumber(): MatcherResult;
    toBePositive(): MatcherResult;
    toBeZero(): MatcherResult;

    // Objects
    toBePartiallyEqualTo(expected: {[key: string]: any}): MatcherResult;
    toHaveFunctions(key: string, ...others: string[]): MatcherResult;
    toHaveKeys(key: string, ...others: string[]): MatcherResult;
    toHaveSameSizeAs(obj: any): MatcherResult;
    toHaveSize(size: number): MatcherResult;
    toHaveValues(value: any, ...others: any[]): MatcherResult;

    // Spies
    toHaveBeenCalledOnce(): MatcherResult;
    toHaveBeenCalledOnceWith(...params: any[]): MatcherResult;

    // Strings
    toBeAnEmptyString(): MatcherResult;
    toEndWith(suffix: string): MatcherResult;
    toEqualIgnoringCase(expected: string): MatcherResult;
    toStartWith(prefix: string): MatcherResult;
  }

  interface ArrayLikeMatchers<T> {
    toBeSorted(sortFn?: SortFunction<T>): MatcherResult;
    toContainsDistinctValues(): MatcherResult;
    toContainsOnlyFalsyValues(): MatcherResult;
    toContainsOnlyTruthyValues(): MatcherResult;
    toHaveLength(length: number): MatcherResult;
    toHaveSameLengthAs(collection: ArrayLike<any>): MatcherResult;
    toHaveSome(predicate: PredicateFunction<T>): MatcherResult;
    toHaveSome(msg: string, predicate: PredicateFunction<T>): MatcherResult;
    toVerify(predicate: PredicateFunction<T>): MatcherResult;
    toVerify(msg: string, predicate: PredicateFunction<T>): MatcherResult;
  }
}
