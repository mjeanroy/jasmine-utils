/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import 'src/index.js';
import {Klass} from './fixtures/klass.js';

describe('jasmine-utils', () => {
  describe('spyIf', () => {
    it('should spy a method that is not already a spy', () => {
      const obj = {
        foo() {},
      };

      const spy = jasmine.spyIf(obj, 'foo');

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(spy).toBeDefined();
      expect(spy).toBe(obj.foo);
    });

    it('should not spy a method that is already a spy', () => {
      const obj = {
        foo() {},
      };

      spyOn(obj, 'foo');

      const spy = jasmine.spyIf(obj, 'foo');

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(spy).toBeDefined();
      expect(spy).toBe(obj.foo);
    });
  });

  describe('spyAll and spyAllExcept', () => {
    it('should spy all methods', () => {
      const obj = {
        foo() {},
        bar() {},
      };

      jasmine.spyAll(obj);

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(jasmine.isSpy(obj.bar)).toBeTruthy();
    });

    if (Object.getOwnPropertyNames) {
      it('should spy all methods with non-enumerable writable property', () => {
        const obj = new Klass();

        Object.defineProperty(obj, 'nonEnumerableProperty', {
          value: () => {},
          enumerable: false,
          writable: true,
        });

        expect(obj.nonEnumerableProperty).toBeDefined();
        expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();

        jasmine.spyAll(obj);

        expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeTruthy();
      });

      it('should not try to spy non-enumerable methods and non writable property', () => {
        const obj = new Klass();

        Object.defineProperty(obj, 'nonEnumerableProperty', {
          value: () => {},
          enumerable: false,
          writable: false,
        });

        expect(obj.nonEnumerableProperty).toBeDefined();
        expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();

        jasmine.spyAll(obj);

        expect(jasmine.isSpy(obj.nonEnumerableProperty)).toBeFalsy();
      });
    }

    it('should spy all methods except bar', () => {
      const obj = {
        foo() {},
        bar() {},
      };

      jasmine.spyAllExcept(obj, 'bar');

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(jasmine.isSpy(obj.bar)).toBeFalsy();
    });

    it('should spy all methods except foo and bar', () => {
      const obj = new Klass();

      jasmine.spyAllExcept(obj, ['foo', 'bar']);

      expect(jasmine.isSpy(obj.foo)).toBeFalsy();
      expect(jasmine.isSpy(obj.bar)).toBeFalsy();
    });

    it('should spy each methods with one argument', () => {
      const obj = {
        foo() {},
        bar() {},
      };

      jasmine.spyEach(obj, 'bar');

      expect(jasmine.isSpy(obj.foo)).toBeFalsy();
      expect(jasmine.isSpy(obj.bar)).toBeTruthy();
    });

    it('should spy each methods', () => {
      const obj = {
        foo() {},
        bar() {},
        baz() {},
      };

      jasmine.spyEach(obj, ['bar', 'foo']);

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(jasmine.isSpy(obj.bar)).toBeTruthy();
    });

    it('should not spy a method that is already a spy', () => {
      const obj = {
        foo() {},
        bar() {},
      };

      spyOn(obj, 'foo').and.returnValue(true);

      jasmine.spyAll(obj);

      expect(jasmine.isSpy(obj.foo)).toBeTruthy();
      expect(jasmine.isSpy(obj.bar)).toBeTruthy();
    });

    it('should spy class methods', () => {
      jasmine.spyAll(Klass);

      expect(jasmine.isSpy(Klass.prototype.foo)).toBeTruthy();
      expect(jasmine.isSpy(Klass.prototype.bar)).toBeTruthy();
    });
  });

  describe('resetAll, resetEach and resetAllExcept', () => {
    it('should reset all methods', () => {
      const obj = new Klass();
      spyOn(obj, 'foo');
      spyOn(obj, 'bar');

      obj.foo();
      obj.bar();

      expect(obj.foo).toHaveBeenCalled();
      expect(obj.bar).toHaveBeenCalled();

      jasmine.resetAll(obj);

      expect(obj.foo).not.toHaveBeenCalled();
      expect(obj.bar).not.toHaveBeenCalled();
    });

    it('should reset each specified methods', () => {
      const obj = new Klass();
      spyOn(obj, 'foo');
      spyOn(obj, 'bar');

      obj.foo();
      obj.bar();

      expect(obj.foo).toHaveBeenCalled();
      expect(obj.bar).toHaveBeenCalled();

      jasmine.resetEach(obj, ['foo']);

      expect(obj.foo).not.toHaveBeenCalled();
      expect(obj.bar).toHaveBeenCalled();
    });

    it('should reset all methods except specified', () => {
      const obj = new Klass();
      spyOn(obj, 'foo');
      spyOn(obj, 'bar');

      obj.foo();
      obj.bar();

      expect(obj.foo).toHaveBeenCalled();
      expect(obj.bar).toHaveBeenCalled();

      jasmine.resetAllExcept(obj, ['foo']);

      expect(obj.foo).toHaveBeenCalled();
      expect(obj.bar).not.toHaveBeenCalled();
    });
  });

  describe('toHaveLength', () => {
    it('should pass with an array', () => {
      expect([1, 2, 3]).toHaveLength(3);
      expect([1, 2, 3]).not.toHaveLength(1);
    });

    it('should pass with a string', () => {
      expect('123').toHaveLength(3);
      expect('123').not.toHaveLength(1);
    });
  });

  describe('toHaveSameLengthAs', () => {
    it('should pass with an array', () => {
      expect([1, 2, 3]).toHaveSameLengthAs([3, 2, 1]);
      expect([1, 2, 3]).not.toHaveSameLengthAs([1]);
    });

    it('should pass with a string', () => {
      expect('123').toHaveSameLengthAs('321');
      expect('123').not.toHaveSameLengthAs('1');
    });
  });

  describe('toHaveSize', () => {
    it('should pass with an array', () => {
      expect([1, 2, 3]).toHaveSize(3);
      expect([1, 2, 3]).not.toHaveSize(1);
    });

    it('should pass with an array like object', () => {
      // HTMLCollection is an array like object
      const nodes = document.getElementsByTagName('foo');
      expect(nodes).toHaveSize(0);
      expect(nodes).not.toHaveSize(1);
    });

    it('should pass with an object', () => {
      const obj = {one: 1, two: 2, three: 3};
      expect(obj).toHaveSize(3);
      expect(obj).not.toHaveSize(1);
    });

    it('should pass with a string', () => {
      expect('123').toHaveSize(3);
      expect('123').not.toHaveSize(1);
    });
  });

  describe('toHaveSameSizeAs', () => {
    it('should pass with an array', () => {
      expect([1, 2, 3]).toHaveSameSizeAs([3, 2, 1]);
      expect([1, 2, 3]).not.toHaveSameSizeAs([1]);
    });

    it('should pass with an object', () => {
      const obj = {one: 1, two: 2, three: 3};
      const obj2 = {1: 'one', 2: 'two', 3: 'three'};

      expect(obj).toHaveSameSizeAs(obj2);
      expect(obj).not.toHaveSameSizeAs({
        1: 'one',
      });
    });

    it('should pass with a string', () => {
      expect('123').toHaveSameSizeAs('321');
      expect('123').not.toHaveSameSizeAs('1');
    });
  });

  describe('toBeEmpty', () => {
    it('should pass with an array', () => {
      expect([]).toBeEmpty();
      expect([1, 2, 3]).not.toBeEmpty();
    });

    it('should pass with an object', () => {
      expect({}).toBeEmpty();
      expect({'one': 1}).not.toBeEmpty();
    });

    it('should pass with an empty string', () => {
      expect('').toBeEmpty();
      expect('123').not.toBeEmpty();
    });

    it('should pass with null', () => {
      expect(null).toBeEmpty();
    });

    it('should pass with undefined', () => {
      expect(undefined).toBeEmpty();
    });
  });

  describe('toBeAnArray', () => {
    it('should pass', () => {
      expect([]).toBeAnArray();
      expect('123').not.toBeAnArray();
      expect(1).not.toBeAnArray();
      expect(false).not.toBeAnArray();
      expect({}).not.toBeAnArray();
      expect(null).not.toBeAnArray();
      expect(undefined).not.toBeAnArray();
    });
  });

  describe('toBeNull', () => {
    it('should pass', () => {
      expect(null).toBeNull();
      expect('123').not.toBeNull();
      expect(1).not.toBeNull();
      expect(false).not.toBeNull();
      expect({}).not.toBeNull();
      expect(undefined).not.toBeNull();
    });
  });

  describe('toBeDOMElement', () => {
    it('should pass', () => {
      const element = document.createElement('span');
      expect(element).toBeDOMElement();

      expect(null).not.toBeDOMElement();
      expect(undefined).not.toBeDOMElement();
      expect(0).not.toBeDOMElement();
      expect('foo').not.toBeDOMElement();
    });

    it('should pass with a tag name', () => {
      const element = document.createElement('span');
      expect(element).toBeDOMElement('span');
      expect(element).toBeDOMElement('SPAN');

      expect(element).not.toBeDOMElement('P');
      expect(element).not.toBeDOMElement('div');
      expect(element).not.toBeDOMElement('input');

      expect(null).not.toBeDOMElement();
      expect(undefined).not.toBeDOMElement();
      expect(0).not.toBeDOMElement();
      expect('foo').not.toBeDOMElement();
    });
  });

  describe('toBeDOMElementWithId', () => {
    it('should pass', () => {
      const actualId = 'foo';
      const element = document.createElement('span');
      element.setAttribute('id', actualId);

      expect(element).toBeDOMElementWithId(actualId);
      expect(element).not.toBeDOMElementWithId('bar');

      expect(null).not.toBeDOMElementWithId();
      expect(undefined).not.toBeDOMElementWithId();
      expect(0).not.toBeDOMElementWithId();
      expect('foo').not.toBeDOMElementWithId();
    });
  });

  describe('toBeDOMElementWithAttributes', () => {
    it('should pass', () => {
      const element = document.createElement('span');
      element.setAttribute('id', 'id');
      element.setAttribute('foo', 'bar');
      element.setAttribute('bar', 'foo');
      element.setAttribute('idx', 0);

      expect(element).toBeDOMElementWithAttributes({
        id: 'id',
        foo: 'bar',
        bar: 'foo',
        idx: '0',
      });

      expect(element).not.toBeDOMElementWithAttributes({
        id: 'foo',
        foo: 'foo',
        bar: 'foo',
        idx: 'foo',
      });
    });
  });

  describe('toBeDOMElementWithClasses', () => {
    it('should pass', () => {
      const element = document.createElement('span');
      element.className = 'foo  bar quix ';

      expect(element).toBeDOMElementWithClasses('foo');
      expect(element).toBeDOMElementWithClasses('bar');
      expect(element).toBeDOMElementWithClasses('quix');

      expect(element).toBeDOMElementWithClasses(['foo', 'bar']);
      expect(element).toBeDOMElementWithClasses(['bar', ' foo ']);
      expect(element).toBeDOMElementWithClasses(['bar', ' foo ', 'quix']);

      expect(element).toBeDOMElementWithClasses('bar foo');
      expect(element).toBeDOMElementWithClasses('bar foo quix');

      expect(element).not.toBeDOMElementWithClasses(['bar', ' foo ', 'quix', 'fake']);
      expect(element).not.toBeDOMElementWithClasses('fake');
    });
  });

  describe('toBeANumber', () => {
    it('should pass', () => {
      expect(1).toBeANumber();
      expect(0).toBeANumber();

      expect('123').not.toBeANumber();
      expect(false).not.toBeANumber();
      expect({}).not.toBeANumber();
      expect(undefined).not.toBeANumber();
      expect(null).not.toBeANumber();
    });
  });

  describe('toBeAString', () => {
    it('should pass', () => {
      expect('1').toBeAString();
      expect('').toBeAString();

      expect(123).not.toBeAString();
      expect(false).not.toBeAString();
      expect({}).not.toBeAString();
      expect(undefined).not.toBeAString();
      expect(null).not.toBeAString();
    });
  });

  describe('toBeAnEmptyString', () => {
    it('should pass', () => {
      expect('').toBeAnEmptyString();

      expect('123').not.toBeAnEmptyString();
      expect(' ').not.toBeAnEmptyString();
    });
  });

  describe('toStartWith', () => {
    it('should pass', () => {
      expect('foo').toStartWith('foo');
      expect('foo').toStartWith('fo');
      expect('foo').toStartWith('f');

      expect('foo').not.toStartWith('o');
      expect('foo').not.toStartWith('oo');
      expect('foo').not.toStartWith('bar');

      // Deprecated matcher
      spyOn(console, 'warn');

      expect('foo').toStartsWith('foo');
      expect('foo').toStartsWith('fo');
      expect('foo').toStartsWith('f');
      expect('foo').not.toStartsWith('o');
      expect('foo').not.toStartsWith('oo');
      expect('foo').not.toStartsWith('bar');

      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('toEndWith', () => {
    it('should pass', () => {
      expect('foo').toEndWith('foo');
      expect('foo').toEndWith('oo');
      expect('foo').toEndWith('o');

      expect('foo').not.toEndWith('f');
      expect('foo').not.toEndWith('fo');
      expect('foo').not.toEndWith('bar');

      // Deprecated matcher
      spyOn(console, 'warn');

      expect('foo').toEndsWith('foo');
      expect('foo').toEndsWith('oo');
      expect('foo').toEndsWith('o');
      expect('foo').not.toEndsWith('f');
      expect('foo').not.toEndsWith('fo');
      expect('foo').not.toEndsWith('bar');

      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('toEqualIgnoringCase', () => {
    it('should pass', () => {
      expect('foo').toEqualIgnoringCase('Foo');
      expect('foo').toEqualIgnoringCase('FOO');
      expect('foo').toEqualIgnoringCase('foo');

      expect('foo').not.toEqualIgnoringCase('bar');

      // Deprecated matcher
      spyOn(console, 'warn');

      expect('foo').toEqualsIgnoringCase('Foo');
      expect('foo').toEqualsIgnoringCase('FOO');
      expect('foo').toEqualsIgnoringCase('foo');
      expect('foo').not.toEqualsIgnoringCase('bar');
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('toBeZero', () => {
    it('should pass', () => {
      expect(0).toBeZero();

      expect(-1).not.toBeZero();
      expect(1).not.toBeZero();
      expect('0').not.toBeZero();
      expect(false).not.toBeZero();
      expect({}).not.toBeZero();
      expect(undefined).not.toBeZero();
      expect(null).not.toBeZero();
    });
  });

  describe('toBeOddNumber', () => {
    it('should pass', () => {
      expect(1).toBeOddNumber();
      expect(3).toBeOddNumber();
      expect(5).toBeOddNumber();

      expect(0).not.toBeOddNumber();
      expect(2).not.toBeOddNumber();
      expect(4).not.toBeOddNumber();
      expect('4').not.toBeOddNumber();
    });
  });

  describe('toBeEvenNumber', () => {
    it('should pass', () => {
      expect(0).toBeEvenNumber();
      expect(2).toBeEvenNumber();
      expect(4).toBeEvenNumber();

      expect(1).not.toBeEvenNumber();
      expect(3).not.toBeEvenNumber();
      expect(5).not.toBeEvenNumber();
      expect('2').not.toBeEvenNumber();
    });
  });

  describe('toBePositive', () => {
    it('should pass', () => {
      expect(1).toBePositive();

      expect(-1).not.toBePositive();
      expect(0).not.toBePositive();
    });
  });

  describe('toBeNegative', () => {
    it('should pass', () => {
      expect(-1).toBeNegative();

      expect(1).not.toBeNegative();
      expect(0).not.toBeNegative();
    });
  });

  describe('toBeNumeric', () => {
    it('should pass', () => {
      expect(1).toBeNumeric();
      expect('1').toBeNumeric();

      expect(-1).toBeNumeric();
      expect('-1').toBeNumeric();

      expect(0).toBeNumeric();
      expect('0').toBeNumeric();

      expect(1.5).toBeNumeric();
      expect('1.5').toBeNumeric();

      expect('foo').not.toBeNumeric();
      expect(true).not.toBeNumeric();
    });
  });

  describe('toBeInteger', () => {
    it('should pass', () => {
      expect(1).toBeInteger();
      expect(1.0).toBeInteger();
      expect('1').toBeNumeric();
      expect('1.0').toBeNumeric();

      expect(1.5).not.toBeInteger();
    });
  });

  describe('toBeFloat', () => {
    it('should pass', () => {
      expect(1.5).toBeFloat();
      expect('1.5').toBeFloat();

      expect(1.0).not.toBeFloat();
      expect('1.0').not.toBeFloat();
      expect(1).not.toBeFloat();
      expect('1').not.toBeFloat();
    });
  });

  describe('toBeAFunction', () => {
    it('should pass', () => {
      const myFunc = () => {};
      expect(myFunc).toBeAFunction();

      expect(0).not.toBeAFunction();
      expect(null).not.toBeAFunction();
    });
  });

  describe('toBeInstanceOf', () => {
    it('should pass', () => {
      const value = new Klass();

      expect(value).toBeInstanceOf(Klass);
      expect(null).not.toBeInstanceOf(Klass);
      expect(undefined).not.toBeInstanceOf(Klass);

      expect(1).not.toBeInstanceOf(Klass);
      expect('foo').not.toBeInstanceOf(Klass);
    });
  });

  describe('toHaveKeys', () => {
    it('should pass', () => {
      const obj = {id: 1, name: 'foo'};
      expect(obj).toHaveKeys('id', 'name');
      expect(obj).not.toHaveKeys('foo', 'bar');
    });
  });

  describe('toHaveFunctions', () => {
    it('should pass', () => {
      const obj = {
        id: 1,
        name: 'foo',
        foo: jasmine.createSpy('foo'),
        bar: jasmine.createSpy('bar'),
      };

      expect(obj).toHaveFunctions('foo', 'bar');
      expect(obj).not.toHaveFunctions('id', 'name');
    });
  });

  describe('toHaveValues', () => {
    it('should pass', () => {
      const obj = {
        id: 1,
        name: 'foo',
        array: [1, 2, 3],
        o: {
          id: 10,
        },
      };

      expect(obj).toHaveValues(1, 'foo', [1, 2, 3], {id: 10});
      expect(obj).not.toHaveValues(2, 'bar');
      expect(obj).not.toHaveValues({id: 11});
    });
  });

  describe('toBeADate', () => {
    it('should pass', () => {
      expect(new Date()).toBeADate();

      expect(null).not.toBeADate();
      expect(123).not.toBeADate();
    });
  });

  describe('toVerify', () => {
    it('should pass', () => {
      const iterator = (item) => item % 2 === 0;
      expect([2, 4, 6, 8]).toVerify(iterator);
      expect([2, 4, 6, 8, 9]).not.toVerify(iterator);
    });

    it('should pass with a custom message', () => {
      const message = 'foo bar';
      const iterator = (item) => item % 2 === 0;

      expect([2, 4, 6, 8]).toVerify(message, iterator);
      expect([2, 4, 6, 8, 9]).not.toVerify(message, iterator);
    });
  });

  describe('toHaveSome', () => {
    it('should pass', () => {
      const iterator = (item) => item % 2 === 0;
      expect([1, 2, 3]).toHaveSome(iterator);
      expect([1, 3, 5, 7]).not.toHaveSome(iterator);
    });
  });

  describe('toBeDateCloseTo', () => {
    it('should pass', () => {
      const date1 = new Date(2014, 6, 6, 10, 0, 0, 0);
      const date2 = new Date(2014, 6, 6, 10, 0, 0, 1000);

      expect(date1).toBeDateCloseTo(date2, 1000);
      expect(date1).toBeDateCloseTo(date2);
      expect(date1).not.toBeDateCloseTo(date2, 999);
    });
  });

  describe('toBeDateCloseToNow', () => {
    it('should pass', () => {
      const date = new Date(new Date().getTime() + 900);

      expect(date).toBeDateCloseToNow(1000);
      expect(date).toBeDateCloseToNow();
      expect(date).not.toBeDateCloseToNow(890);
    });
  });

  describe('toBeDateAfter', () => {
    it('should pass', () => {
      const date1 = new Date(new Date().getTime() + 1000);
      const date2 = new Date(new Date().getTime() + 2000);

      expect(date2).toBeDateAfterNow();
      expect(date2).toBeDateAfter(date1);
      expect(date1).not.toBeDateAfter(date2);
    });
  });

  describe('toBeDateBefore', () => {
    it('should pass', () => {
      const date1 = new Date(new Date().getTime() - 2000);
      const date2 = new Date(new Date().getTime() - 1000);

      expect(date1).toBeDateBeforeNow();
      expect(date1).toBeDateBefore(date2);
      expect(date2).not.toBeDateBefore(date1);
    });
  });

  describe('toBeSameDay', () => {
    it('should pass with dates', () => {
      const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
      const date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
      const date3 = new Date(2014, 5, 6, 10, 0, 0, 0);

      expect(date1).toBeSameDay(date2);
      expect(date1).not.toBeSameDay(date3);
    });

    it('should pass with strings', () => {
      const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);

      expect(date1).toBeSameDay('2014-06-05');
      expect(date1).not.toBeSameDay('2014-06-06');
    });
  });

  describe('toBeToday', () => {
    it('should pass', () => {
      const date1 = new Date();
      const date2 = new Date();
      date2.setDate(date1.getDate() - 1);

      expect(date1).toBeToday();
      expect(date2).not.toBeToday();
    });
  });

  describe('toBeABoolean', () => {
    it('should pass', () => {
      expect(true).toBeABoolean();
      expect(false).toBeABoolean();

      expect(0).not.toBeABoolean();
      expect(null).not.toBeABoolean();
      expect(undefined).not.toBeABoolean();
      expect('').not.toBeABoolean();
    });
  });

  describe('toBeTrue', () => {
    it('should pass', () => {
      expect(true).toBeTrue();

      expect(false).not.toBeTrue();
      expect(0).not.toBeTrue();
      expect(null).not.toBeTrue();
      expect(undefined).not.toBeTrue();
      expect('').not.toBeTrue();
    });
  });

  describe('toBeFalse', () => {
    it('should pass', () => {
      expect(false).toBeFalse();

      expect(true).not.toBeFalse();
      expect(0).not.toBeFalse();
      expect(null).not.toBeFalse();
      expect(undefined).not.toBeFalse();
      expect('').not.toBeFalse();
    });
  });

  describe('toBeInRange', () => {
    it('should pass', () => {
      expect(2).toBeInRange(1, 3);

      expect(1).not.toBeInRange(1, 3);
      expect(3).not.toBeInRange(1, 3);
    });
  });

  describe('toBeSorted', () => {
    it('should pass with an array of numbers', () => {
      expect([0, 1, 2, 3]).toBeSorted();
      expect([0, 1, 3, 2]).not.toBeSorted();
    });

    it('should pass with an array of strings', () => {
      expect(['bar', 'foo']).toBeSorted();
      expect(['foo', 'bar']).not.toBeSorted();
    });

    it('should pass with an array of booleans', () => {
      expect([false, false, true, true]).toBeSorted();
      expect([true, true, false, false]).not.toBeSorted();
    });

    it('should pass with an array of object sorted by id', () => {
      const comparator = (obj1, obj2) => obj1.id - obj2.id;

      const obj1 = {id: 1};
      const obj2 = {id: 2};
      const obj3 = {id: 3};

      expect([obj1, obj2, obj3]).toBeSorted(comparator);
      expect([obj3, obj2, obj1]).not.toBeSorted(comparator);
    });

    it('should pass with an array of object sorted by id with same ids', () => {
      const comparator = (obj1, obj2) => obj1.id - obj2.id;

      const obj1 = {id: 1};
      const obj21 = {id: 2, name: 'foo'};
      const obj22 = {id: 2, name: 'bar'};
      const obj3 = {id: 3};

      for (let i = 0; i < 100; ++i) {
        expect([obj1, obj21, obj22, obj3]).toBeSorted(comparator);
        expect([obj1, obj22, obj21, obj3]).toBeSorted(comparator);
      }
    });

    it('should pass with an array with custom properties', () => {
      const array = [0, 1, 2, 3];

      array.$prop = true;

      expect(array).toBeSorted();
    });
  });

  describe('toContainsOnlyTruthyValues', () => {
    it('should pass', () => {
      expect([1, 2, true, 'foo', {}, []]).toContainsOnlyTruthyValues();

      expect([1, 2, false, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
      expect([1, 2, true, '', {}, []]).not.toContainsOnlyTruthyValues();
      expect([0, 2, true, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
    });
  });

  describe('toContainsOnlyFalsyValues', () => {
    it('should pass', () => {
      expect([0, false, null, undefined, '']).toContainsOnlyFalsyValues();

      expect([1, false, null, undefined, '']).not.toContainsOnlyFalsyValues();
      expect([0, true, null, undefined, '']).not.toContainsOnlyFalsyValues();
      expect([0, false, {}, undefined, '']).not.toContainsOnlyFalsyValues();
      expect([0, false, null, [], '']).not.toContainsOnlyFalsyValues();
      expect([0, false, null, undefined, 'foo']).not.toContainsOnlyFalsyValues();
    });
  });

  describe('toContainsDistinctValues', () => {
    it('should pass with an array of integers', () => {
      expect([0, 1, 2, 3]).toContainsDistinctValues();
      expect([0, 1, 2, 3, 0]).not.toContainsDistinctValues();
    });

    it('should pass with an array of strings', () => {
      expect(['true', 'false']).toContainsDistinctValues();
      expect(['true', 'false', 'false']).not.toContainsDistinctValues();
    });

    it('should pass with an array of booleans', () => {
      expect([true, false]).toContainsDistinctValues();
      expect([true, false, false]).not.toContainsDistinctValues();
    });

    it('should pass with an array of booleans', () => {
      expect([true, false]).toContainsDistinctValues();
      expect([true, false, false]).not.toContainsDistinctValues();
    });

    it('should pass with an array of objects', () => {
      const obj1 = {id: 1};
      const obj21 = {id: 2};
      const obj22 = {id: 2};
      const obj3 = {id: 3};

      expect([obj1, obj21, obj3]).toContainsDistinctValues();
      expect([obj1, obj21, obj3, obj22]).not.toContainsDistinctValues();
    });
  });

  describe('toBePartiallyEqualTo', () => {
    it('should pass with objects', () => {
      const a = {id: 1, foo: 'bar', bar: 'foo'};
      const b = {id: 1, foo: 'bar'};
      const c = {id: 2};

      expect(a).toBePartiallyEqualTo(b);
      expect(a).not.toBePartiallyEqualTo(c);

      // Deprecated matcher
      spyOn(console, 'warn');

      expect(a).toBePartiallyEqualsTo(b);
      expect(a).not.toBePartiallyEqualsTo(c);

      expect(console.warn).toHaveBeenCalled();
    });

    it('should pass with arrays', () => {
      const a1 = {id: 1, foo: 'bar'};
      const a2 = {id: 2, foo: 'bar'};

      const b1 = {id: 1};
      const b2 = {id: 2};

      const c1 = {id: 2};
      const c2 = {id: 2};

      const array1 = [a1, a2];
      const array2 = [b1, b2];
      const array3 = [c1, c2];

      expect(array1).toBePartiallyEqualTo(array2);
      expect(array1).not.toBePartiallyEqualTo(array3);

      // Deprecated matcher
      spyOn(console, 'warn');

      expect(array1).toBePartiallyEqualsTo(array2);
      expect(array1).not.toBePartiallyEqualsTo(array3);

      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('toContainsDistinctValues', () => {

  });

  describe('toHaveBeenCalledOnce', () => {
    it('should pass', () => {
      const spy = jasmine.createSpy('foo');
      expect(spy).not.toHaveBeenCalledOnce();

      spy();
      expect(spy).toHaveBeenCalledOnce();

      spy();
      expect(spy).not.toHaveBeenCalledOnce();
    });
  });

  describe('toHaveBeenCalledOnceWith', () => {
    it('should pass', () => {
      const spy = jasmine.createSpy('foo');
      expect(spy).not.toHaveBeenCalledOnce();

      spy('foo');
      expect(spy).toHaveBeenCalledOnceWith('foo');
      expect(spy).not.toHaveBeenCalledOnceWith('bar');

      spy();
      expect(spy).not.toHaveBeenCalledOnce();
    });
  });
});
