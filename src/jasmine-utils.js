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
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function() {
  'use strict';

  // Check version
  var _version = jasmine.version_ || jasmine.version;

  if (_version.major) {
    _version = _version.major;
  } else {
    _version = parseInt(_version.split('.')[0], 10);
  }

  /**
   * Major version of Jasmine being imported.
   * @type {number}
   */
  var version = _version;

  /**
   * Return message with the appropriate negation:
   * - If `isNot` is `true`, then the pattern `{{not}}` will be replaced by `not`.
   * - Otherwise, the pattern `{{not}}` is replaced by an empty string.
   *
   * @param {boolean} isNot Enable/disable negation.
   * @param {string} message The message.
   * @return {string} The negated message.
   */
  function negateMessage(isNot, message) {
    if (!message) {
      return '';
    }

    var notKey = isNot ? '{{not}}' : '{{not}} ';
    var notValue = isNot ? 'not' : '';
    return message.replace(notKey, notValue);
  }

  /**
   * This factory will create a matcher supported by Jasmine 1.3.X.
   *
   * This factory takes a generic matcher function (matcher defined in this project)
   * and returns the matcher that can be used with Jasmine 1.3.
   *
   * @param {function} fn Generic matcher function.
   * @return {function} Jasmine 1.3 official matcher.
   * @see https://jasmine.github.io/1.3/introduction#section-Writing_a_custom_matcher
   */
  function jasmine1MatcherFactory(fn) {
    /**
     * Jasmine 1.3.X matcher.
     *
     * @return {boolean} The result of the expectation.
     */
    return function jasmine1Matcher() {
      // The `this` object is equals to the current test context.

      // eslint-disable-next-line no-invalid-this
      var env = this.env;

      // eslint-disable-next-line no-invalid-this
      var equals_ = this.env.equals_;

      // eslint-disable-next-line no-invalid-this
      var actual = this.actual;

      // eslint-disable-next-line no-invalid-this
      var isNot = this.isNot;

      var ctx = {
        actual: actual,
        isNot: isNot,

        // Adapter for `callCount`
        // https://jasmine.github.io/1.3/introduction#section-Spies
        callCount: function callCount(spy) {
          return spy.callCount;
        },


        // Adapter for `argsFor`
        // https://jasmine.github.io/1.3/introduction#section-Spies
        argsFor: function argsFor(spy, call) {
          return spy.argsForCall[call];
        },


        // Adapter for custom equality.
        equals: function equals() {
          for (var _len2 = arguments.length, equalsArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            equalsArgs[_key2] = arguments[_key2];
          }

          return equals_.apply(env, equalsArgs);
        }
      };

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = fn.apply(ctx, [ctx].concat(args));

      if (!result.pass) {
        // eslint-disable-next-line no-invalid-this
        this.message = function() {
          return negateMessage(isNot, result.message);
        };
      }

      return result.pass;
    };
  }

  /**
   * This factory will create a matcher supported by Jasmine 2.X.X.
   *
   * This factory takes a generic matcher function (matcher defined in this project)
   * and returns the matcher that can be used with Jasmine 2.
   *
   * @param {function} fn Generic matcher function.
   * @return {function} Jasmine2 official matcher.
   * @see https://jasmine.github.io/2.5/custom_matcher.html
   */
  function jasmine2MatcherFactory(fn) {
    /**
     * Jasmine 2.X.X matcher.
     *
     * @param {Object} util Jasmine util object.
     * @param {Object} customEqualityTesters List of equality functions registered in Jasmine.
     * @return {Object} An object containing `compare` and `negativeCompare` function
     *                  that will be executed by Jasmine..
     */
    return function jasmine2Matcher(util, customEqualityTesters) {
      var ctx = {
        // Adapter for `callCount`.
        // See: https://jasmine.github.io/2.5/introduction#section-Spies
        callCount: function callCount(spy) {
          return spy.calls.count();
        },


        // Adapter for `argsFor`.
        // See: https://jasmine.github.io/2.5/introduction#section-Spies
        argsFor: function argsFor(spy, call) {
          return spy.calls.argsFor(call);
        },


        // Adapter for custom equals functions.
        // See: https://jasmine.github.io/2.5/custom_equality.html
        equals: function equals(a, b) {
          return util.equals(a, b, customEqualityTesters);
        }
      };

      return {
        /**
         * Jasmine2 compare function that will be called when a custom matcher is used with:
         *  `expect(value).toCustomMatcher(...)`.
         *
         * @param {*} actual Object being tested (the object being given in `expect` call).
         * @param {Array<*>} args The matcher arguments (arguments being given to `toCustomMatcher` call).
         * @return {Object} The test result.
         */
        compare: function compare(actual) {
          ctx.actual = actual;
          ctx.isNot = false;

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var result = fn.apply(void 0, [ctx].concat(args));
          return {
            pass: result.pass,
            message: negateMessage(false, result.message)
          };
        },


        /**
         * Jasmine2 compare function that will be called when a custom matcher is used with:
         *  `expect(value).not.toCustomMatcher(...)`.
         *
         * @param {*} actual Object being tested (the object being given in `expect` call).
         * @param {Array<*>} args The matcher arguments (arguments being given to `toCustomMatcher` call).
         * @return {void}
         */
        negativeCompare: function negativeCompare(actual) {
          ctx.actual = actual;
          ctx.isNot = true;

          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          var result = fn.apply(void 0, [ctx].concat(args));
          return {
            pass: !result.pass,
            message: negateMessage(true, result.message)
          };
        }
      };
    };
  }

  var factories = {
    1: jasmine1MatcherFactory,
    2: jasmine2MatcherFactory
  };

  /**
   * Create Jasmine matcher.
   * The created matcher will depends on the jasmine's version being used.
   *
   * @param {function} matcher Generic matcher function.
   * @return {function} A matcher that can be used with Jasmine 1.3.X / 2.X.X.
   */
  function createMatcher(matcher) {
    return (factories[version] || jasmine2MatcherFactory)(matcher);
  }

  /**
   * Check if a key is a property of a given object (i.e this is the result
   * of `Object.hasOwnProperty` method).
   *
   * @param {Object} object Object to check.
   * @param {string} prop Property (a.k.a key) to look for.
   * @return {boolean} `true` if `prop` is a key of `object`, `false` otherwise.
   */
  function has(object, prop) {
    return Object.prototype.hasOwnProperty.call(object, prop);
  }

  /**
   * Check that a given value is `null`.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is `null`, `false` otherwise.
   */
  function isNull(obj) {
    return obj === null;
  }

  /**
   * Check that a given value is `undefined`.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is `undefined`, `false` otherwise.
   */
  function isUndefined(obj) {
    return obj === void 0;
  }

  /**
   * Return the tag name of the object (a.k.a the result of `Object.prototype.toString`).
   *
   * @param {*} obj Object to get tag name.
   * @return {string} Tag name.
   */
  function tagName(obj) {
    // Handle null and undefined since it may fail on some browser.

    if (isNull(obj)) {
      return '[object Null]';
    }

    if (isUndefined(obj)) {
      return '[object Undefined]';
    }

    var tag = Object.prototype.toString.call(obj);

    // IE11 on Win10 returns `[object Object]` with `Map` and `Set`.
    // IE8 returns `[object Object]` with NodeList and HTMLCollection.
    // Try to patch this bug and return the appropriate tag value.
    if (tag === '[object Object]') {
      // -- IE11 Patch

      // Handle `Map` or `Set` (IE11).
      var src = typeof obj.constructor === 'function' ? toSource(obj.constructor) : '';
      if (typeof Map === 'function' && src === toSource(Map)) {
        return '[object Map]';
      } else if (typeof Set === 'function' && src === toSource(Set)) {
        return '[object Set]';
      }

      // -- IE8 Patch

      // Handle NodeList (IE8 only).
      if (obj instanceof NodeList) {
        return '[object NodeList]';
      }

      // Handle HTMLCollection (IE8 only).
      if (obj instanceof HTMLCollection) {
        return '[object HTMLCollection]';
      }

      // Handle HTMLCollection (IE8 only).
      if (has(obj, 'callee')) {
        return '[object Arguments]';
      }
    }

    return tag;
  }

  /**
   * Get the function source of parameter.
   *
   * @param {*} obj Parameter to get source.
   * @return {string} Function source.
   */
  function toSource(obj) {
    return Function.prototype.toString.call(obj);
  }

  /**
   * Check that a given value is of a given type.
   * The type is the tag name displayed with `Object.prototype.toString`
   * function call.
   *
   * @param {*} obj Value to check.
   * @param {string} type The type id.
   * @return {boolean} `true` if `obj` is of given type, `false` otherwise.
   */
  function is(obj, type) {
    return tagName(obj) === '[object ' + type + ']';
  }

  /**
   * Check that a given value is a map.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a map, `false` otherwise.
   */
  function isMap(obj) {
    return is(obj, 'Map');
  }

  // Use a fallback for `Object.keys` if needed (for old browsers).
  var objectKeys = Object.keys || function _keys(o) {
    var results = [];

    for (var key in o) {
      if (has(o, key)) {
        results.push(key);
      }
    }

    return results;
  };

  /**
   * Get all keys of map instance.
   *
   * @param {Map} map Map instance.
   * @return {Array<String>} An array of all map keys.
   */
  function mapKeys(map) {
    // IE11 on Win10 does not support `keys` function, so
    // use the good old `forEach` function.
    var allKeys = [];
    map.forEach(function(v, k) {
      return allKeys.push(k);
    });
    return allKeys;
  }

  /**
   * Get all own and enumerable keys of an object.
   *
   * @param {Object} obj Object to extract keys.
   * @return {Array<string>} An array of all the keys in the object.
   */
  function keys(obj) {
    return isMap(obj) ? mapKeys(obj) : objectKeys(obj);
  }

  /**
   * Apply a predicate function on all the values of an array (also supports array-like
   * objects).
   *
   * The iteratee function will be called with three arguments:
   *  - `value` The value for the given iteration.
   *  - `index` The index of the value being iterated.
   *  - `array` The array being traversed.
   *
   * @param {Array<*>} array The array to iterate.
   * @param {function} iteratee The iteratee function.
   * @return {void}
   */
  function forEach(array, iteratee) {
    for (var i = 0, size = array.length; i < size; ++i) {
      iteratee.call(null, array[i], i, array);
    }
  }

  /**
   * Pretty-Print object (use `jasmine.pp` by default).
   *
   * @param {*} value Object to pretty-print.
   * @return {string} The string representation of object.
   */
  function pp(value) {
    try {
      return jasmine.pp(value);
    } catch (e) {
      // Fallback using object `toString` implementation.
      // Don't worry about `null` or `undefined` since it should be handled
      // by `jasmine.pp`
      return value.toString();
    }
  }

  var _isArray = Array.isArray || function _isArray(obj) {
    return is(obj, 'Array');
  };

  /**
   * Check that a given value is an array.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is an array, `false` otherwise.
   */
  function isArray(obj) {
    return _isArray(obj);
  }

  /**
   * Check that a given value is a function.
   *
   * @param {*} value Value to check.
   * @return {boolean} `true` if `value` is a function, `false` otherwise.
   */
  function isFunction(value) {
    return is(value, 'Function');
  }

  /**
   * Check that a given value is a number.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a number, `false` otherwise.
   */
  function isNumber(obj) {
    return is(obj, 'Number');
  }

  /**
   * Check that a given value is a NodeList instance.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a NodeList instance, `false` otherwise.
   */
  function isNodeList(obj) {
    return is(obj, 'NodeList') || is(obj, 'HTMLCollection');
  }

  /**
   * Check that a value is a DOM node element.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a DOM node, `false` otherwise.
   */
  function isDOMElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  /**
   * Check that a given value is an array or an array-like object.
   *
   * An array-like object is an object that can be iterated like an object:
   * - It has a `length` property (and its value is a number).
   * - It has indexed property starting from zero.
   *
   * For example, node list objects are a kind of array-like object.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is an array-like object, `false` otherwise.
   */
  function isArrayLike(obj) {
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
    return length === 0 || isNumber(length) && length > 0 && length - 1 in obj;
  }

  /**
   * Check that a given value is a string.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a string, `false` otherwise.
   */
  function isString(obj) {
    return is(obj, 'String');
  }

  /**
   * Check that a given value is a set.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a set, `false` otherwise.
   */
  function isSet(obj) {
    return is(obj, 'Set');
  }

  /**
   * Check that a given value is `null` or `undefined`.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is `null` or `undefined`, `false` otherwise.
   */
  function isNil(obj) {
    return isNull(obj) || isUndefined(obj);
  }

  var SUPPORT_SYMBOL = typeof Symbol !== 'undefined';

  /**
   * Check that a given value is iterable (i.e can be iterated with for...of).
   *
   * @param {*} value Value to check.
   * @return {boolean} `true` if `value` is iterable, `false` otherwise.
   */
  function isIterable(value) {
    // Handle null and undefined.
    if (isNil(value)) {
      return false;
    }

    // All these types are iterable objects.
    if (isArray(value) || isString(value) || isSet(value) || isMap(value)) {
      return true;
    }

    // We must check for the iterator method.
    return SUPPORT_SYMBOL && isFunction(value[Symbol.iterator]);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };











  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  /**
   * Check that a given value is an object.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is an object, `false` otherwise.
   */
  function isObject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  }

  /**
   * Get the `size` of a given value:
   * - The length value for an array (or an array-like) object.
   * - The number of properties for an object.
   *
   * @param {*} obj Value to get the size.
   * @return {number} The computed size.
   */
  function sizeOf(obj) {
    if (isNil(obj)) {
      return 0;
    }

    // For string and array-like object, just return the length property.
    if (isString(obj) || isArrayLike(obj)) {
      return obj.length;
    }

    // For set and map object, just return the size property.
    if (isSet(obj) || isMap(obj)) {
      return obj.size;
    }

    // For iterable objects, use the for..of loop to get the size.
    if (isIterable(obj)) {
      var size = 0;

      // eslint-disable-next-line no-unused-vars
      for (var _iterator = obj, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var x = _ref;

        size++;
      }

      return size;
    }

    // Last option: return the number of keys for an object.
    if (isObject(obj)) {
      return keys(obj).length;
    }

    return -1;
  }

  /**
   * Check that tested object is empty:
   * - If it is an `array` or an array-like, check that the length is equal to zero.
   * - If it is an object, check that it does not have any property.
   * - If it is a `map` or a `set`, check that the size is equal to zero.
   *
   * @message Expect [actual] (not) to be empty.
   * @example
   *   expect('').toBeEmpty();
   *   expect([]).toBeEmpty();
   *   expect({}).toBeEmpty();
   *   expect(new Map()).toBeEmpty();
   *   expect(new Set()).toBeEmpty();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeEmpty(_ref) {
    var actual = _ref.actual;

    var size = sizeOf(actual);
    return {
      pass: size === 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be empty'
    };
  }

  /**
   * Check that a given value is a boolean.
   *
   * @param {*} obj Value to test.
   * @return {boolean} `true` if `obj` is a boolean, `false` otherwise.
   */
  function isBoolean(obj) {
    return obj === true || obj === false || is(obj, 'Boolean');
  }

  /**
   * Check that a given value is a primitive object:
   * - Equal to `null`,
   * - Equal to `undefined`,
   * - A `number`,
   * - A `string`
   * - A `boolean`
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a primitive, `false` otherwise.
   */
  function isPrimitive(obj) {
    return isNil(obj) || isNumber(obj) || isString(obj) || isBoolean(obj);
  }

  /**
   * Check that a given value is extensible.
   *
   * Objects are extensible by default: they can have new properties added to them,
   * and can be modified. An object can be marked as non-extensible using:
   * - `Object.preventExtensions()`,
   * - `Object.seal()`,
   * - `Object.freeze()`
   *
   * This function use internally `Object.isExtensible` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isExtensible` is not supported, this function
   * returns `false`.
   *
   * **Important**: This function (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as non extensible object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is extensible, `false` otherwise.
   */
  function isExtensible(obj) {
    // Primitive values are frozen in ES6 (not in ES5).
    if (isPrimitive(obj)) {
      return false;
    }

    // If Object.isExtensible is not supported, return `true` by default.
    if (!isFunction(Object.isExtensible)) {
      return true;
    }

    return Object.isExtensible(obj);
  }

  /**
   * Check that the tested object is extensible.
   *
   * Objects are extensible by default: they can have new properties added to them,
   * and can be modified. An object can be marked as non-extensible using:
   * - `Object.preventExtensions()`,
   * - `Object.seal()`,
   * - `Object.freeze()`
   *
   * This matcher use internally `Object.isExtensible` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isExtensible` is not supported, this matcher
   * treat the tested object as an extensible object.
   *
   * **Important**: This matcher (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as non extensible object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
   *
   * @message Expect [actual] (not) to be extensible
   * @example
   *   expect({}).toBeExtensible();
   *   expect([]).toBeExtensible();
   *   expect(null).not.toBeExtensible();
   *   expect(undefined).not.toBeExtensible();
   *   expect('').not.toBeExtensible();
   *   expect(0).not.toBeExtensible();
   *   expect(true).not.toBeExtensible();
   *   expect(Object.freeze({})).not.toBeExtensible();
   *   expect(Object.freeze([])).not.toBeExtensible();
   *   expect(Object.seal({})).not.toBeExtensible();
   *   expect(Object.seal([])).not.toBeExtensible();
   *   expect(Object.preventExtensions({})).not.toBeExtensible();
   *   expect(Object.preventExtensions([])).not.toBeExtensible();
   *
   * @param {Object} ctx The test context.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeExtensible(_ref) {
    var actual = _ref.actual;

    return {
      pass: isExtensible(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be extensible'
    };
  }

  /**
   * Check that a given value is frozen: an object is frozen if and only if it
   * is not extensible, all its properties are non-configurable, and all its
   * data properties (that is, properties which are not accessor properties with
   * getter or setter components) are non-writable.
   *
   * This function use internally `Object.isFrozen` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isFrozen` is not supported, this function
   * returns `false`.
   *
   * **Important**: This function (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as frozen object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is frozen, `false` otherwise.
   */
  function isFrozen(obj) {
    // Primitive values are frozen in ES6 (not in ES5).
    if (isPrimitive(obj)) {
      return true;
    }

    // If Object.isFrozen is not supported, returns `false` by default.
    if (!isFunction(Object.isFrozen)) {
      return false;
    }

    return Object.isFrozen(obj);
  }

  /**
   * Check that the tested object is frozen: an object is frozen if and only if it
   * is not extensible, all its properties are non-configurable, and all its
   * data properties (that is, properties which are not accessor properties with
   * getter or setter components) are non-writable.
   *
   * This function use internally `Object.isFrozen` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isFrozen` is not supported, this function
   * returns `false`.
   *
   * **Important**: This function (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as frozen object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
   *
   * @message Expect [actual] (not) to frozen
   * @example
   *   expect(null).toBeFrozen();
   *   expect(undefined).toBeFrozen();
   *   expect('').toBeFrozen();
   *   expect(0).toBeFrozen();
   *   expect(true).toBeFrozen();
   *   expect(Object.freeze({})).toBeFrozen();
   *   expect(Object.freeze([])).toBeFrozen();
   *   expect({}).not.toBeFrozen();
   *   expect([]).not.toBeFrozen();
   *
   * @param {Object} ctx The test context.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeFrozen(_ref) {
    var actual = _ref.actual;

    return {
      pass: isFrozen(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be frozen'
    };
  }

  /**
   * Check that the tested object is an instance of a given `constructor`.
   *
   * @message Expect [actual] (not) to be an instance of [constructor]
   * @example
   *   expect(new Date()).toBeInstanceOf(Date);
   *   expect('foo').toBeInstanceOf(String);
   *
   *   class Foo { }
   *   expect(new Foo()).toBeInstanceOf(Foo);
   *
   * @param {Object} ctx Test context.
   * @param {*} ctor Expected constructor.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeInstanceOf(_ref, ctor) {
    var actual = _ref.actual;

    return {
      pass: actual instanceof ctor,
      message: 'Expect ' + pp(actual) + ' {{not}} to be an instance of ' + pp(ctor)
    };
  }

  /**
   * Apply strict equality comparison between two values.
   *
   * @param {*} a First value.
   * @param {*} b Second value.
   * @return {boolean} `true` if `a === b`, `false` otherwise.
   */
  function strictEquals(a, b) {
    return a === b;
  }

  /**
   * Get the (first) index of given value inside an array (also supports array-like objects).
   *
   * This function may take as third argument a custom equality function used to
   * compare values in the array with the value to look for. If not specified, the
   * strict equality will be used (i.e result of `===`).
   *
   * @param {Array<*>} array Array to check.
   * @param {*} obj Value to look for in the array.
   * @param {function} equalsFunction A custom equality function used to compare values.
   * @return {number} The index of the value in the array, or -1 if value is not found.
   */
  function indexOf(array, obj, equalsFunction) {
    var areEquals = equalsFunction || strictEquals;
    var size = array.length;

    for (var i = 0; i < size; ++i) {
      if (areEquals(array[i], obj)) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Check that a given value is inside an array (also supports array-like objects).
   *
   * This function may take as third argument a custom equality function used to
   * compare values in the array with the value to look for. If not specified, the
   * strict equality will be used (i.e result of `===`).
   *
   * @param {Array<*>} array Array to check.
   * @param {*} obj Value to look for in the array.
   * @param {function} equalsFunction A custom equality function used to compare values.
   * @return {boolean} `true` if value is in the array, `false` otherwise.
   */
  function contains(array, obj, equalsFunction) {
    return indexOf(array, obj, equalsFunction) >= 0;
  }

  /**
   * Check that the tested object is strictly equal to one of the values
   * in an array. Note that this matcher use the strict equality (`===`), please
   * use `toEqualOneOf` for other equality check.
   *
   * @message Expect [actual] (not) to be one of [values]
   * @example
   *   expect(1).toBeOneOf([1, 2, 3]);
   *   expect(10).not.toBeOneOf([1, 2, 3]);
   *
   * @param {Object} ctx The test context.
   * @param {Array} array The array that should contains the actual value.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeOneOf(_ref, array) {
    var actual = _ref.actual;

    return {
      pass: contains(array, actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be one of ' + pp(array)
    };
  }

  /**
   * Check that a given value is sealed: an object is sealed if it is not
   * extensible and if all its properties are non-configurable and therefore not
   * removable (but not necessarily non-writable).
   *
   * This function use internally `Object.isSealed` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isSealed` is not supported, this function
   * returns `false`.
   *
   * **Important**: This function (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as sealed object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is sealed, `false` otherwise.
   */
  function isSealed(obj) {
    // Primitive values are frozen in ES6 (not in ES5).
    if (isPrimitive(obj)) {
      return true;
    }

    // If Object.sealed is not supported, return `false` by default.
    if (!isFunction(Object.isSealed)) {
      return false;
    }

    return Object.isSealed(obj);
  }

  /**
   * Check that a given value is sealed: an object is sealed if it is not
   * extensible and if all its properties are non-configurable and therefore not
   * removable (but not necessarily non-writable).
   *
   * This matcher use internally `Object.isSealed` (supported in Chrome, Firefox,
   * Safari and IE >= 9). If `Object.isSealed` is not supported, the matcher will
   * always treat objects and arrays as non sealed.
   *
   * **Important**: This matcher (as ES6 specification) treat primitive
   * (`null`, `undefined`, numbers, strings and booleans) as sealed object.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
   *
   * @message Expect [actual] (not) to sealed
   * @example
   *   expect(null).toBeSealed();
   *   expect(undefined).toBeSealed();
   *   expect('').toBeSealed();
   *   expect(0).toBeSealed();
   *   expect(true).toBeSealed();
   *   expect(Object.seal({})).toBeSealed();
   *   expect(Object.seal([])).toBeSealed();
   *   expect({}).not.toBeSealed();
   *   expect([]).not.toBeSealed();
   *
   * @param {Object} ctx The test context.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeSealed(_ref) {
    var actual = _ref.actual;

    return {
      pass: isSealed(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be sealed'
    };
  }

  /**
   * Check that the tested object is equal to one of the values in an array.
   * Note that this matcher use the deep equality check and also works with
   * custom equality tester. For strict comparison (`===`) please use `toBeOneOf`.
   *
   * @message Expect [actual] (not) to equal one of [values]
   * @example
   *   expect(1).toEqualOneOf([1, 2, 3]);
   *   expect({id: 1}).toEqualOneOf([{id: 1}]);
   *   expect(10).not.toEqualOneOf([1, 2, 3]);
   *
   * @param {Object} ctx The test context.
   * @param {Array} array The array that should contains the actual value.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toEqualOneOf(_ref, array) {
    var actual = _ref.actual,
      equals = _ref.equals;

    return {
      pass: contains(array, actual, equals),
      message: 'Expect ' + pp(actual) + ' {{not}} to equal one of ' + pp(array)
    };
  }

  /**
   * Default comparison function.
   *
   * @param {*} a First value to compare.
   * @param {*} b Second value to compare.
   * @return {number} -1 if `a < b`, 1 if `a > b`, otherwise zero.
   */
  function defaultComparator(a, b) {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  /**
   * Check that a given array is sorted (according to a given comparator function).
   *
   * The comparator function takes two arguments `a` and `b` and must return:
   * - A value less than 0 if `a < b`.
   * - A value greater than 0 if `a > b`.
   * - Otherwise zero.
   *
   * The comparator function is optional: the default is the default comparison in JS.
   *
   * @param {Array<*>} array Array to check.
   * @param {function} comparator Comparator function.
   * @return {boolean} `true` if `array` is sorted, `false` otherwise.
   */
  function isSorted(array, comparator) {
    if (array.length <= 1) {
      return true;
    }

    var fn = comparator || defaultComparator;

    for (var i = 1, size = array.length; i < size; ++i) {
      if (fn(array[i - 1], array[i]) > 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check that the tested object is an array and is sorted (i.e for each elements in
   * the array, `array[i - 1] <= array[i]`).
   *
   * A custom comparator can be specified as parameter:
   * - Takes values to compare as arguments.
   * - Must return a number:
   *   - Less than zero if first argument is less than the second.
   *   - Greater than zero if first argument is greater than the second.
   *   - Zero if both parameters are "equivalent".
   *
   * @message Expect [actual] (not) to be sorted
   * @example
   *   expect([0, 1, 2, 3]).toBeSorted();
   *   expect(['bar', 'foo']).toBeSorted();
   *   expect([false, false, true, true]).toBeSorted();
   *   expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted((a, b) => a.id - b.id);
   *   expect([1, 0, 2, 3]).not.toBeSorted();
   *
   * @param {Object} ctx Test context.
   * @param {function} comparator Comparator function (optional).
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeSorted(_ref, comparator) {
    var actual = _ref.actual;

    return {
      pass: isArray(actual) && isSorted(actual, comparator),
      message: 'Expect ' + pp(actual) + ' {{not}} to be sorted'
    };
  }

  /**
   * Count the number of occurences of a value inside an array.
   *
   * @param {Array<*>} array Array to traverse.
   * @param {*} occ Value to count.
   * @param {number} from Index to start (default is zero).
   * @param {function} equalsFunction The comparison function (defaults is the strict equality).
   * @return {number} The number of time `occ` is in the array.
   */
  function countIn(array, occ) {
    var from = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var equalsFunction = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : strictEquals;

    var size = array.length;

    var count = 0;
    for (var i = from; i < size; ++i) {
      if (equalsFunction(array[i], occ)) {
        count++;
      }
    }

    return count;
  }

  /**
   * Check that a predicate satisfies each elements in an array, or an
   * array-like object (such as a string, an `arguments` object, etc.).
   *
   * If the array is empty, this function will returns `true`.
   *
   * @param {array|string|object} array Array "like" object.
   * @param {function} predicate The predicate function.
   * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
   */
  function arrayEvery(array, predicate) {
    for (var i = 0, size = array.length; i < size; ++i) {
      if (!predicate.call(null, array[i], i, array)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check that a predicate satisfies each elements in an iterable object (an object
   * that can be iterated with the `for...of` loop such as `Set`, `Map` or objects
   * containing an `iterator` function).
   *
   * If the iterable is empty, this function will returns `true`.
   *
   * @param {object} iterable Iterable object.
   * @param {function} predicate The predicate function.
   * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
   */
  function iterableEvery(iterable, predicate) {
    var i = 0;

    for (var _iterator = iterable, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var value = _ref;

      if (!predicate.call(void 0, value, i, iterable)) {
        return false;
      }

      i++;
    }

    return true;
  }

  /**
   * Check that a predicate satisfies each elements in a `Set` or a `Map`.
   * If the map or the set is empty, this function will returns `true`.
   *
   * @param {Map|Set} mapOrSet Iterable object.
   * @param {function} predicate The predicate function.
   * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
   */
  function mapOrSetEvery(mapOrSet, predicate) {
    var hasFalse = false;

    mapOrSet.forEach(function(v, k) {
      // Be careful, `forEach` function on Safari miss the second parameter when
      // iterating over a `Set`...
      hasFalse = hasFalse || !predicate.call(void 0, v, arguments.length === 1 ? v : k, mapOrSet);
    });

    return !hasFalse;
  }

  /**
   * Check that a predicate satisfies each elements in an array or an iterable
   * structure.
   *
   * This function supports:
   * - Array.
   * - Array-Like objects.
   * - Map instances.
   * - Set instances.
   * - Any iterable objects.
   *
   * The predicate function will be called with three arguments:
   *  - `value` The value for the given iteration.
   *  - `key` The key of the value being iterated.
   *  - `array` The array being traversed.
   *
   * Note that the key may be different with arrays and map/set:
   * - With an array or an iterable object, the key will be the index of the value being traversed.
   * - With a map, the key will be the index value of the value being traversed.
   * - With a set, the key will be the same value being traversed (since a `Set` does not have any keys).
   *
   * See the documentation of the `forEach` functions of `Map` and `Set` structure.
   *
   * @param {Array|Map|Set} collection The collection to iterate.
   * @param {function} predicate The predicate function.
   * @return {boolean} `true` if the predicate returns a truthy value for each element
   *                   in the array, `false` otherwise.
   */
  function every(collection, predicate) {
    // First, test with an array.
    if (isArrayLike(collection)) {
      return arrayEvery(collection, predicate);
    }

    if (isSet(collection) || isMap(collection)) {
      return mapOrSetEvery(collection, predicate);
    }

    // Then, try with iterable (object with iterator function).
    if (isIterable(collection)) {
      return iterableEvery(collection, predicate);
    }

    return true;
  }

  /**
   * Check that an array contains only distinct values.
   *
   * @param {Array<*>} array Array to traverse.
   * @param {function} equalsFunction The equality function (default is the strict equality).
   * @return {boolean} `true` if `array` contains only distinct values, `false` otherwise.
   */
  function containsDistinct(array) {
    var equalsFunction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strictEquals;

    return every(array, function(item, idx) {
      return countIn(array, item, idx + 1, equalsFunction) === 0;
    });
  }

  /**
   * Check that the tested object is an array containing only distinct values.
   * The tested object may be an array or any iterable object (i.e that can be
   * traversed with the `for..of` loop).
   *
   * Note that this matcher works fine with custom equality matchers.
   *
   * @message Expect [actual] (not) to contains only distinct values
   * @example
   *   expect([0, 1, 2, 3]).toContainsDistinctValues();
   *   expect([0, 1, 2, 3, 0]).not.toContainsDistinctValues();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toContainsDistinctValues(_ref) {
    var actual = _ref.actual,
      equals = _ref.equals;

    return {
      pass: isArray(actual) && containsDistinct(actual, equals),
      message: 'Expect ' + pp(actual) + ' {{not}} to contains only distinct values'
    };
  }

  /**
   * Check that a given value is a falsy value.
   *
   * @param {*} a Value to check.
   * @return {boolean} `true` if parameter is a falsy value.
   */
  function isFalsy(a) {
    return !a;
  }

  /**
   * Check that the tested object contains only falsy values.
   * The tested object may be an array or any iterable object (i.e that can be
   * traversed with the `for..of` loop).
   *
   * Note that this matcher works fine with custom equality matchers.
   *
   * @message Expect [actual] (not) to contains only falsy values
   * @example
   *   expect([0, false, null, undefined, '']).toContainsOnlyFalsyValues();
   *
   *   expect([1, false, null, undefined, '']).not.toContainsOnlyFalsyValues();
   *   expect([0, true, null, undefined, '']).not.toContainsOnlyFalsyValues();
   *   expect([0, false, {}, undefined, '']).not.toContainsOnlyFalsyValues();
   *   expect([0, false, null, [], '']).not.toContainsOnlyFalsyValues();
   *   expect([0, false, null, undefined, 'foo']).not.toContainsOnlyFalsyValues();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toContainsOnlyFalsyValues(_ref) {
    var actual = _ref.actual;

    return {
      pass: isArray(actual) && every(actual, isFalsy),
      message: 'Expect ' + pp(actual) + ' {{not}} to contains only falsy values'
    };
  }

  /**
   * Check that a given value is a truthy value.
   *
   * @param {*} a Value to check.
   * @return {boolean} `true` if parameter is a truthy value.
   */
  function isTruthy(a) {
    return !!a;
  }

  /**
   * Check that the tested object contains only truthy values.
   * The tested object may be an array or any iterable object (i.e that can be
   * traversed with the `for..of` loop).
   *
   * Note that this matcher works fine with custom equality matchers.
   *
   * @message Expect [actual] (not) to contains only truthy values.
   * @example
   *   expect([1, 2, true, 'foo', {}, []]).toContainsOnlyTruthyValues();
   *
   *   expect([1, 2, false, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
   *   expect([1, 2, true, '', {}, []]).not.toContainsOnlyTruthyValues();
   *   expect([0, 2, true, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toContainsOnlyTruthyValues(_ref) {
    var actual = _ref.actual;

    return {
      pass: isArray(actual) && every(actual, isTruthy),
      message: 'Expect ' + pp(actual) + ' {{not}} to contains only truthy values'
    };
  }

  /**
   * Check that tested object has a `length` property with expected value.
   *
   * @message Expect length of [actual] (not) to be [expectedLength]
   * @example
   *   expect([]).toHaveLength(0);
   *   expect([0, 1, 2]).toHaveLength(3);
   *   expect('').toHaveLength(0);
   *   expect('foo').toHaveLength(3);
   *
   * @param {Object} ctx Test context.
   * @param {number} expectedLength The expected length value.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveLength(_ref, expectedLength) {
    var actual = _ref.actual;

    var actualLength = actual.length;
    return {
      pass: actualLength === expectedLength,
      message: 'Expect length of ' + pp(actual) + ' {{not}} to be ' + pp(expectedLength) + ' ' + ('but was ' + pp(actualLength))
    };
  }

  /**
   * Check that tested object has the same length as an other value with `length`
   * property.
   *
   * @message Expect [actual] (not) to have same length as [expected]
   * @example
   *   expect([]).toHaveSameLengthAs('');
   *   expect(['f', 'o', 'o']).toHaveSameLengthAs('foo');
   *   expect('').toHaveSameLengthAs([]);
   *   expect('foo').toHaveSameLengthAs(['f', 'o', 'o']);
   *
   * @param {Object} ctx Test context.
   * @param {Array<*>} expected The other array.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveSameLengthAs(_ref, expected) {
    var actual = _ref.actual;

    var actualLength = actual.length;
    var expectedLength = expected.length;
    return {
      pass: actualLength === expectedLength,
      message: 'Expect ' + pp(actual) + ' {{not}} to have same length as ' + pp(expected)
    };
  }

  /**
   * Check that a predicate satisfies at least one element in a collection (array,
   * set, map or an any iterable object).
   *
   * The predicate function will be called with three arguments:
   *  - `value` The value for the given iteration.
   *  - `index` The index of the value being iterated.
   *  - `collection` The collection being traversed.
   *
   * @param {Array|string|object} collection The collection to iterate.
   * @param {function} predicate The predicate function.
   * @return {boolean} `true` if the predicate returns a truthy value for at least one, `false` otherwise.
   */
  function some(collection, predicate) {
    return !every(collection, function(v, k, c) {
      return !predicate(v, k, c);
    });
  }

  /**
   * Verifies that the tested object satisfies a predicate function for at
   * at least one element in the collection.
   *
   * The collection may be an `array`, a `set`, a `map` or any iterable object.
   *
   * The predicate function is executed with three arguments:
   * - The value being iterated.
   * - The key of the value being iterated.
   * - The collection being iterated.
   *
   * **Important:**
   * Note that the key may be different with arrays and map/set:
   * - With an array or an iterable object, the key will be the index of the value being traversed.
   * - With a map, the key will be the index value of the value being traversed.
   * - With a set, the key will be the same value being traversed (since a `Set` does not have any keys).
   *
   * See the documentation of the `forEach` functions of `Map` and `Set` structure:
   * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set/forEach
   * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map
   *
   * This matcher may take an optional first argument: the error message that will
   * be displayed if the matcher does not pass.
   *
   * @message
   *   Expect [actual] (not) to have at least one element that verify condition
   *   Expect [actual] (not) to have at least one element that verify "[message]"
   *
   * @example
   *   expect([1, 2, 3]).toHaveSome(x => x % 2 === 0);
   *   expect([1, 3, 5, 7]).not.toHaveSome(x => x % 2 === 0);
   *
   * @param {Object} ctx Test context.
   * @param {string} message Custom error message (optional).
   * @param {function} iterator Predicate function.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveSome(_ref, message, iterator) {
    var actual = _ref.actual;

    var _message = void 0;
    var _iterator = void 0;

    if (isFunction(message)) {
      _message = 'condition';
      _iterator = message;
    } else {
      _message = '"' + message + '"';
      _iterator = iterator;
    }

    return {
      pass: some(actual, _iterator),
      message: 'Expect ' + pp(actual) + ' {{not}} to have at least one element that verify ' + _message
    };
  }

  /**
   * Check that the tested object satisfies a given predicate.
   * The collection may be an `array`, a `set`, a `map` or any iterable object.
   *
   * The predicate function is executed with three arguments:
   * - The value being iterated.
   * - The key of the value being iterated.
   * - The collection being iterated.
   *
   * **Important:**
   * Note that the key may be different with arrays and map/set:
   * - With an array or an iterable object, the key will be the index of the value being traversed.
   * - With a map, the key will be the index value of the value being traversed.
   * - With a set, the key will be the same value being traversed (since a `Set` does not have any keys).
   *
   * See the documentation of the `forEach` functions of `Map` and `Set` structure:
   * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set/forEach
   * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map
   *
   * This matcher may take an optional first argument: the error message that will
   * be displayed if the matcher does not pass.
   *
   * @message
   *   Expect [actual] (not) to verify condition
   *   Expect [actual] (not) to verify "[message]"
   *
   * @example
   *   expect([2, 4, 6, 8]).toVerify(x => x % 2 === 0);
   *   expect([2, 4, 6, 8, 9]).not.toVerify(x => x % 2 === 0);
   *
   * @param {Object} ctx Test context.
   * @param {string} message Error message thrown when the test fail (optional).
   * @param {function} iterator Predicate function.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toVerify(_ref, message, iterator) {
    var actual = _ref.actual;

    var _message = void 0;
    var _iterator = void 0;

    if (isFunction(message)) {
      _message = 'condition';
      _iterator = message;
    } else {
      _message = '"' + message + '"';
      _iterator = iterator;
    }

    return {
      pass: every(actual, _iterator),
      message: 'Expect ' + pp(actual) + ' {{not}} to verify ' + _message
    };
  }

  /**
   * Check that the tested object is strictly equal `false`.
   *
   * @message Expect [actual] (not) to be false
   * @example
   *   expect(false).toBeFalse();
   *   expect(true).not.toBeFalse();
   *   expect(0).not.toBeFalse();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeFalse(_ref) {
    var actual = _ref.actual;

    return {
      pass: actual === false,
      message: 'Expect ' + pp(actual) + ' {{not}} to be false'
    };
  }

  /**
   * Check that the tested object is strictly equal to `true`.
   *
   * @message Expect [actual] (not) to be true
   * @example
   *   expect(true).toBeTrue();
   *   expect(false).not.toBeTrue();
   *   expect(1).not.toBeTrue();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeTrue(_ref) {
    var actual = _ref.actual;

    return {
      pass: actual === true,
      message: 'Expect ' + pp(actual) + ' {{not}} to be true'
    };
  }

  /**
   * Get a new date initialized with the current timestamp.
   *
   * @return {Date} The date for the given instant.
   */
  function now() {
    return new Date();
  }

  /**
   * Check that given object is a date instance.
   *
   * @param {*} obj Object to test.
   * @return {boolean} `true` if `obj` is a date, `false` otherwise.
   */
  function isDate(obj) {
    return is(obj, 'Date');
  }

  var _dateParse = Date.parse;

  var SUPPORT_ISO_8601 = function() {
    return !!_dateParse && !!_dateParse('2017') && !!_dateParse('2017-01') && !!_dateParse('2017-01-01') && !!_dateParse('2017-01-01T10:00') && !!_dateParse('2017-01-01T10:00:00') && !!_dateParse('2017-01-01T10:00:00.000') && !!_dateParse('2017-01-01T10:00:00.000Z');
  }();

  var _parse = SUPPORT_ISO_8601 ? _dateParse : function() {
    // eslint-disable-next-line max-len
    var REGEX_ISO8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    var TZ_OFFSET = -now().getTimezoneOffset();
    var H_OFFSET = Math.floor(TZ_OFFSET / 60);
    var M_OFFSET = TZ_OFFSET % 60;

    return function(v) {
      var m = REGEX_ISO8601.exec(v);

      if (m) {
        var hoursOffset = H_OFFSET;
        var minutesOffset = M_OFFSET;

        var hasTimeZone = !!m[8];
        if (hasTimeZone) {
          var hasSpecificTz = !!m[9];
          hoursOffset = hasSpecificTz ? Number(m[9] + m[10]) : 0;
          minutesOffset = hasSpecificTz ? Number(m[9] + m[11]) : 0;
        }

        var year = Number(m[1]);
        var month = Number(m[2] || 1) - 1;
        var day = Number(m[3] || 1);
        var hours = Number(m[4] || 0) - hoursOffset;
        var minutes = Number(m[5] || 0) - minutesOffset;
        var seconds = Number(m[6] || 0);
        var millis = Number(((m[7] || 0) + '00').slice(0, 3));
        return Date.UTC(year, month, day, hours, minutes, seconds, millis);
      }

      // Call original.
      return _dateParse(v);
    };
  }();

  /**
   * Parse a date, that may be:
   * - A date instance.
   * - A timestamp (i.e a number, the number of milliseconds since 1970-01-01).
   * - A string, using ISO-8601 format or format described by RFC8822.
   *
   * If the format is not valid, an invalid date (initialized with `NaN`) will
   * be returned (the behavior of `Date` constructor).
   *
   * @param {Number|String|Date} date The date to parse.
   * @return {Date} The created date.
   */
  function parseDate(date) {
    if (isDate(date)) {
      return date;
    }

    if (isNumber(date)) {
      var d = new Date();
      d.setTime(date);
      return d;
    }

    if (isString(date)) {
      var tt = _parse(date);
      var _d = new Date();
      _d.setTime(tt);
      return _d;
    }

    return new Date(date);
  }

  /**
   * Get the difference in milliseconds between two dates.
   *
   * Both parameters does not need to be an instance of Date:
   * - If it is a number, it is assumed that this is a timestamp and it is converted to a date.
   * - If it is a string, it is assumed that this is an ISO format.
   *
   * @param {Date|number|string} d1 First date.
   * @param {Date|number|string} d2 Second date.
   * @return {number} The number of milliseconds between dates.
   */
  function dateDiff(d1, d2) {
    var t1 = parseDate(d1).getTime();
    var t2 = parseDate(d2).getTime();
    return t1 - t2;
  }

  /**
   * Check that the tested date object is a date "after" `now`.
   *
   * The tested date may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be after now
   * @example
   *   expect(Date.now() + 1000).toBeDateAfterNow();
   *   expect(new Date(Date.now() + 1000)).toBeDateAfterNow();
   *   expect(new Date(Date.now() - 1000)).not.toBeDateAfterNow();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateAfterNow(_ref) {
    var actual = _ref.actual;

    var diff = dateDiff(actual, now());
    return {
      pass: diff >= 0,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be after now'
    };
  }

  /**
   * Check that the tested date object is a date "after" an other date.
   *
   * The tested date and the date to compare may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be after [lower]
   * @example
   *   expect(Date.now()).toBeDateAfter(Date.now() - 1000));
   *   expect(Date.now() - 1000).toBeDateAfter(Date.now()));
   *
   * @param {Object} ctx Test context.
   * @param {Date|number|string} lower The lower bound.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateAfter(_ref, lower) {
    var actual = _ref.actual;

    var diff = dateDiff(actual, lower);
    return {
      pass: diff >= 0,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be after ' + pp(lower)
    };
  }

  /**
   * Check that the tested date object is a date "before" `now`.
   *
   * The tested date may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be before now
   * @example
   *   expect(Date.now() - 1000).toBeDateBeforeNow();
   *   expect(new Date(Date.now() - 1000)).toBeDateBeforeNow();
   *   expect(new Date(Date.now() + 1000)).not.toBeDateBeforeNow();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateBeforeNow(_ref) {
    var actual = _ref.actual;

    var diff = dateDiff(actual, now());
    return {
      pass: diff <= 0,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be before now'
    };
  }

  /**
   * Check that the tested date object is a date "before" an other date.
   *
   * The tested date and the date to compare may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be before [lower]
   * @example
   *   expect(Date.now()).toBeDateBefore(Date.now() + 1000));
   *   expect(Date.now() + 1000).toBeDateBefore(Date.now()));
   *
   * @param {Object} ctx Test context.
   * @param {Date|number|string} upper The upper bound.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateBefore(_ref, upper) {
    var actual = _ref.actual;

    var diff = dateDiff(actual, upper);
    return {
      pass: diff <= 0,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be before ' + pp(upper)
    };
  }

  /**
   * Check that the tested object is a date close to 'now'.
   *
   * The tested date may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be close to now
   * @example
   *   expect(Date.now()).toBeDateCloseToNow();
   *   expect(Date.now() + 1000).toBeDateCloseToNow(2000);
   *   expect(Date.now() - 1000).toBeDateCloseToNow(2000);
   *   expect(new Date()).toBeDateCloseToNow();
   *   expect(new Date(Date.now() + 1000)).not.toBeDateCloseToNow(2000);
   *   expect(new Date(Date.now() - 1000)).not.toBeDateCloseToNow(2000);
   *
   * @param {Object} ctx Test context.
   * @param {number} max The maximum difference (in milliseconds), defaults to 1000.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateCloseToNow(_ref) {
    var actual = _ref.actual;
    var max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1000;

    var diff = Math.abs(dateDiff(actual, now()));
    return {
      pass: diff <= max,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be close to now'
    };
  }

  /**
   * Check that the tested date object and an actual date object are close.
   *
   * By default, the difference in milliseconds between both dates must not exceed 1000ms,
   * but the last parameter may be set to increase/decrease this value.
   *
   * The tested date and the date to compare may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect date [actual] (not) to be close to [date]
   * @example
   *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500));
   *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 1000);
   *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 100);
   *
   * @param {Object} ctx Test context.
   * @param {Date|number|string} date The second date to compare with.
   * @param {number} max The maximum difference in milliseconds between both dates, default to 1000.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeDateCloseTo(_ref, date) {
    var actual = _ref.actual;
    var max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1000;

    var diff = Math.abs(dateDiff(actual, date));
    return {
      pass: diff <= max,
      message: 'Expect date ' + pp(actual) + ' {{not}} to be close to ' + pp(date)
    };
  }

  /**
   * Check that both dates are the same day (do not compare hours, minutes, etc.).
   *
   * @param {Date|number|string} date1 First date.
   * @param {Date|number|string} date2 Second date.
   * @return {boolean} `true` if both dates are the same day, `false` otherwise.
   */
  function isSameDay(date1, date2) {
    var d1 = parseDate(date1);
    var d2 = parseDate(date2);
    return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
  }

  /**
   * Check that the tested object is the same *day* as an other date.
   *
   * The tested date and the date to compare may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect [actual] (not) the same day as [day]
   * @example
   *   const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
   *   const date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
   *   const date3 = new Date(2014, 5, 6, 10, 0, 0, 0);
   *
   *   expect(date1).toBeSameDay(date2);
   *   expect(date1).not.toBeSameDay(date3);
   *
   * @param {Object} ctx Test context.
   * @param {Date|number|string} day The other date.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeSameDay(_ref, day) {
    var actual = _ref.actual;

    var d1 = parseDate(actual);
    var d2 = parseDate(day);
    return {
      pass: isSameDay(d1, d2),
      message: 'Expect date ' + pp(d1) + ' {{not}} to be same day as ' + pp(d2)
    };
  }

  /**
   * Check that the tested object is the same day as now (i.e `Date.now()`).
   *
   * The tested date may be:
   * - A date instance.
   * - A timestamp.
   * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
   *
   * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
   *
   * @message Expect [actual] (not) to be today
   * @example
   *   const date1 = new Date();
   *   const date2 = new Date();
   *   date2.setDate(date1.getDate() - 1);
   *
   *   expect(date1).toBeToday();
   *   expect(date2).not.toBeToday();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeToday(_ref) {
    var actual = _ref.actual;

    var d1 = parseDate(actual);
    var d2 = now();
    return {
      pass: isSameDay(d1, d2),
      message: 'Expect date ' + pp(d1) + ' {{not}} to be today'
    };
  }

  /**
   * Check that the tested object is DOM element with an expected tag name.
   * The tag name is optional, if not set this matcher will juste check that the actual
   * object is a DOM element.
   *
   * @message
   *   Expect [actual] (not) to be a DOM element
   *   Expect [actual] (not) to be [tagName] element but was [actualTagName]
   *
   * @example
   *   const span = document.createElement('span');
   *   expect(span).toBeDOMElement();
   *   expect(span).toBeDOMElement('span');
   *   expect(span).toBeDOMElement('SPAN');
   *   expect(span).not.toBeDOMElement('div');
   *
   * @param {Object} ctx Test context.
   * @param {string} tagName Expected tag name (optional).
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeDOMElement(_ref, tagName) {
    var actual = _ref.actual;

    var isElement = isDOMElement(actual);

    var msg = 'Expect ' + pp(actual) + ' {{not}} to be a DOM element';
    var ok = isElement;

    // Add more details to the message if it is appropriate.
    if (isString(tagName)) {
      msg = 'Expect ' + pp(actual) + ' {{not}} to be ' + pp(tagName.toUpperCase()) + ' element';
      ok = ok && tagName.toUpperCase() === actual.tagName.toUpperCase();

      if (isElement) {
        msg += ' but was ' + pp(actual.tagName.toUpperCase());
      }
    } else {
      ok = ok && isNil(tagName);
    }

    return {
      pass: ok,
      message: msg
    };
  }

  /**
   * Check that the tested object is a DOM element with an expected id (note that
   * the `id` is retrieved using `getAttribute('id')`).
   *
   * @message Expect [actual] (not) to be a DOM element with id [id] but was [actualId]
   * @example
   *   const span = document.createElement('span');
   *   span.setAttribute('id', 'mySpan');
   *   expect(span).toBeDOMElementWithId('mySpan');
   *
   * @param {Object} ctx Test context.
   * @param {string} id Expected id.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeDOMElementWithId(_ref, id) {
    var actual = _ref.actual;

    var isElement = isDOMElement(actual);

    var ok = isElement;
    var msg = 'Expect ' + pp(actual) + ' {{not}} to be a DOM element';

    if (isElement) {
      var actualId = actual.getAttribute('id');
      msg += ' with id ' + pp(id) + ' but was ' + pp(actualId);
      ok = ok && actualId === id;
    }

    return {
      pass: ok,
      message: msg
    };
  }

  /**
   * Check that the tested object is a DOM element with expected attributes (using
   * the `getAttribute` function).
   *
   * Note that the attribute value can also be a jasmine matcher (`jasmine.any(String)` for example).
   *
   * @message Expect [actual] (not) to be a DOM element with attributes [attributes] but was [actualAttributes]
   * @example
   *   const span = document.createElement('span');
   *   span.setAttribute('foo', 'foo');
   *   span.setAttribute('bar', 'bar');
   *
   *   expect(span).toBeDOMElementWithAttributes({ foo: 'foo', bar: jasmine.any(String) });
   *
   * @param {Object} ctx Test context.
   * @param {Object} attributes Expected attributes.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeDOMElementWithAttributes(_ref, attributes) {
    var actual = _ref.actual,
      equals = _ref.equals;

    var isElement = isDOMElement(actual);

    var msg = 'Expect ' + pp(actual) + ' {{not}} to be a DOM element';
    var ok = isElement;

    if (isElement) {
      var attrs = keys(attributes);
      var actualAttributes = {};

      for (var i = 0, size = attrs.length; i < size; ++i) {
        var key = attrs[i];
        actualAttributes[key] = actual.getAttribute(key);
      }

      ok = ok && equals(attributes, actualAttributes);
      msg += ' with attributes ' + attributes + ' but was ' + actualAttributes;
    }

    return {
      pass: ok,
      message: msg
    };
  }

  /**
    * Apply a predicate function on all the values of an array (also supports array-like
    * objects) and returns an array of all intermediate results.
    *
    * The iteratee function will be called with three arguments:
    *  - `value` The value for the given iteration.
    *  - `index` The index of the value being iterated.
    *  - `array` The array being traversed.
    *
    * @param {Array<*>} array The array to iterate.
    * @param {function} iteratee The iteratee function.
    * @return {Array<*>} Array containing all intermediate results.
    */
  function map(array, iteratee) {
    var results = [];

    for (var i = 0, size = array.length; i < size; ++i) {
      results.push(iteratee.call(null, array[i], i, array));
    }

    return results;
  }

  /**
    * Apply a predicate function on all the values of an array (also supports array-like
    * objects) and returns an array without elements that satisfied the predicate.
    *
    * The iteratee function will be called with three arguments:
    *  - `value` The value for the given iteration.
    *  - `index` The index of the value being iterated.
    *  - `array` The array being traversed.
    *
    * @param {Array<*>} array The array to iterate.
    * @param {function} predicate The filter function.
    * @return {Array<*>} Array without filtered elements.
    */
  function filter(array, predicate) {
    var results = [];

    for (var i = 0, size = array.length; i < size; ++i) {
      if (!predicate.call(null, array[i], i, array)) {
        results.push(array[i]);
      }
    }

    return results;
  }

  var _trim = String.prototype.trim;

  /**
   * Trim a string (use native String#trim function if available).
   *
   * @param {string} str String to trim.
   * @return {string} Trimmed string.
   */
  function trim(str) {
    if (_trim) {
      return _trim.call(str);
    }

    return str.replace(/^\s+|\s+$/g, '');
  }

  /**
   * Check that the tested object is a DOM element with expected class names.
   *
   * @message Expect [actual] (not) to be a DOM element with classes [classes] but was [actualClasses]
   * @example
   *   const span = document.createElement('span');
   *   span.className = 'foo bar';
   *
   *   expect(span).toBeDOMElementWithClasses('foo');
   *   expect(span).toBeDOMElementWithClasses('bar');
   *   expect(span).toBeDOMElementWithClasses('foo bar');
   *   expect(span).toBeDOMElementWithClasses(['foo', 'bar']);
   *
   * @param {Object} ctx Test context.
   * @param {Array<string>|string} classes Expected class names.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeDOMElementWithClasses(_ref, classes) {
    var actual = _ref.actual;

    var isElement = isDOMElement(actual);

    var ok = isElement;
    var msg = 'Expect ' + pp(actual) + ' {{not}} to be a DOM element';

    if (isElement) {
      var classArray = toClassArray(classes);
      var actualClassArray = toClassArray(actual.className);
      var containsAll = every(classArray, function(className) {
        return contains(actualClassArray, className);
      });

      msg += ' with classes ' + pp(classArray) + ' but was ' + pp(actualClassArray);
      ok = ok && containsAll;
    }

    return {
      pass: ok,
      message: msg
    };
  }

  /**
   * Translate a list of class as a string or as an array to a new array where:
   * - Each class name is trimmed.
   * _ Each falsy value is removed.
   *
   * @param {Array<string>|string} classes List of class names.
   * @return {Array<string>} New array of class names.
   */
  function toClassArray(classes) {
    var array = isArray(classes) ? classes : classes.split(' ');
    var trimmedArray = map(array, function(className) {
      return trim(className);
    });
    return filter(trimmedArray, isFalsy);
  }

  /**
   * Check that the tested object is a `boolean` (a `boolean` is exactly `true`
   * or `false`).
   *
   * @message Expect [actual] (not) to be a boolean
   * @example
   *   expect(true).toBeABoolean();
   *   expect(false).toBeABoolean();
   *   expect(null).not.toBeABoolean();
   *   expect(undefined).not.toBeABoolean();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeABoolean(_ref) {
    var actual = _ref.actual;

    return {
      pass: isBoolean(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a boolean'
    };
  }

  /**
   * Check that the tested object is an instance of `Date`.
   *
   * @message Expect [actual] (not) to be a date
   * @example
   *   expect(new Date()).toBeADate();
   *   expect(null).not.toBeADate();
   *   expect(123).not.toBeADate();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeADate(_ref) {
    var actual = _ref.actual;

    return {
      pass: isDate(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a date'
    };
  }

  /**
   * Check that the tested object is a `function`.
   *
   * @message Expect [actual] (not) to be a function
   * @example
   *   expect(() => {}).toBeAFunction();
   *   expect(function() {}).toBeAFunction();
   *   expect(undefined).not.toBeAFunction();
   *   expect(null).not.toBeAFunction();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeAFunction(_ref) {
    var actual = _ref.actual;

    return {
      pass: isFunction(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a function'
    };
  }

  /**
   * Check that the tested object is a `Map`.
   *
   * @message Expect [actual] (not) to be a Map
   * @example
   *   expect(new Map()).toBeAMap();
   *   expect({}).not.toBeAMap();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.3.0
   */
  function toBeAMap(_ref) {
    var actual = _ref.actual;

    return {
      pass: isMap(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a Map'
    };
  }

  /**
   * Check that the tested object is a `number`.
   *
   * @message Expect [actual] (not) to be a number
   * @example
   *  expect(0).toBeANumber();
   *  expect(1).toBeANumber();
   *  expect(1.5).toBeANumber();
   *  expect('0').not.toBeANumber();
   *  expect('1').not.toBeANumber();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeANumber(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a number'
    };
  }

  /**
   * Check that the tested object is a `Set`.
   *
   * @message Expect [actual] (not) to be a Set
   * @example
   *   expect(new Set()).toBeASet();
   *   expect({}).not.toBeASet();
   *   expect([]).not.toBeASet();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.3.0
   */
  function toBeASet(_ref) {
    var actual = _ref.actual;

    return {
      pass: isSet(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a Set'
    };
  }

  /**
   * Check that the tested object is a string.
   *
   * @message Expect [actual] (not) to be a string
   * @example
   *   expect('').toBeAString();
   *   expect('foo').toBeAString();
   *   expect(String('foo')).toBeAString();
   *   expect(false).not.toBeAString();
   *   expect(0).not.toBeAString();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeAString(_ref) {
    var actual = _ref.actual;

    return {
      pass: isString(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a string'
    };
  }

  /**
   * Check that the tested object is an array (a real array, not an array-like object).
   * This matcher will use `Array.isArray` or a fallback if it is not available.
   *
   * @message Expect [actual] (not) to be an array
   * @example
   *   expect([]).toBeAnArray();
   *   expect('123').not.toBeAnArray();
   *   expect(1).not.toBeAnArray();
   *   expect(false).not.toBeAnArray();
   *   expect({}).not.toBeAnArray();
   *   expect(null).not.toBeAnArray();
   *   expect(undefined).not.toBeAnArray();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeAnArray(_ref) {
    var actual = _ref.actual;

    return {
      pass: isArray(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be an array'
    };
  }

  /**
   * Check that a given value is an `arguments` object.
   *
   * @param {*} obj Value to test.
   * @return {boolean} `true` if `obj` is an `arguments` object, `false` otherwise.
   */
  function isArguments(obj) {
    return is(obj, 'Arguments');
  }

  /**
   * Check that the tested object is an `arguments` object.
   *
   * @message Expect [actual] (not) to be arguments
   * @example
   *  expect((function() { return arguments; })()).toBeArguments();
   *  expect([]).not.toBeArguments();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeArguments(_ref) {
    var actual = _ref.actual;

    return {
      pass: isArguments(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be arguments'
    };
  }

  /**
   * Check that the tested object is an iterable value.
   *
   * An iterable value allows is an object that can define or customize its iteration behavior,
   * such as what values are looped over in a `for..of` construct.
   *
   * An iterable value may be:
   * - An `array`.
   * - A `Map`.
   * - A `Set`.
   * - An object that implement the `@@iterator` method.
   *
   * @message Expect [actual] (not) to be iterable
   * @example
   *   expect([]).toBeIterable();
   *   expect(new Map()).toBeIterable();
   *   expect(new Set()).toBeIterable();
   *
   * @param {Object} ctx Test context.
   * @param {*} Klass Expected class.
   * @return {Object} Test result.
   * @since 0.3.0
   */
  function toBeIterable(_ref, Klass) {
    var actual = _ref.actual;

    return {
      pass: isIterable(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be iterable'
    };
  }

  /**
   * Check that the tested object is nil (i.e `null` or `undefined`).
   *
   * @message Expect [actual] (not) to be nil (null or undefined)
   * @example
   *   expect(null).toBeNil();
   *   expect(undefined).toBeNil();
   *   expect(void 0).toBeNil();
   *   expect(false).not.toBeNil();
   *   expect(0).not.toBeNil();
   *   expect(NaN).not.toBeNil();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.3.0
   */
  function toBeNil(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNil(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be nil (null or undefined)'
    };
  }

  /**
   * Check that tested object is `null`.
   *
   * @message Expect [actual] (not) to be null
   * @example
   *   expect(null).toBeNull();
   *   expect(undefined).not.toBeNull();
   *   expect(false).not.toBeNull();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeNull(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNull(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be null'
    };
  }

  /**
   * Check that the tested object is an even number.
   *
   * @message Expect [actual] to be an even number
   * @example
   *   expect(2).toBeEvenNumber();
   *   expect(0).not.toBeEvenNumber();
   *   expect(1).not.toBeEvenNumber();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeEvenNumber(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual) && actual % 2 === 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be an even number'
    };
  }

  /**
   * Check that a given value is a falsy value.
   *
   * @param {*} a Value to check.
   * @return {boolean} `true` if parameter is a falsy value.
   */
  function isFiniteNumber(a) {
    return isNumber(a) && isFinite(a);
  }

  /**
   * Check that the tested object is a finite number.
   *
   * **Important:** This matcher does not convert the tested object to a number, but
   * returns the equivalent of `Number.isFinite` function.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
   *
   * @message Expect [actual] (not) to be finite number
   * @example
   *   expect(1).toBeFiniteNumber();
   *   expect(1.0).toBeFiniteNumber();
   *   expect('1').not.toBeFiniteNumber();
   *   expect(NaN).not.toBeFiniteNumber();
   *   expect(Infinity).not.toBeFiniteNumber();
   *   expect(-Infinity).not.toBeFiniteNumber();
   *   expect(null).not.toBeFiniteNumber();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.5.0
   */
  function toBeFiniteNumber(_ref) {
    var actual = _ref.actual;

    return {
      pass: isFiniteNumber(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be finite number'
    };
  }

  /**
   * Check that a given value is a number or a string representation of
   * a number.
   *
   * @param {*} n Value to test.
   * @return {boolean} `true` if `n` is numeric, `false` otherwise.
   */
  function isNumeric(n) {
    var f = parseFloat(n);
    return !isNaN(f) && isFinite(f);
  }

  /**
   * Check that a given value is an integer value.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is an integer, `false` otherwise.
   */
  function isInteger(obj) {
    return isNumeric(obj) && obj % 1 === 0;
  }

  /**
   * Check that a given value is a float value.
   *
   * @param {*} obj Value to check.
   * @return {boolean} `true` if `obj` is a float, `false` otherwise.
   */
  function isFloat(obj) {
    return isNumeric(obj) && !isInteger(obj);
  }

  /**
   * Check that the tested object is a `float` value.
   *
   * Note that for this matcher, a `float` is a numeric value (see `toBeNumeric` matcher) that
   * is not an integer (a numeric value may be a `number` *or* a `string` containing a number).
   *
   * *JavaScript makes no distinction between integers and floats
   * so 1.0 is considered integer.*
   *
   * @message Expect [actual] (not) to be a float
   * @example
   *   expect(1.5).toBeFloat();
   *   expect('1.5').toBeFloat();
   *   expect(1).not.toBeFloat();
   *   expect(1.0).not.toBeFloat();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeFloat(_ref) {
    var actual = _ref.actual;

    return {
      pass: isFloat(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a float'
    };
  }

  /**
   * Check that the tested object is a `number` (strictly) greater than a lower bound
   * and (strictly) less than a lower bound.
   *
   * @message Expect [actual] (not) to be between [lower] and [upper]
   * @example
   *   expect(2).toBeInRange(1, 3);
   *   expect(1).not.toBeInRange(1, 3);
   *   expect(3).not.toBeInRange(1, 3);
   *
   * @param {Object} ctx Test context.
   * @param {number} lower The lower bound.
   * @param {number} upper The upper bound.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeInRange(_ref, lower, upper) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual) && actual > lower && actual < upper,
      message: 'Expect ' + pp(actual) + ' {{not}} to be between ' + pp(lower) + ' and ' + pp(upper)
    };
  }

  /**
   * Check that the tested object is an `integer` value.
   *
   * Note that for this matcher, an `integer` is a numeric value (see `toBeNumeric` matcher) that
   * is not a `float` (a numeric value may be a `number` *or* a `string` containing a number).
   *
   * *JavaScript makes no distinction between integers and floats so
   * both 1 and 1.0 are considered integers.*
   *
   * @message Expect [actual] (not) to be an integer
   * @example
   *   expect(1).toBeInteger();
   *   expect(1.0).toBeInteger();
   *   expect('1').toBeInteger();
   *   expect('1.0').toBeInteger();
   *   expect(1.5).not.toBeInteger();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeInteger(_ref) {
    var actual = _ref.actual;

    return {
      pass: isInteger(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be an integer'
    };
  }

  /**
   * Check that the tested object is a number strictly less than zero.
   *
   * @message Expect [actual] (not) to be a negative number
   * @example
   *   expect(-1).toBeNegative();
   *   expect(0).not.toBeNegative();
   *   expect(1).not.toBeNegative();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeNegative(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual) && actual < 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be a negative number'
    };
  }

  /**
   * Check that the tested object is a numeric value.
   * A numeric is something that contains a numeric value, regardless of its type (it
   * can be a `string` containing a numeric value or a `number`).
   *
   * @message Expect [actual] (not) to be a numeric value
   * @example
   *   expect(2).toBeNumeric();
   *   expect(1.5).toBeNumeric();
   *   expect('2').toBeNumeric();
   *   expect('1.5').toBeNumeric();
   *   expect('foo').not.toBeNumeric();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeNumeric(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumeric(actual),
      message: 'Expect ' + pp(actual) + ' {{not}} to be a numeric value'
    };
  }

  /**
   * Check that the tested object is an odd number.
   *
   * @message Expect [actual] (not) to be an odd number
   * @example
   *   expect(1).toBeOddNumber();
   *   expect(2).not.toBeOddNumber();
   *   expect(0).not.toBeOddNumber();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeOddNumber(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual) && actual % 2 !== 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be an odd number'
    };
  }

  /**
   * Check that the tested object is a number strictly greater than zero.
   *
   * @message Expect [actual] (not) to be a positive number
   * @example
   *   expect(1).toBePositive();
   *   expect(0).not.toBePositive();
   *   expect(-1).not.toBePositive();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBePositive(_ref) {
    var actual = _ref.actual;

    return {
      pass: isNumber(actual) && actual > 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be a positive number'
    };
  }

  /**
   * Check that the tested object is a number strictly equal to zero.
   *
   * @message Expect [actual] (not) to be zero
   * @example
   *   expect(0).toBeZero();
   *   expect(1).not.toBeZero();
   *   expect('0').not.toBeZero();
   *
   * @param {Object} ctx Test context.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toBeZero(_ref) {
    var actual = _ref.actual;

    return {
      pass: actual === 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to be zero'
    };
  }

  /**
   * Check that the tested object is partially equals to a second one.
   * Note that this matcher works fine with custom equality matchers.
   *
   * @message Expect [actual] (not) to be partially equal to [other]
   * @example
   *   const a1 = { id: 1, foo: 'bar' };
   *   const a2 = { id: 2, foo: 'bar' };
   *
   *   const b1 = { id: 1 };
   *   const b2 = { id: 2 };
   *
   *   const c1 = { id: 2 };
   *   const c2 = { id: 2 };
   *
   *   const array1 = [a1, a2];
   *   const array2 = [b1, b2];
   *   const array3 = [c1, c2];
   *   expect(array1).toBePartiallyEqualTo(array2);
   *   expect(array1).not.toBePartiallyEqualTo(array3);
   *
   * @param {Object} ctx Test context.
   * @param {Array<*>|Object} other The second object to use for equality.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBePartiallyEqualTo(_ref, other) {
    var actual = _ref.actual,
      equals = _ref.equals;

    var pass = false;

    if (isArray(other) && isArray(actual)) {
      pass = checkArray(actual, other, equals);
    } else if (isObject(other) && isObject(actual)) {
      pass = checkObject(actual, other, equals);
    }

    return {
      pass: pass,
      message: 'Expect ' + pp(actual) + ' {{not}} to be partially equal to ' + pp(other)
    };
  }

  /**
   * Check that two array are equals, using a partial comparison between
   * values in array.
   *
   * @param {Array<*>} a First array.
   * @param {Array<*>} b Second array.
   * @param {function} equalsFunction The equality function.
   * @return {boolean} `true` if first array is partially equals to second array.
   */
  function checkArray(a, b, equalsFunction) {
    if (a.length !== b.length) {
      return false;
    }

    return every(b, function(current, i) {
      return equalsFunction(a[i], jasmine.objectContaining(current));
    });
  }

  /**
   * Check that two objects are equals, using a partial comparison between
   * objects.
   *
   * @param {Array<*>} a First object.
   * @param {Array<*>} b Second object.
   * @param {function} equalsFunction The equality function.
   * @return {boolean} `true` if first object is partially equals to second object.
   */
  function checkObject(a, b, equalsFunction) {
    return equalsFunction(a, jasmine.objectContaining(b));
  }

  /**
   * Check that actual object contains all given expected functions.
   *
   * @message Expect [actual] (not) to contain functions [methods]
   * @example
   *   const foo = jasmine.createSpy('foo');
   *   const bar = jasmine.createSpy('bar');
   *   const obj = { id: 1, name: 'foo', foo, bar };
   *
   *   expect(obj).toHaveFunctions('foo', 'bar');
   *   expect(obj).not.toHaveFunctions('id', 'name');
   *
   * @param {Object} ctx Test context containing tested object.
   * @param {...string} methods List of methods to look for.
   * @return {Object} Matcher result.
   * @since 0.1.0
   */
  function toHaveFunctions(_ref) {
    var actual = _ref.actual;

    for (var _len = arguments.length, methods = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      methods[_key - 1] = arguments[_key];
    }

    var ok = every(methods, function(method) {
      return isFunction(actual[method]);
    });
    return {
      pass: ok,
      message: 'Expect object ' + pp(actual) + ' {{not}} to contain functions ' + pp(methods)
    };
  }

  /**
   * Check that actual object contains all given expected keys.
   *
   * @message Expect [actual] (not) to have keys [expectedKeys]
   * @example
   *   const obj = { id: 1, name: 'foo' };
   *   expect(obj).toHaveKeys('id', 'name');
   *   expect(obj).not.toHaveKeys('foo', 'bar');
   *
   * @param {Object} ctx Test context containing tested object.
   * @param {...string} expectedKeys Keys to look for in tested object.
   * @return {Object} Matcher result.
   * @since 0.1.0
   */
  function toHaveKeys(_ref) {
    var actual = _ref.actual;

    var actualKeys = keys(actual);

    for (var _len = arguments.length, expectedKeys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expectedKeys[_key - 1] = arguments[_key];
    }

    var size = expectedKeys.length;

    var ok = true;
    for (var i = 0; i < size; ++i) {
      if (!contains(actualKeys, expectedKeys[i])) {
        ok = false;
        break;
      }
    }

    return {
      pass: ok,
      message: 'Expect ' + pp(actual) + ' {{not}} to have keys ' + pp(expectedKeys)
    };
  }

  /**
   * Check that tested object has the same size as an other one.
   *
   * A size may be computed from:
   * - An array (or an array-like object) with the `length` property.
   * - A `Map` or a `Set` using its `size` property.
   * - Any iterable object (using a `for..of` loop).
   * - An object (number of own enumerable properties).
   *
   * @message Expect [actual] to have same size as [expected]
   * @example
   *   expect('foo').toHaveSameSizeAs('foo');
   *   expect('bar').toHaveSameSizeAs({ b: 1, a: 1, r: 1 });
   *   expect([ 'foo', 'bar' ]).toHaveSameSizeAs(new Set(['foo', 'bar']));
   *
   * @param {Object} ctx Test context.
   * @param {*} expected The other object (or array, or array-like object).
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveSameSizeAs(_ref, expected) {
    var actual = _ref.actual;

    var actualSize = sizeOf(actual);
    var expectedSize = sizeOf(expected);
    return {
      pass: actualSize === expectedSize,
      message: 'Expect ' + pp(actual) + ' {{not}} to have same size as ' + pp(expected)
    };
  }

  /**
   * Check that tested object has an expected size.
   *
   * A size may be computed from:
   * - An array (or an array-like object) with the `length` property.
   * - A `Map` or a `Set` using its `size` property.
   * - Any iterable object (using a `for..of` loop).
   * - An object (number of own enumerable properties).
   *
   * @message Expect size of [actual] (not) to be [expectedSize]
   * @example
   *   expect([1, 2, 3]).toHaveSize(3);
   *   expect('foo bar').toHaveSize(7);
   *   expect(new Set([0, 1, 2])).toHaveSize(3);
   *   expect({ foo: 'bar' }).toHaveSize(1);
   *
   * @param {Object} ctx Test context.
   * @param {number} expectedSize The expected size.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveSize(_ref, expectedSize) {
    var actual = _ref.actual;

    var size = sizeOf(actual);
    return {
      pass: size === expectedSize,
      message: 'Expect size of ' + pp(actual) + ' {{not}} to be ' + pp(expectedSize) + ' ' + ('but was ' + pp(size))
    };
  }

  /**
   * Get all values of object.
   * This function also support `Map` instances.
   *
   * @param {Map|Object} obj The object.
   * @return {Array<*>} Array of all values.
   */
  function values(obj) {
    return isMap(obj) ? mapValues(obj) : objectValues(obj);
  }

  /**
   * Get all object values.
   *
   * @param {Object} obj Object.
   * @return {Array<*>} Object values.
   */
  function objectValues(obj) {
    var vals = [];

    for (var i in obj) {
      if (has(obj, i)) {
        vals.push(obj[i]);
      }
    }

    return vals;
  }

  /**
   * Get all map values.
   *
   * @param {Map} map Map instance.
   * @return {Array<*>} Map values.
   */
  function mapValues(map) {
    // IE11 on Win10 does not support `keys` function, so
    // use the good old `forEach` function.
    var allValues = [];
    map.forEach(function(x) {
      return allValues.push(x);
    });
    return allValues;
  }

  /**
   * Check that the tested object contains expected values (the key is not checked,
   * only the value).
   *
   * @message Expect [actual] (not) to have values [values]
   * @example
   *   const obj = { id: 1, name: 'foo', array: [1, 2, 3] };
   *   expect(obj).toHaveValues(1, 'foo', [1, 2, 3]);
   *   expect(obj).not.toHaveValues(2, 'bar');
   *   expect(obj).not.toHaveValues([ 1, 2, 3, 4 ]);
   *
   * @param {Object} ctx The test context.
   * @param {...*} expectedValues The values to look for.
   * @return {Object} The test result.
   * @since 0.1.0
   */
  function toHaveValues(_ref) {
    var actual = _ref.actual,
      equals = _ref.equals;

    var actualValues = values(actual);

    var ok = true;

    for (var _len = arguments.length, expectedValues = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expectedValues[_key - 1] = arguments[_key];
    }

    for (var i = 0, size = expectedValues.length; i < size; ++i) {
      if (!contains(actualValues, expectedValues[i], equals)) {
        ok = false;
        break;
      }
    }

    return {
      pass: ok,
      message: 'Expect ' + pp(actual) + ' {{not}} to have values ' + pp(expectedValues)
    };
  }

  /**
   * Check that the tested object is a spy that has been called once (and exactly
   * once) with expected arguments.
   *
   * @message
   *   Expect [actual] to have been called once but was called [count] time(s)
   *   Expect [actual] to have been called once but was called [count] time(s) with different arguments
   *
   * @example
   *   const spy = jasmine.createSpy('foo');
   *   expect(spy).not.toHaveBeenCalledOnce();
   *
   *   spy('foo');
   *   expect(spy).toHaveBeenCalledOnceWith('foo');
   *   expect(spy).not.toHaveBeenCalledOnceWith('bar');
   *
   * @param {Object} ctx Test context.
   * @param {...*} args Expected call arguments.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveBeenCalledOnceWith(_ref) {
    var actual = _ref.actual,
      callCount = _ref.callCount,
      equals = _ref.equals,
      argsFor = _ref.argsFor;

    var count = callCount(actual) || 0;
    var wasCalledOnce = count === 1;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var ok = wasCalledOnce && equals(argsFor(actual, 0), args);
    var msg = wasCalledOnce && !ok ? ' with different arguments' : '';
    var error = 'Expect ' + pp(actual) + ' {{not}} to have been called once but ' + ('was called ' + pp(count) + ' time(s)' + msg);

    return {
      pass: ok,
      message: error
    };
  }

  /**
   * Check that the tested object is a spy that has been called once (and only once).
   *
   * @message Expect [actual] (not) to have been called once but was called [count] time(s)
   * @example
   *   const spy = jasmine.createSpy('foo');
   *   expect(spy).not.toHaveBeenCalledOnce();
   *
   *   spy();
   *   expect(spy).toHaveBeenCalledOnce();
   *
   *   spy();
   *   expect(spy).not.toHaveBeenCalledOnce();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toHaveBeenCalledOnce(_ref) {
    var callCount = _ref.callCount,
      actual = _ref.actual;

    var count = callCount(actual) || 0;
    return {
      pass: count === 1,
      message: 'Expect ' + pp(actual) + ' {{not}} to have been called once but ' + ('was called ' + pp(count) + ' time(s)')
    };
  }

  /**
   * Check that the tested object is an empty string (a `string` equals to `''`).
   *
   * @message Expect [actual] (not) to be an empty string
   * @example
   *   expect('').toBeAnEmptyString();
   *   expect('  ').not.toBeAnEmptyString();
   *   expect('foo').not.toBeAnEmptyString();
   *
   * @param {Object} ctx Test context.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toBeAnEmptyString(_ref) {
    var actual = _ref.actual;

    return {
      pass: isString(actual) && actual === '',
      message: 'Expect ' + pp(actual) + ' {{not}} to be an empty string'
    };
  }

  /**
   * Check that the tested object is a `string` and end with an expected suffix.
   *
   * @message Expect [actual] (not) to end with [suffix]
   * @example
   *   expect('foo').toEndWith('o');
   *   expect('foo').toEndWith('oo');
   *   expect('foo').toEndWith('foo');
   *   expect('foo').not.toEndWith('bar');
   *
   * @param {Object} ctx Test context.
   * @param {string} suffix The suffix to look for.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toEndWith(_ref, suffix) {
    var actual = _ref.actual;

    var ok = isString(suffix) && isString(actual) && actual.length >= suffix.length && actual.indexOf(suffix, actual.length - suffix.length) !== -1;

    return {
      pass: ok,
      message: 'Expect ' + pp(actual) + ' {{not}} to end with ' + pp(suffix)
    };
  }

  /**
   * Check that the tested object is a `string` equal to an other `string`: comparison is
   * case-insensitive.
   *
   * @message Expect [actual] (not) to be equal to [other] (case insensitive)
   * @example
   *   expect('foo').toEqualIgnoringCase('foo');
   *   expect('foo').toEqualIgnoringCase('FOO');
   *   expect('foo').not.toEqualIgnoringCase('bar');
   *
   * @param {Object} ctx Test context.
   * @param {string} other Other string to compare.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toEqualIgnoringCase(_ref, other) {
    var actual = _ref.actual;

    return {
      pass: isString(other) && isString(actual) && actual.toLowerCase() === other.toLowerCase(),
      message: 'Expect ' + pp(actual) + ' {{not}} to be equal to ' + pp(other) + ' (case insensitive)'
    };
  }

  /**
   * Check that the tested object is a string and start with an expected prefix.
   *
   * @message Expect [actual] (not) to start with [prefix]
   * @example
   *   expect('foo').toStartWith('f');
   *   expect('foo').toStartWith('fo');
   *   expect('foo').toStartWith('foo');
   *   expect('foo').not.toStartWith('bar');
   *
   * @param {Object} ctx Test context.
   * @param {string} prefix The prefix to look for.
   * @return {Object} Test result.
   * @since 0.1.0
   */
  function toStartWith(_ref, prefix) {
    var actual = _ref.actual;

    return {
      pass: isString(prefix) && isString(actual) && actual.indexOf(prefix) === 0,
      message: 'Expect ' + pp(actual) + ' {{not}} to start with ' + pp(prefix)
    };
  }

  // any

  /**
   * Spy a method on an object if and only if it is not already a spy.
   * The spy (or the new created spy) is returned.
   *
   * @param {Object} obj Object.
   * @param {string} method Name of the method on the object to spy.
   * @return {function} The spy.
   */
  function spyIf(obj, method) {
    if (!jasmine.isSpy(obj[method])) {
      spyOn(obj, method);
    }

    return obj[method];
  }

  /**
   * Index all elements in the array and return the result.
   *
   * @param {Array<*>} array Array to index.
   * @param {function} iteratee The predicate that return the index value.
   * @return {Object} The result as a map object.
   */
  function index(array, iteratee) {
    var map = {};
    var size = array.length;

    for (var i = 0; i < size; ++i) {
      map[iteratee(array[i], i, array)] = array[i];
    }

    return map;
  }

  /**
   * Iterate over all entries in object and execute iterator function on it.
   *
   * @param {*} obj Object to iterate over.
   * @param {function} iterator Iterator function.
   * @return {void}
   */
  function forEachWritableProperties(obj, iterator) {
    if (!isNil(obj)) {
      (function() {
        var current = obj;

        // Create a Set, with a fallback for old browsers without `Set` structure.
        var foundProps = typeof Set === 'undefined' ? new ArraySet() : new Set();

        while (current) {
          // First, use the for .. in loop.
          // eslint-disable-next-line guard-for-in
          for (var i in current) {
            var prop = current[i];
            if (!foundProps.has(prop)) {
              foundProps.add(prop);
              iterator(current, i);
            }
          }

          // Spy non enumerable properties.
          // Object.getOwnPropertyNames is supported since IE9.
          if (Object.getOwnPropertyNames) {
            (function() {
              // Be careful, some browsers (like PhantomJS) may return restricted property
              // such as `arguments` or `caller` that cannot be read.
              var props = filter(Object.getOwnPropertyNames(current), function(name) {
                try {
                  current[name];
                  return false;
                } catch (e) {
                  return true;
                }
              });

              if (!current.prototype && Object.getPrototypeOf) {
                var getProtoResult = Object.getPrototypeOf(current);
                if (getProtoResult !== Object.getPrototypeOf({})) {
                  forEach(Object.getOwnPropertyNames(getProtoResult), function(p) {
                    if (p !== 'constructor' && indexOf(props, p) === -1) {
                      props.push(p);
                    }
                  });
                }
              }

              var size = props.length;
              for (var _i = 0; _i < size; ++_i) {
                var propName = props[_i];
                var _prop = current[propName];

                // Handle property if it is has not been seen yet.
                if (propName !== 'prototype' && !foundProps.has(_prop)) {
                  var descriptor = Object.getOwnPropertyDescriptor(current, propName) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(current), propName);

                  if (descriptor.writable) {
                    foundProps.add(_prop);
                    iterator(current, propName);
                  }
                }
              }
            })();
          }

          // Go up in the prototype chain.
          if (current.prototype) {
            current = current.prototype;
          } else {
            current = null;
          }
        }
      })();
    }
  }

  /**
   * Fallback implementation for set ES6 datastructure.
   */

  var ArraySet = function() {
    /**
     * Create the new Set.
     */
    function ArraySet() {
      classCallCheck(this, ArraySet);

      this.o = [];
    }

    /**
     * Check that given value has been added to the set.
     * @param {*} x Value to check.
     * @return {boolean} `true` if `x` is in the set, false otherwise.
     */


    ArraySet.prototype.has = function has(x) {
      return indexOf(this.o, x) >= 0;
    };

    /**
     * Add new value to the set.
     * @param {*} x Value to add.
     * @return {ArraySet} The current set.
     */


    ArraySet.prototype.add = function add(x) {
      this.o.push(x);
      return this;
    };

    return ArraySet;
  }();

  /**
   * Reset a spy.
   *
   * @param {function} spy The spy to reset.
   * @return {void}
   */
  function reset(spy) {
    if (version === 1) {
      spy.reset();
    } else {
      spy.calls.reset();
    }
  }

  /**
   * Reset all spy methods in object except given methods.
   *
   * @param {Object} obj The object to reset.
   * @param {Array<string>|string} methods The method or the array of methods to ignore.
   * @return {Object} The spy object.
   */
  function resetAllExcept(obj) {
    var methods = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];

    var array = isArray(methods) ? methods : [methods];
    var map = index(array, function(x) {
      return x;
    });

    forEachWritableProperties(obj, function(target, i) {
      var spy = target[i];
      if (jasmine.isSpy(spy) && !has(map, i)) {
        reset(spy);
      }
    });

    return obj;
  }

  /**
   * Reset the specified spy methods in the object.
   *
   * @param {Object} obj The object to reset.
   * @param {Array<string>|string} methods The method or the array of methods to reset.
   * @return {Object} The spy object.
   */
  function resetEach(obj) {
    var methods = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];

    var array = isArray(methods) ? methods : [methods];
    var map = index(array, function(x) {
      return x;
    });

    forEachWritableProperties(obj, function(target, i) {
      var spy = target[i];
      if (jasmine.isSpy(spy) && has(map, i)) {
        reset(spy);
      }
    });

    return obj;
  }

  /**
   * Reset all spy methods in object.
   *
   * @param {Object} obj The object to reset.
   * @return {Object} The spy object.
   */
  function resetAll(obj) {
    return resetAllExcept(obj, []);
  }

  /**
   * Spy a method on an object if and only if it is not already a spy.
   * The spy (or the new created spy) is returned.
   *
   * @param {Object} obj Object.
   * @param {string} i The name of the method to spy.
   * @return {*} The spy, or the original value if it is alreay a spy or it cannot be spied.
   */
  function spyIfAndCallThrough(obj, i) {
    var current = obj[i];

    if (isFunction(current) && !jasmine.isSpy(current)) {
      var spy = spyOn(obj, i);
      if (version === 1) {
        spy.andCallThrough();
      } else {
        spy.and.callThrough();
      }

      return spy;
    }

    return current;
  }

  /**
   * Spy all methods in object except specified methods.
   *
   * @param {Object} obj Object to spy.
   * @param {Array<string>|string} excepts The method or the array of methods to ignore.
   * @return {Object} The spy object.
   */
  function spyAllExcept(obj) {
    var excepts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];

    var array = isArray(excepts) ? excepts : [excepts];
    var map = index(array, function(x) {
      return x;
    });

    forEachWritableProperties(obj, function(target, i) {
      if (!has(map, i)) {
        spyIfAndCallThrough(target, i);
      }
    });

    return obj;
  }

  /**
   * Spy all specified methods in object.
   *
   * @param {Object} obj Object to spy.
   * @param {Array<string>|string} methods The method or the array of methods to spy.
   * @return {Object} The spy object.
   */
  function spyEach(obj) {
    var methods = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];

    var array = isArray(methods) ? methods : [methods];
    var isEmpty = array.length === 0;
    var map = index(array, function(x) {
      return x;
    });

    forEachWritableProperties(obj, function(target, i) {
      if (isEmpty || has(map, i)) {
        spyIfAndCallThrough(target, i);
      }
    });

    return obj;
  }

  /**
   * Spy methods in object.
   *
   * @param {Object} obj The object to spy.
   * @return {Object} The spy object.
   */
  function spyAll(obj) {
    return spyAllExcept(obj, []);
  }

  // Expose utility functions.
  jasmine.spyIf = spyIf;
  jasmine.resetAll = resetAll;
  jasmine.resetAllExcept = resetAllExcept;
  jasmine.resetEach = resetEach;
  jasmine.spyAll = spyAll;
  jasmine.spyAllExcept = spyAllExcept;
  jasmine.spyEach = spyEach;

  // Create matchers and add it to the current jasmine environment.
  var jasmineMatchers = {
    // any
    toBeEmpty: createMatcher(toBeEmpty),
    toBeExtensible: createMatcher(toBeExtensible),
    toBeFrozen: createMatcher(toBeFrozen),
    toBeInstanceOf: createMatcher(toBeInstanceOf),
    toBeOneOf: createMatcher(toBeOneOf),
    toBeSealed: createMatcher(toBeSealed),
    toEqualOneOf: createMatcher(toEqualOneOf),

    // arrays
    toBeSorted: createMatcher(toBeSorted),
    toContainsDistinctValues: createMatcher(toContainsDistinctValues),
    toContainsOnlyFalsyValues: createMatcher(toContainsOnlyFalsyValues),
    toContainsOnlyTruthyValues: createMatcher(toContainsOnlyTruthyValues),
    toHaveLength: createMatcher(toHaveLength),
    toHaveSameLengthAs: createMatcher(toHaveSameLengthAs),
    toHaveSome: createMatcher(toHaveSome),
    toVerify: createMatcher(toVerify),

    // booleans
    toBeTrue: createMatcher(toBeTrue),
    toBeFalse: createMatcher(toBeFalse),

    // dates
    toBeDateAfterNow: createMatcher(toBeDateAfterNow),
    toBeDateAfter: createMatcher(toBeDateAfter),
    toBeDateBeforeNow: createMatcher(toBeDateBeforeNow),
    toBeDateBefore: createMatcher(toBeDateBefore),
    toBeDateCloseToNow: createMatcher(toBeDateCloseToNow),
    toBeDateCloseTo: createMatcher(toBeDateCloseTo),
    toBeSameDay: createMatcher(toBeSameDay),
    toBeToday: createMatcher(toBeToday),

    // dom
    toBeDOMElementWithAttributes: createMatcher(toBeDOMElementWithAttributes),
    toBeDOMElementWithClasses: createMatcher(toBeDOMElementWithClasses),
    toBeDOMElementWithId: createMatcher(toBeDOMElementWithId),
    toBeDOMElement: createMatcher(toBeDOMElement),

    // lang
    toBeABoolean: createMatcher(toBeABoolean),
    toBeADate: createMatcher(toBeADate),
    toBeAFunction: createMatcher(toBeAFunction),
    toBeAMap: createMatcher(toBeAMap),
    toBeANumber: createMatcher(toBeANumber),
    toBeASet: createMatcher(toBeASet),
    toBeAString: createMatcher(toBeAString),
    toBeAnArray: createMatcher(toBeAnArray),
    toBeArguments: createMatcher(toBeArguments),
    toBeIterable: createMatcher(toBeIterable),
    toBeNil: createMatcher(toBeNil),
    toBeNull: createMatcher(toBeNull),

    // numbers
    toBeEvenNumber: createMatcher(toBeEvenNumber),
    toBeFiniteNumber: createMatcher(toBeFiniteNumber),
    toBeFloat: createMatcher(toBeFloat),
    toBeInRange: createMatcher(toBeInRange),
    toBeInteger: createMatcher(toBeInteger),
    toBeNegative: createMatcher(toBeNegative),
    toBeNumeric: createMatcher(toBeNumeric),
    toBeOddNumber: createMatcher(toBeOddNumber),
    toBePositive: createMatcher(toBePositive),
    toBeZero: createMatcher(toBeZero),

    // objects
    toBePartiallyEqualTo: createMatcher(toBePartiallyEqualTo),
    toHaveFunctions: createMatcher(toHaveFunctions),
    toHaveKeys: createMatcher(toHaveKeys),
    toHaveSameSizeAs: createMatcher(toHaveSameSizeAs),
    toHaveSize: createMatcher(toHaveSize),
    toHaveValues: createMatcher(toHaveValues),

    // spies
    toHaveBeenCalledOnceWith: createMatcher(toHaveBeenCalledOnceWith),
    toHaveBeenCalledOnce: createMatcher(toHaveBeenCalledOnce),

    // strings
    toBeAnEmptyString: createMatcher(toBeAnEmptyString),
    toEndWith: createMatcher(toEndWith),
    toEqualIgnoringCase: createMatcher(toEqualIgnoringCase),
    toStartWith: createMatcher(toStartWith)
  };

  /**
   * Create a deprecated method (will log a warning before executing the function).
   *
   * @param {string} name Name of the deprecated method.
   * @param {string} alternative Name of the new method to use.
   * @param {function} func The new method to use.
   * @return {function} The deprecated method.
   */
  function createDeprecated(name, alternative, func) {
    return function() {
      console.warn('Matcher "' + name + '" is deprecated and will be removed, please use "' + alternative + '" instead.');
      return func.apply(void 0, arguments);
    };
  }

  var deprecateds = {
    toStartsWith: 'toStartWith',
    toEndsWith: 'toEndWith',
    toEqualsIgnoringCase: 'toEqualIgnoringCase',
    toBePartiallyEqualsTo: 'toBePartiallyEqualTo'
  };

  forEach(keys(deprecateds), function(name) {
    var alternative = deprecateds[name];
    var func = jasmineMatchers[alternative];
    jasmineMatchers[name] = createDeprecated(name, alternative, func);
  });

  /**
   * The `beforeEach` function executed by Jasmine before each tests that addMatchers
   * all custom matchers.
   *
   * @return {void}
   */
  function jasmineUtilBeforeEach() {
    if (version === 1) {
      // eslint-disable-next-line no-invalid-this
      this.addMatchers(jasmineMatchers);
    } else {
      jasmine.addMatchers(jasmineMatchers);
    }
  }

  beforeEach(jasmineUtilBeforeEach);

}());
