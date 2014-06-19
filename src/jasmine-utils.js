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

(function(undefined) {

  var toString = Object.prototype.toString;

  var isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  var isNumber = function(obj) {
    return typeof obj === 'number';
  };

  var isString = function(obj) {
    return typeof obj === 'string';
  };

  var isBoolean = function(obj) {
    return typeof obj === 'boolean';
  };

  var isFunction = function(obj) {
    return typeof obj === 'function';
  };

  var isDate = function(obj) {
    return toString.call(obj) === '[object Date]';
  };

  var isObject = function(obj) {
    return typeof obj === 'object';
  };

  var isInstanceOf = function(obj, Klass) {
    return obj instanceof Klass;
  };

  var keys = function(obj) {
    var ks = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        ks.push(i);
      }
    }
    return ks;
  };

  var indexOfStrict = function(array, obj) {
    for (var i = 0, size = array.length; i < size; ++i) {
      if (array[i] === obj) {
        return i;
      }
    }
    return -1;
  };

  var containsStrict = function(array, obj) {
    return indexOfStrict(array, obj) >= 0;
  };

  var every = function(array, iterator, ctx) {
    for (var i = 0, size = array.length; i < size; ++i) {
      if (!iterator.call(ctx, array[i], i)) {
        return false;
      }
    }
    return true;
  };

  var some = function(array, iterator, ctx) {
    for (var i = 0, size = array.length; i < size; ++i) {
      if (iterator.call(ctx, array[i], i)) {
        return true;
      }
    }
    return false;
  };

  var sizeOfObject = function(obj) {
    var nbKeys = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        nbKeys++;
      }
    }
    return nbKeys;
  };

  var dateDiff = function(d1, d2) {
    var t1 = isDate(d1) ? d1.getTime() : d1;
    var t2 = isDate(d2) ? d2.getTime() : d2;
    return t1 - t2;
  };

  var dateAbsDiff = function(d1, d2) {
    return Math.abs(dateDiff(d1, d2));
  };

  var pp = function(message) {
    var placeholders = [].slice.call(arguments, 1);
    for (var i = 0, size = placeholders.length; i < size; ++i) {
      if (placeholders.hasOwnProperty(i)) {
        message = message.replace('{{%' + i + '}}', jasmine.pp(placeholders[i]));
      }
    }
    return message;
  };

  var equals = function(arg1, arg2) {
    this.env.equals_(arg1, arg2);
  };

  var matchers = {
    toHaveKeys: function() {
      var actualKeys = keys(this.actual);
      var ks = [].slice.call(arguments);

      var error = false;
      for (var i = 0, size = ks.length; i < ks.length; ++i) {
        if (!containsStrict(actualKeys, ks[i])) {
          error = true;
          break;
        }
      }

      return error ? pp('Expect object {{%0}} to contain keys {{%1}}', this.actual, ks) : null;
    },

    toHaveSize: function(expectedSize) {
      var size = isArray(this.actual) ? this.actual.length : sizeOfObject(this.actual);
      return size !== expectedSize ? pp('Expect size of {{%0}} {{not}}to be {{%1}} but was {{%2}}', this.actual, expectedSize, size) : null;
    },

    toBeEmpty: function() {
      var size = -1;
      var actual = this.actual;
      if (actual === null || actual === undefined) {
        size = 0;
      } else if (isString(actual) || isArray(actual)) {
        size = actual.length;
      } else if (isObject(actual) && actual !== null) {
        size = sizeOfObject(actual);
      }
      return size === 0 ? null : pp('Expect {{%0}} {{not}} to be empty', actual);
    },

    toHaveLength: function(expectedLength) {
      var length = this.actual.length;
      return length !== expectedLength ? pp('Expect length of {{%0}} {{not}} to be {{%1}} but was {{%2}}', this.actual, expectedLength, length) : null;
    },

    toBeAnArray: function() {
      return isArray(this.actual) ? null : pp('Expect {{%0}} {{not}} to be an array', this.actual);
    },

    toBeADate: function() {
      return isDate(this.actual) ? null : pp('Expect {{%0}} {{not}} to be a date', this.actual);
    },

    toBeDateCloseTo: function(date, maxDiff) {
      var max = arguments.length > 1 ? maxDiff : 1000;
      var diff = dateAbsDiff(this.actual, date);
      return diff > max ? pp('Expect date {{%0}} {{not}} to be close to {{%1}}', this.actual, date) : null;
    },

    toBeDateCloseToNow: function(maxDiff) {
      var max = arguments.length > 0 ? maxDiff : 1000;
      var diff = dateAbsDiff(this.actual, new Date());
      return diff > max ? pp('Expect date {{%0}} {{not}} to be close to now', this.actual) : null;
    },

    toBeDateAfter: function(lower) {
      return dateDiff(this.actual, lower) < 0 ? pp('Expect date {{%0}} {{not}} to be after {{%1}}', this.actual, lower) : null;
    },

    toBeDateAfterNow: function() {
      return dateDiff(this.actual, new Date()) < 0 ? pp('Expect date {{%0}} {{not}} to be after now', this.actual) : null;
    },

    toBeDateBefore: function(upper) {
      return dateDiff(this.actual, upper) > 0 ? pp('Expect date {{%0}} {{not}} to be before {{%1}}', this.actual, upper) : null;
    },

    toBeDateBeforeNow: function() {
      return dateDiff(this.actual, new Date()) > 0 ? pp('Expect date {{%0}} {{not}} to be before now', this.actual) : null;
    },

    toBeNull: function() {
      return this.actual === null ? null : pp('Expect {{%0}} {{not}} to be null', this.actual);
    },

    toBeANumber: function() {
      return isNumber(this.actual) ? null : pp('Expect {{%0}} {{not}} to be a number', this.actual);
    },

    toBeABoolean: function() {
      return isBoolean(this.actual) ? null : pp('Expect {{%0}} {{not}} to be a boolean', this.actual);
    },

    toBeTrue: function() {
      return this.actual === true ? null : pp('Expect {{%0}} {{not}} to be true', this.actual);
    },

    toBeFalse: function() {
      return this.actual === false ? null : pp('Expect {{%0}} {{not}} to be false', this.actual);
    },

    toBeAString: function() {
      return isString(this.actual) ? null : pp('Expect {{%0}} {{not}} to be a string', this.actual);
    },

    toBeAnEmptyString: function() {
      return isString(this.actual) && this.actual === '' ? null : pp('Expect {{%0}} {{not}} to be an empty string', this.actual);
    },

    toBeAFunction: function() {
      return isFunction(this.actual) ? null : pp('Expect {{%0}} {{not}} to be a function', this.actual);
    },

    toBeInstanceOf: function(Klass) {
      return isInstanceOf(this.actual, Klass) ? null : pp('Expect {{%0}} {{not}} to be an instance of {{%1}}', this.actual, Klass);
    },

    toBeZero: function() {
      return this.actual === 0 ? null : pp('Expect {{%0}} {{not}} to be zero', this.actual);
    },

    toBePositive: function() {
      return isNumber(this.actual) && this.actual > 0 ? null : pp('Expect {{%0}} {{not}} to be a positive number', this.actual);
    },

    toBeNegative: function() {
      return isNumber(this.actual) && this.actual < 0 ? null : pp('Expect {{%0}} {{not}} to be a negative number', this.actual);
    },

    toBeOddNumber: function() {
      return isNumber(this.actual) && this.actual % 2 !== 0 ? null : pp('Expect {{%0}} {{not}} to be a odd number', this.actual);
    },

    toBeEvenNumber: function() {
      return isNumber(this.actual) && this.actual % 2 === 0 ? null : pp('Expect {{%0}} {{not}} to be a odd number', this.actual);
    },

    toVerify: function(iterator) {
      return every(this.actual, iterator) ? null : pp('Expect {{%0}} {{not}} to verify condition');
    },

    toHaveSome: function(iterator) {
      return some(this.actual, iterator) ? null : pp('Expect {{%0}} {{not}} to have at least one element that verify condition');
    }
  };

  // Check version
  var version = jasmine.version_.major;

  var jasmineMatchers = {};

  var toMatcherJasmine1 = function(fn) {
    return function() {
      var ctx = {
        actual: this.actual,
        isNot: this.isNot
      };

      var message = fn.apply(ctx, arguments);

      var isNot = this.isNot;
      var notKey = isNot ? '{{not}}' : '{{not}} ';
      var notValue = isNot ? 'not' : '';

      if (message) {
        this.message = function() {
          return message.replace(notKey, notValue);
        };
      }

      return !message;
    };
  };

  if (version === 1) {
    for (var matcher in matchers) {
      if (matchers.hasOwnProperty(matcher)) {
        jasmineMatchers[matcher] = toMatcherJasmine1(matchers[matcher]);
      }
    }
  }

  if (version === 2) {
    // TODO
  }

  beforeEach(function() {
    this.addMatchers(jasmineMatchers);
  });

})(void 0);
