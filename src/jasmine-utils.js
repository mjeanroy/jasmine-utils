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

  var trim = function (str) {
    if (String.prototype.trim) {
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g, '');
    }
  };

  var isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  var isNumber = function(obj) {
    return toString.call(obj) === '[object Number]';
  };

  var isString = function(obj) {
    return toString.call(obj) === '[object String]';
  };

  var isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  var isFunction = function(obj) {
    return toString.call(obj) === '[object Function]';
  };

  var isDate = function(obj) {
    return toString.call(obj) === '[object Date]';
  };

  var isObject = function(obj) {
    return typeof obj === 'object';
  };

  var isInstanceOf = function(obj, Klass) {
    return obj !== undefined && obj !== null && obj instanceof Klass;
  };

  var isTruthy = function(obj) {
    return !!obj;
  };

  var isFalsy = function(obj) {
    return !obj;
  };

  var isDOMElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  var isNodeList = function(obj) {
    return toString.call(obj) === '[object NodeList]';
  };

  var isArraylike = function(obj) {
    if (isArray(obj)) {
      return true;
    }

    if (isNodeList(obj)) {
      return true;
    }

    if (isFunction(obj) && obj !== window) {
        return false;
    }

    if (isDOMElement(obj) && obj.length) {
        return true;
    }

    var length = obj.length;
    return length === 0 || isNumber(length) && length > 0 && (length - 1) in obj;
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

  var values = function(obj) {
    var vals = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        vals.push(obj[i]);
      }
    }
    return vals;
  };

  var strictEquals = function(a, b) {
    return a === b;
  };

  var indexOf = function(array, obj, equalsFunction) {
    var areEquals = equalsFunction || strictEquals;
    for (var i = 0, size = array.length; i < size; ++i) {
      if (areEquals(array[i], obj)) {
        return i;
      }
    }
    return -1;
  };

  var contains = function(array, obj, equalsFunction) {
    return indexOf(array, obj, equalsFunction) >= 0;
  };

  var mapBy = function (array, iterator, ctx) {
    var newArray = [];
    for (var i = 0, size = array.length; i < size; ++i) {
      newArray[i] = iterator.call(ctx, array[i], i);
    }
    return newArray;
  };

  var filterBy = function (array, iterator, ctx) {
    var newArray = [];
    for (var i = 0, size = array.length; i < size; ++i) {
      if (iterator.call(ctx, array[i], i)) {
        newArray.push(array[i]);
      }
    }
    return newArray;
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
    return keys(obj).length;
  };

  var dateDiff = function(d1, d2) {
    var t1 = isDate(d1) ? d1.getTime() : d1;
    var t2 = isDate(d2) ? d2.getTime() : d2;
    return t1 - t2;
  };

  var dateAbsDiff = function(d1, d2) {
    return Math.abs(dateDiff(d1, d2));
  };

  var countOccurence = function(array, occ, from, equalsFunction) {
    var areEquals = equalsFunction || function(obj1, obj2) {
      return obj1 === obj2;
    };

    var count = 0;
    for (var i = from, size = array.length; i < size; ++i) {
      if (equalsFunction(array[i], occ)) {
        count++;
      }
    }
    return count;
  };

  var containsDistinct = function(array, equalsFunction) {
    return every(array, function(item, idx) {
      return countOccurence(array, item, idx, equalsFunction) <= 1;
    });
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

  var isSorted = function(array, equalsFunction, comparator) {
    if (array.length <= 1) {
      return true;
    }

    var clone = array.slice();
    clone.sort(comparator);

    for (var i = 0, size = clone.length; i < size; ++i) {
      if (!equalsFunction(clone[i], array[i])) {
        return false;
      }
    }

    return true;
  };

  var sizeOf = function(obj) {
    var size = -1;
    if (obj === null || obj === undefined) {
      size = 0;
    } else if (isString(obj) || isArraylike(obj)) {
      size = obj.length;
    } else if (isObject(obj)) {
      size = sizeOfObject(obj);
    }
    return size;
  };

  var isSameDay = function(date1, date2) {
    var d1 = isDate(date1) ? date1 : new Date(date1);
    var d2 = isDate(date2) ? date2 : new Date(date2);
    var isSameYear = d1.getFullYear() === d2.getFullYear();
    var isSameMonth = d1.getMonth() === d2.getMonth();
    var isSameDate = d1.getDate() === d2.getDate();
    return isSameYear && isSameMonth && isSameDate;
  };

  var isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var isInteger = function(n) {
    return isNumeric(n) && n % 1 === 0;
  };

  var matchers = {
    toHaveKeys: function() {
      var actualKeys = keys(this.actual);
      var ks = [].slice.call(arguments);

      var ok = true;
      for (var i = 0, size = ks.length; i < size; ++i) {
        if (!contains(actualKeys, ks[i])) {
          ok = false;
          break;
        }
      }

      return {
        pass: ok,
        message: pp('Expect object {{%0}} {{not}} to contain keys {{%1}}', this.actual, ks)
      };
    },

    toHaveFunctions: function() {
      var actual = this.actual;
      var methods = [].slice.call(arguments);
      var ok = true;
      for (var i = 0, size = methods.length; i < size; ++i) {
        if (!isFunction(actual[methods[i]])) {
          ok = false;
        }
      }

      return {
        pass: ok,
        message: pp('Expect object {{%0}} {{not}} to contain functions {{%1}}', actual, methods)
      };
    },

    toHaveValues: function() {
      var actualValues = values(this.actual);
      var vals = [].slice.call(arguments);

      var ok = true;
      for (var i = 0, size = vals.length; i < size; ++i) {
        if (!contains(actualValues, vals[i], this.equals)) {
          ok = false;
          break;
        }
      }

      return {
        pass: ok,
        message: pp('Expect object {{%0}} {{not}} to contain values {{%1}}', this.actual, vals)
      };
    },

    toHaveSize: function(expectedSize) {
      var size = sizeOf(this.actual);
      return {
        pass: size === expectedSize,
        message: pp('Expect size of {{%0}} {{not}} to be {{%1}} but was {{%2}}', this.actual, expectedSize, size)
      };
    },

    toBeEmpty: function() {
      var size = sizeOf(this.actual);
      return {
        pass: size === 0,
        message: pp('Expect {{%0}} {{not}} to be empty', this.actual)
      };
    },

    toHaveLength: function(expectedLength) {
      var length = this.actual.length;
      return {
        pass: length === expectedLength,
        message: pp('Expect length of {{%0}} {{not}} to be {{%1}} but was {{%2}}', this.actual, expectedLength, length)
      };
    },

    toHaveSameLengthAs: function(expected) {
      var length = this.actual.length;
      var expectedLength = expected.length;
      return {
        pass: length === expectedLength,
        message: pp('Expect length of {{%0}} {{not}} to be {{%1}} but was {{%2}}', this.actual, expectedLength, length)
      };
    },

    toHaveSameSizeAs: function(expected) {
      var size = sizeOf(this.actual);
      var expectedSize = sizeOf(expected);
      return {
        pass: size === expectedSize,
        message: pp('Expect length of {{%0}} {{not}} to be {{%1}} but was {{%2}}', this.actual, expectedSize, size)
      };
    },

    toBeAnArray: function() {
      return {
        pass: isArray(this.actual),
        message: pp('Expect {{%0}} {{not}} to be an array', this.actual)
      };
    },

    toBeADate: function() {
      return {
        pass: isDate(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a date', this.actual)
      };
    },

    toBeDateCloseTo: function(date, maxDiff) {
      var max = arguments.length > 1 ? maxDiff : 1000;
      var diff = dateAbsDiff(this.actual, date);
      return {
        pass: diff <= max,
        message: pp('Expect date {{%0}} {{not}} to be close to {{%1}}', this.actual, date)
      };
    },

    toBeDateCloseToNow: function(maxDiff) {
      var max = arguments.length > 0 ? maxDiff : 1000;
      var diff = dateAbsDiff(this.actual, new Date());
      return {
        pass: diff <= max,
        message: pp('Expect date {{%0}} {{not}} to be close to now', this.actual)
      };
    },

    toBeDateAfter: function(lower) {
      return {
        pass: dateDiff(this.actual, lower) >= 0,
        message: pp('Expect date {{%0}} {{not}} to be after {{%1}}', this.actual, lower)
      };
    },

    toBeDateAfterNow: function() {
      return {
        pass: dateDiff(this.actual, new Date()) >= 0,
        message: pp('Expect date {{%0}} {{not}} to be after now', this.actual)
      };
    },

    toBeDateBefore: function(upper) {
      return {
        pass: dateDiff(this.actual, upper) <= 0,
        message: pp('Expect date {{%0}} {{not}} to be before {{%1}}', this.actual, upper)
      };
    },

    toBeDateBeforeNow: function() {
      return {
        pass: dateDiff(this.actual, new Date()) <= 0,
        message: pp('Expect date {{%0}} {{not}} to be before now', this.actual)
      };
    },

    toBeSameDay: function(day) {
      return {
        pass: isSameDay(this.actual, day),
        message: pp('Expect date {{%0}} {{not}} to be same day as {{%1}}', new Date(this.actual), new Date(day))
      };
    },

    toBeToday: function() {
      return {
        pass: isSameDay(this.actual, new Date()),
        message: pp('Expect date {{%0}} {{not}} to be today', new Date(this.actual), new Date())
      };
    },

    toBeNull: function() {
      return {
        pass: this.actual === null,
        message: pp('Expect {{%0}} {{not}} to be null', this.actual)
      };
    },

    toBeANumber: function() {
      return {
        pass: isNumber(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a number', this.actual)
      };
    },

    toBeABoolean: function() {
      return {
        pass: isBoolean(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a boolean', this.actual)
      };
    },

    toBeTrue: function() {
      return {
        pass: this.actual === true,
        message: pp('Expect {{%0}} {{not}} to be true', this.actual)
      };
    },

    toBeFalse: function() {
      return {
        pass: this.actual === false,
        message: pp('Expect {{%0}} {{not}} to be false', this.actual)
      };
    },

    toBeAString: function() {
      return {
        pass: isString(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a string', this.actual)
      };
    },

    toBeAnEmptyString: function() {
      return {
        pass: isString(this.actual) && this.actual === '',
        message: pp('Expect {{%0}} {{not}} to be an empty string', this.actual)
      };
    },

    toEqualIgnoringCase: function(string) {
      return {
        pass: isString(string) && isString(this.actual) && this.actual.toLowerCase() === string.toLowerCase(),
        message: pp('Expect {{%0}} {{not}} to be equal to {{%1}} (case insensitive)', this.actual, string)
      };
    },

    toStartWith: function(prefix) {
      return {
        pass: isString(prefix) && isString(this.actual) && this.actual.indexOf(prefix) === 0,
        message: pp('Expect {{%0}} {{not}} to start with {{%1}}', this.actual, prefix)
      };
    },

    toEndWith: function(suffix) {
      return {
        pass: isString(suffix) && isString(this.actual) && this.actual.indexOf(suffix, this.actual.length - suffix.length) !== -1,
        message: pp('Expect {{%0}} {{not}} to end with {{%1}}', this.actual, suffix)
      };
    },

    toBeAFunction: function() {
      return {
        pass: isFunction(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a function', this.actual)
      };
    },

    toBeDOMElement: function(tagName) {
      var msg = 'Expect {{%0}} {{not}} to be a dom element';

      var isElement = isDOMElement(this.actual);

      var arg1 = '';
      var arg2 = '';
      if (arguments.length === 1) {
        msg = 'Expect {{%0}} {{not}} to be {{%1}} element';
        arg1 = tagName.toUpperCase();
        if (isElement) {
          msg += ' but was {{%2}}';
          arg2 = this.actual.tagName.toUpperCase();
        }
      }

      return {
        pass: isElement && (!tagName || tagName.toUpperCase() === this.actual.tagName.toUpperCase()),
        message: pp(msg, this.actual, arg1, arg2)
      };
    },

    toBeDOMElementWithId: function(id) {
      var msg = 'Expect {{%0}} {{not}} to be a dom element';

      var isElement = isDOMElement(this.actual);
      var actualId = '';
      if (isElement) {
        msg += ' with id {{%1}} but was {{%2}}';
        actualId = this.actual.getAttribute('id');
      }

      return {
        pass: isElement && actualId === id,
        message: pp(msg, this.actual, id, actualId)
      };
    },

    toBeDOMElementWithAttributes: function(attributes) {
      var equalsFunction = this.equals;
      var msg = 'Expect {{%0}} {{not}} to be a dom element';

      var isElement = isDOMElement(this.actual);
      var actualAttributes = {};
      if (isElement) {
        var attrs = keys(attributes);
        for (var i = 0, size = attrs.length; i < size; ++i) {
          var key = attrs[i];
          actualAttributes[key] = this.actual.getAttribute(key);
        }

        msg += ' with attributes {{%1}} but was {{%2}}';
      }

      return {
        pass: isElement && equalsFunction(attributes, actualAttributes),
        message: pp(msg, this.actual, attributes, actualAttributes)
      };
    },

    toBeDOMElementWithClasses: function(classes) {
      var toClassArray = function (classes) {
        var array = isArray(classes) ? classes : classes.split(' ');

        array = mapBy(array, function (className) {
          return trim(className);
        });

        return filterBy(array, function (className) {
          return className !== '';
        });
      };

      var classArray = toClassArray(classes);
      var msg = 'Expect {{%0}} {{not}} to be a dom element';

      var isElement = isDOMElement(this.actual);
      var containsAll = false;
      var actualClassArray = [];
      if (isElement) {
        msg += ' with classes {{%1}} but was {{%2}}';
        actualClassArray = toClassArray(this.actual.className);

        // Check that every classes is inside real classes
        containsAll = every(classArray, function (className) {
          return contains(actualClassArray, className);
        });
      }

      return {
        pass: isElement && containsAll,
        message: pp(msg, this.actual, classArray, actualClassArray)
      };
    },

    toBeInstanceOf: function(Klass) {
      return {
        pass: isInstanceOf(this.actual, Klass),
        message: pp('Expect {{%0}} {{not}} to be an instance of {{%1}}', this.actual, Klass)
      };
    },

    toBeZero: function() {
      return {
        pass: this.actual === 0,
        message: pp('Expect {{%0}} {{not}} to be zero', this.actual)
      };
    },

    toBePositive: function() {
      return {
        pass: isNumber(this.actual) && this.actual > 0,
        message: pp('Expect {{%0}} {{not}} to be a positive number', this.actual)
      };
    },

    toBeNegative: function() {
      return {
        pass: isNumber(this.actual) && this.actual < 0,
        message: pp('Expect {{%0}} {{not}} to be a negative number', this.actual)
      };
    },

    toBeOddNumber: function() {
      return {
        pass: isNumber(this.actual) && this.actual % 2 !== 0,
        message: pp('Expect {{%0}} {{not}} to be an odd number', this.actual)
      };
    },

    toBeEvenNumber: function() {
      return {
        pass: isNumber(this.actual) && this.actual % 2 === 0,
        message: pp('Expect {{%0}} {{not}} to be an even number', this.actual)
      };
    },

    toBeNumeric: function() {
      return {
        pass: isNumeric(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a numeric value', this.actual)
      };
    },

    toBeInteger: function() {
      return {
        pass: isNumeric(this.actual) && isInteger(this.actual),
        message: pp('Expect {{%0}} {{not}} to be an integer', this.actual)
      };
    },

    toBeFloat: function() {
      return {
        pass: isNumeric(this.actual) && !isInteger(this.actual),
        message: pp('Expect {{%0}} {{not}} to be a float', this.actual)
      };
    },

    toBeInRange: function(lower, upper) {
      return {
        pass: isNumber(this.actual) && this.actual > lower && this.actual < upper,
        message: pp('Expect {{%0}} {{not}} to be between {{%1}} and {{%2}}', this.actual, lower, upper)
      };
    },

    toBeSorted: function(comparator) {
      return {
        pass: isArray(this.actual) && isSorted(this.actual, this.equals, comparator),
        message: pp('Expect {{%0}} {{not}} to be sorted', this.actual)
      };
    },

    toVerify: function(message, iterator) {
      var $message = isFunction(message) ? 'condition' : '"' + message + '"';
      var $iterator = isFunction(message) ? message : iterator;
      return {
        pass: every(this.actual, $iterator),
        message: pp('Expect {{%0}} {{not}} to verify ' + $message, this.actual)
      };
    },

    toContainsDistinctValues: function() {
      return {
        pass: isArray(this.actual) && containsDistinct(this.actual, this.equals),
        message: pp('Expect {{%0}} {{not}} to contains only distinct values', this.actual)
      };
    },

    toContainsOnlyTruthyValues: function() {
      return {
        pass: isArray(this.actual) && every(this.actual, isTruthy),
        message: pp('Expect {{%0}} {{not}} to contains only truthy values', this.actual)
      };
    },

    toContainsOnlyFalsyValues: function() {
      return {
        pass: isArray(this.actual) && every(this.actual, isFalsy),
        message: pp('Expect {{%0}} {{not}} to contains only falsy values', this.actual)
      };
    },

    toHaveSome: function(iterator) {
      return {
        pass: some(this.actual, iterator),
        message: pp('Expect {{%0}} {{not}} to have at least one element that verify condition')
      };
    },

    toBePartiallyEqualTo: function(obj) {
      var actual = this.actual;
      var equalsFunction = this.equals;

      var checkArray = function(a, b) {
        if (a.length !== b.length) {
          return false;
        }

        return every(b, function(current, i) {
          return equalsFunction(a[i], jasmine.objectContaining(current));
        });
      };

      var checkObject = function(a, b) {
        return equalsFunction(a, jasmine.objectContaining(b));
      };

      var pass = false;

      if (isArray(obj) && isArray(actual)) {
        pass = checkArray(actual, obj);
      } else if (isObject(obj) && isObject(actual)) {
        pass = checkObject(actual, obj);
      }

      return {
        pass: pass,
        message: pp('Expect {{%0}} {{not}} to be partially equal to {{%1}}', actual, obj)
      };
    },

    toHaveBeenCalledOnce: function() {
      var callCount = this.callCount(this.actual) || 0;
      return {
        pass: callCount === 1,
        message: pp('Expect spy to have been called once but was called {{%0}} time(s)', callCount)
      };
    },

    toHaveBeenCalledOnceWith: function() {
      var actual = this.actual;
      var args = [].slice.call(arguments);
      var callCount = this.callCount(actual) || 0;
      var wasCalledOnce = callCount === 1;
      var ok = wasCalledOnce && this.equals(this.argsFor(actual, 0), args);
      var msg = wasCalledOnce && !ok ? ' with different arguments' : '';
      var error = 'Expect spy to have been called once but was called {{%0}} time(s)' + msg;
      return {
        pass: ok,
        message: pp(error, callCount)
      };
    }
  };

  // Deprecated matchers
  matchers.toEndsWith = matchers.toEndWith;
  matchers.toStartsWith = matchers.toStartWith;
  matchers.toEqualsIgnoringCase = matchers.toEqualIgnoringCase;
  matchers.toBePartiallyEqualsTo = matchers.toBePartiallyEqualTo;

  // Check version
  var version = jasmine.version_ || jasmine.version;
  if (version.major) {
    version = version.major;
  } else {
    version = parseInt(version.split('.')[0], 10);
  }

  var isJasmine1 = version === 1;
  var isJasmine2 = version === 2;

  var jasmineMatchers = {};

  var parseNegateMessage = function(isNot, message) {
    var notKey = isNot ? '{{not}}' : '{{not}} ';
    var notValue = isNot ? 'not' : '';
    return (message || '').replace(notKey, notValue);
  };

  var toJasmineMatcher = {
    1: function(fn) {
      return function() {
        var env = this.env;
        var equals_ = this.env.equals_;

        var ctx = {
          actual: this.actual,
          isNot: this.isNot,
          callCount: function(spy) {
            return spy.callCount;
          },
          argsFor: function(spy, call) {
            return spy.argsForCall[call];
          },
          equals: function() {
            return equals_.apply(env, arguments);
          }
        };

        var result = fn.apply(ctx, arguments);

        var isNot = this.isNot;

        if (!result.pass) {
          this.message = function() {
            return parseNegateMessage(isNot, result.message);
          };
        }

        return result.pass;
      };
    },

    2: function(fn) {
      return function(util, customEqualityTesters) {
        var ctx = {
          callCount: function(spy) {
            return spy.calls.count();
          },
          argsFor: function(spy, call) {
            return spy.calls.argsFor(call);
          },
          equals: function(a, b) {
            return util.equals(a, b, customEqualityTesters);
          }
        };

        return {
          compare: function(actual) {
            ctx.actual = actual;
            ctx.isNot = false;

            var args = [].slice.call(arguments, 1);
            var result = fn.apply(ctx, args);
            return {
              pass: result.pass,
              message: parseNegateMessage(false, result.message)
            };
          },

          negativeCompare: function(actual) {
            ctx.actual = actual;
            ctx.isNot = true;

            var args = [].slice.call(arguments, 1);
            var result = fn.apply(ctx, args);

            return {
              pass: !result.pass,
              message: parseNegateMessage(true, result.message)
            };
          }
        };
      };
    }
  };

  for (var matcher in matchers) {
    if (matchers.hasOwnProperty(matcher)) {
      jasmineMatchers[matcher] = toJasmineMatcher[version](matchers[matcher]);
    }
  }

  // Add utils functions to jasmine framework

  // Spy methods if and only given method is not alreay a spy
  // Spy is returned
  jasmine.spyIf = function(obj, method) {
    if (!jasmine.isSpy(obj[method])) {
      spyOn(obj, method);
    }
    return obj[method];
  };

  var spyIfAndCallThrough = function(obj, i) {
    var current = obj[i];
    if (isFunction(current) && !jasmine.isSpy(current)) {
      var spy = spyOn(obj, i);
      if (isJasmine1) {
        spy.andCallThrough();
      } else {
        spy.and.callThrough();
      }
    }
  };

  var reset = function(spy) {
    if (isJasmine1) {
      spy.reset();
    } else {
      spy.calls.reset();
    }
  };

  var arrayToMap = function(array) {
    var map = {};
    for (var i = 0, size = array.length; i < size; ++i) {
      map[array[i]] = true;
    }
    return map;
  };

  var eachOfObj = function(obj, iterator) {
    if (!obj) {
      return;
    }

    var foundProps = {};

    // First, use the for .. in loop.
    for (var i in obj) {
      foundProps[i] = true;
      iterator.call(null, obj, i);
    }

    // Spy non enumerable properties.
    // Object.getOwnPropertyNames is supported since IE9.
    if (Object.getOwnPropertyNames) {
      var props = Object.getOwnPropertyNames(obj);
      for (var k = 0, size = props.length; k < size; ++k) {
        var propName = props[k];

        // Handle property if it is as not been seen yet.
        if (foundProps[propName] !== true) {
          var descriptor = Object.getOwnPropertyDescriptor(obj, propName);
          if (descriptor.writable) {
            iterator.call(null, obj, props[k]);
          }
        }
      }
    }

    // Go up in the prototype chain.
    if (obj.prototype) {
      eachOfObj(obj.prototype, iterator);
    }
  };

  // Spy all methods on given object
  jasmine.spyAll = function(obj) {
    jasmine.spyAllExcept(obj, []);
  };

  jasmine.spyEach = function(obj, methods) {
    if (!methods) {
      methods = [];
    }

    if (!isArray(methods)) {
      methods = [methods];
    }

    var isEmpty = methods.length === 0;
    var map = arrayToMap(methods);

    eachOfObj(obj, function(target, i) {
      if (isEmpty || map[i]) {
        spyIfAndCallThrough(target, i);
      }
    });
  };

  // Spy all methods on given object, except method in given array
  jasmine.spyAllExcept = function(obj, excepts) {
    if (!isArray(excepts)) {
      excepts = [excepts];
    }

    var map = arrayToMap(excepts);

    eachOfObj(obj, function(target, i) {
      if (!map[i]) {
        spyIfAndCallThrough(target, i);
      }
    });
  };

  jasmine.resetAll = function(obj) {
    jasmine.resetAllExcept(obj, []);
  };

  jasmine.resetEach = function(obj, methods) {
    var arg = methods || [];
    var array = isArray(arg) ? arg : [arg];
    var map = arrayToMap(array);

    eachOfObj(obj, function(target, i) {
      var spy = target[i];
      if (jasmine.isSpy(spy) && map[i]) {
        reset(spy);
      }
    });
  };

  jasmine.resetAllExcept = function(obj, methods) {
    var arg = methods || [];
    var array = isArray(arg) ? arg : [arg];
    var map = arrayToMap(array);

    eachOfObj(obj, function(target, i) {
      var spy = target[i];
      if (jasmine.isSpy(spy) && !map[i]) {
        reset(spy);
      }
    });
  };

  beforeEach(function() {
    if (isJasmine1) {
      this.addMatchers(jasmineMatchers);
    } else {
      jasmine.addMatchers(jasmineMatchers);
    }
  });

})(void 0);
