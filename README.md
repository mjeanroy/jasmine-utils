jasmine-utils
=============

[![Greenkeeper badge](https://badges.greenkeeper.io/mjeanroy/jasmine-utils.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/mjeanroy/jasmine-utils.svg?branch=master)](https://travis-ci.org/mjeanroy/jasmine-utils)
[![GitHub version](https://badge.fury.io/gh/mjeanroy%2Fjasmine-utils.svg)](https://badge.fury.io/gh/mjeanroy%2Fjasmine-utils)
[![Npm version](https://badge.fury.io/js/jasmine-utils.svg)](https://badge.fury.io/js/jasmine-utils)
[![Bower version](https://badge.fury.io/bo/jasmine-utils.svg)](https://badge.fury.io/bo/jasmine-utils)

Jasmine-Utils is a set of custom matchers that I used in my previous projects.

Jasmine-Utils is compatible with __Jasmine 1.3__ and __Jasmine 2.0__.

## Utils Functions

- `jasmine.spyAll(object)`
  - Spy all functions of given object.
  - Spies are configured with `callThrough`

```javascript
it('should spy all methods', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  jasmine.spyAll(obj);

  expect(obj.method1).not.toHaveBeenCalled();
  expect(obj.method2).not.toHaveBeenCalled();
});
```

- `jasmine.spyIf(function)`
  - Spy function if and only if function is not already a spy.
  - Spy is returned.

```javascript
it('should spy method once', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  jasmine.spyIf(obj, 'method1');
  jasmine.spyIf(obj, 'method1');
});
```

- `jasmine.spyAllExcept(object, [excepts])`
  - Spy all functions of given object, excepts function names given in array (second arguments).
  - Spies are configured with `callThrough`

```javascript
it('should spy selected method', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  jasmine.spyAllExcept(obj, 'method2');
});
```

- `jasmine.spyEach(object, [only])`
  - Spy all functions of given object that are specified in array as second arguments.
  - Spies are configured with `callThrough`

```javascript
it('should spy selected method', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    },
    method3: function() {
    }
  };

  jasmine.spyEach(obj, ['method1', 'method2']);
});
```

- `jasmine.resetAll(object)`
  - Reset all spy of given object.

```javascript
it('should reset all methods', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  spyOn(obj, 'method1');
  spyOn(obj, 'method2');

  obj.method1();
  obj.method2();

  expect(obj.method1).toHaveBeenCalled();
  expect(obj.method2).toHaveBeenCalled();

  jasmine.resetAll(obj);

  expect(obj.method1).not.toHaveBeenCalled();
  expect(obj.method2).not.toHaveBeenCalled();
});
```

- `jasmine.resetEach(object, [methods])`
  - Reset each specified spies of given object.

```javascript
it('should reset all methods', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  spyOn(obj, 'method1');
  spyOn(obj, 'method2');

  obj.method1();
  obj.method2();

  expect(obj.method1).toHaveBeenCalled();
  expect(obj.method2).toHaveBeenCalled();

  jasmine.resetEach(obj, ['method1']);

  expect(obj.method1).not.toHaveBeenCalled();
  expect(obj.method2).toHaveBeenCalled();
});
```

- `jasmine.resetAllExcept(object, [methods])`
  - Reset all spies of given object except specified methods.

```javascript
it('should reset all methods', function() {
  var obj = {
    id: 1,
    method1: function() {
    },
    method2: function() {
    }
  };

  spyOn(obj, 'method1');
  spyOn(obj, 'method2');

  obj.method1();
  obj.method2();

  expect(obj.method1).toHaveBeenCalled();
  expect(obj.method2).toHaveBeenCalled();

  jasmine.resetAllExcept(obj, ['method1']);

  expect(obj.method1).toHaveBeenCalled();
  expect(obj.method2).not.toHaveBeenCalled();
});
```

## Matchers

### toBeABoolean

Check that the tested object is a `boolean` (a `boolean` is exactly `true`
or `false`).

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a boolean`

#### Example:

```javascript
expect(true).toBeABoolean();
expect(false).toBeABoolean();
expect(null).not.toBeABoolean();
expect(undefined).not.toBeABoolean();
```

### toBeADate

Check that the tested object is an instance of `Date`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a date`

#### Example:

```javascript
expect(new Date()).toBeADate();
expect(null).not.toBeADate();
expect(123).not.toBeADate();
```

### toBeAFunction

Check that the tested object is a `function`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a function`

#### Example:

```javascript
expect(() => {}).toBeAFunction();
expect(function() {}).toBeAFunction();
expect(undefined).not.toBeAFunction();
expect(null).not.toBeAFunction();
```

### toBeAMap

Check that the tested object is a `Map`.

#### Since

0.3.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a Map`

#### Example:

```javascript
expect(new Map()).toBeAMap();
expect({}).not.toBeAMap();
```

### toBeANumber

Check that the tested object is a `number`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a number`

#### Example:

```javascript
expect(0).toBeANumber();
expect(1).toBeANumber();
expect(1.5).toBeANumber();
expect('0').not.toBeANumber();
expect('1').not.toBeANumber();
```

### toBeASet

Check that the tested object is a `Set`.

#### Since

0.3.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a Set`

#### Example:

```javascript
expect(new Set()).toBeASet();
expect({}).not.toBeASet();
expect([]).not.toBeASet();
```

### toBeAString

Check that the tested object is a string.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a string`

#### Example:

```javascript
expect('').toBeAString();
expect('foo').toBeAString();
expect(String('foo')).toBeAString();
expect(false).not.toBeAString();
expect(0).not.toBeAString();
```

### toBeAnArray

Check that the tested object is an array (a real array, not an array-like object).
This matcher will use `Array.isArray` or a fallback if it is not available.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be an array`

#### Example:

```javascript
expect([]).toBeAnArray();
expect('123').not.toBeAnArray();
expect(1).not.toBeAnArray();
expect(false).not.toBeAnArray();
expect({}).not.toBeAnArray();
expect(null).not.toBeAnArray();
expect(undefined).not.toBeAnArray();
```

### toBeAnEmptyString

Check that the tested object is an empty string (a `string` equals to `''`).

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be an empty string`

#### Example:

```javascript
expect('').toBeAnEmptyString();
expect('  ').not.toBeAnEmptyString();
expect('foo').not.toBeAnEmptyString();
```

### toBeDateAfterNow

Check that the tested date object is a date "after" `now`.

The tested date may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect date [actual] (not) to be after now`

#### Example:

```javascript
expect(Date.now() + 1000).toBeDateAfterNow();
expect(new Date(Date.now() + 1000)).toBeDateAfterNow();
expect(new Date(Date.now() - 1000)).not.toBeDateAfterNow();
```

### toBeDateAfter

Check that the tested date object is a date "after" an other date.

The tested date and the date to compare may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `lower` | `Date,number,string` | The lower bound. |

#### Message

`Expect date [actual] (not) to be after [lower]`

#### Example:

```javascript
expect(Date.now()).toBeDateAfter(Date.now() - 1000));
expect(Date.now() - 1000).toBeDateAfter(Date.now()));
```

### toBeDateBeforeNow

Check that the tested date object is a date "before" `now`.

The tested date may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect date [actual] (not) to be before now`

#### Example:

```javascript
expect(Date.now() - 1000).toBeDateBeforeNow();
expect(new Date(Date.now() - 1000)).toBeDateBeforeNow();
expect(new Date(Date.now() + 1000)).not.toBeDateBeforeNow();
```

### toBeDateBefore

Check that the tested date object is a date "before" an other date.

The tested date and the date to compare may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `upper` | `Date,number,string` | The upper bound. |

#### Message

`Expect date [actual] (not) to be before [lower]`

#### Example:

```javascript
expect(Date.now()).toBeDateBefore(Date.now() + 1000));
expect(Date.now() + 1000).toBeDateBefore(Date.now()));
```

### toBeDateCloseToNow

Check that the tested object is a date close to 'now'.

The tested date may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `max` | `number` | The maximum difference (in milliseconds), defaults to 1000. |

#### Message

`Expect date [actual] (not) to be close to now`

#### Example:

```javascript
expect(Date.now()).toBeDateCloseToNow();
expect(Date.now() + 1000).toBeDateCloseToNow(2000);
expect(Date.now() - 1000).toBeDateCloseToNow(2000);
expect(new Date()).toBeDateCloseToNow();
expect(new Date(Date.now() + 1000)).not.toBeDateCloseToNow(2000);
expect(new Date(Date.now() - 1000)).not.toBeDateCloseToNow(2000);
```

### toBeDateCloseTo

Check that the tested date object and an actual date object are close.

By default, the difference in milliseconds between both dates must not exceed 1000ms,
but the last parameter may be set to increase/decrease this value.

The tested date and the date to compare may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date,number,string` | The second date to compare with. |
| `max` | `number` | The maximum difference in milliseconds between both dates, default to 1000. |

#### Message

`Expect date [actual] (not) to be close to [date]`

#### Example:

```javascript
expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500));
expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 1000);
expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 100);
```

### toBeDOMElementWithAttributes

Check that the tested object is a DOM element with expected attributes (using
the `getAttribute` function).

Note that the attribute value can also be a jasmine matcher (`jasmine.any(String)` for example).

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `attributes` | `Object` | Expected attributes. |

#### Message

`Expect [actual] (not) to be a DOM element with attributes [attributes] but was [actualAttributes]`

#### Example:

```javascript
const span = document.createElement('span');
span.setAttribute('foo', 'foo');
span.setAttribute('bar', 'bar');

expect(span).toBeDOMElementWithAttributes({ foo: 'foo', bar: jasmine.any(String) });
```

### toBeDOMElementWithClasses

Check that the tested object is a DOM element with expected class names.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `classes` | `Array.<string>,string` | Expected class names. |

#### Message

`Expect [actual] (not) to be a DOM element with classes [classes] but was [actualClasses]`

#### Example:

```javascript
const span = document.createElement('span');
span.className = 'foo bar';

expect(span).toBeDOMElementWithClasses('foo');
expect(span).toBeDOMElementWithClasses('bar');
expect(span).toBeDOMElementWithClasses('foo bar');
expect(span).toBeDOMElementWithClasses(['foo', 'bar']);
```

### toBeDOMElementWithId

Check that the tested object is a DOM element with an expected id (note that
the `id` is retrieved using `getAttribute('id')`).

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Expected id. |

#### Message

`Expect [actual] (not) to be a DOM element with id [id] but was [actualId]`

#### Example:

```javascript
const span = document.createElement('span');
span.setAttribute('id', 'mySpan');
expect(span).toBeDOMElementWithId('mySpan');
```

### toBeDOMElement

Check that the tested object is DOM element with an expected tag name.
The tag name is optional, if not set this matcher will juste check that the actual
object is a DOM element.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `tagName` | `string` | Expected tag name (optional). |

#### Message

`Expect [actual] (not) to be a DOM element
Expect [actual] (not) to be [tagName] element but was [actualTagName]`

#### Example:

```javascript
const span = document.createElement('span');
expect(span).toBeDOMElement();
expect(span).toBeDOMElement('span');
expect(span).toBeDOMElement('SPAN');
expect(span).not.toBeDOMElement('div');
```

### toBeEmpty

Check that tested object is empty:
- If it is an `array` or an array-like, check that the length is equal to zero.
- If it is an object, check that it does not have any property.
- If it is a `map` or a `set`, check that the size is equal to zero.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be empty.`

#### Example:

```javascript
expect('').toBeEmpty();
expect([]).toBeEmpty();
expect({}).toBeEmpty();
expect(new Map()).toBeEmpty();
expect(new Set()).toBeEmpty();
```

### toBeEvenNumber

Check that the tested object is an even number.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] to be an even number`

#### Example:

```javascript
expect(2).toBeEvenNumber();
expect(0).not.toBeEvenNumber();
expect(1).not.toBeEvenNumber();
```

### toBeFalse

Check that the tested object is strictly equal `false`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be false`

#### Example:

```javascript
expect(false).toBeFalse();
expect(true).not.toBeFalse();
expect(0).not.toBeFalse();
```

### toBeFloat

Check that the tested object is a `float` value.

Note that for this matcher, a `float` is a numeric value (see `toBeNumeric` matcher) that
is not an integer (a numeric value may be a `number` *or* a `string` containing a number).

*JavaScript makes no distinction between integers and floats
so 1.0 is considered integer.*

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a float`

#### Example:

```javascript
expect(1.5).toBeFloat();
expect('1.5').toBeFloat();
expect(1).not.toBeFloat();
expect(1.0).not.toBeFloat();
```

### toBeInRange

Check that the tested object is a `number` (strictly) greater than a lower bound
and (strictly) less than a lower bound.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `lower` | `number` | The lower bound. |
| `upper` | `number` | The upper bound. |

#### Message

`Expect [actual] (not) to be between [lower] and [upper]`

#### Example:

```javascript
expect(2).toBeInRange(1, 3);
expect(1).not.toBeInRange(1, 3);
expect(3).not.toBeInRange(1, 3);
```

### toBeInstanceOf

Check that the tested object is an instance of a given `constructor`.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `ctor` | `*` | Expected constructor. |

#### Message

`Expect [actual] (not) to be an instance of [constructor]`

#### Example:

```javascript
expect(new Date()).toBeInstanceOf(Date);
expect('foo').toBeInstanceOf(String);

class Foo { }
expect(new Foo()).toBeInstanceOf(Foo);
```

### toBeInteger

Check that the tested object is an `integer` value.

Note that for this matcher, an `integer` is a numeric value (see `toBeNumeric` matcher) that
is not a `float` (a numeric value may be a `number` *or* a `string` containing a number).

*JavaScript makes no distinction between integers and floats so
both 1 and 1.0 are considered integers.*

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be an integer`

#### Example:

```javascript
expect(1).toBeInteger();
expect(1.0).toBeInteger();
expect('1').toBeInteger();
expect('1.0').toBeInteger();
expect(1.5).not.toBeInteger();
```

### toBeIterable

Check that the tested object is an iterable value.

An iterable value allows is an object that can define or customize its iteration behavior,
such as what values are looped over in a `for..of` construct.

An iterable value may be:
- An `array`.
- A `Map`.
- A `Set`.
- An object that implement the `@@iterator` method.

#### Since

0.3.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `Klass` | `*` | Expected class. |

#### Message

`Expect [actual] (not) to be iterable`

#### Example:

```javascript
expect([]).toBeIterable();
expect(new Map()).toBeIterable();
expect(new Set()).toBeIterable();
```

### toBeNegative

Check that the tested object is a number strictly less than zero.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a negative number`

#### Example:

```javascript
expect(-1).toBeNegative();
expect(0).not.toBeNegative();
expect(1).not.toBeNegative();
```

### toBeNil

Check that the tested object is nil (i.e `null` or `undefined`).

#### Since

0.3.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be nil (null or undefined)`

#### Example:

```javascript
expect(null).toBeNil();
expect(undefined).toBeNil();
expect(void 0).toBeNil();
expect(false).not.toBeNil();
expect(0).not.toBeNil();
expect(NaN).not.toBeNil();
```

### toBeNull

Check that tested object is `null`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be null`

#### Example:

```javascript
expect(null).toBeNull();
expect(undefined).not.toBeNull();
expect(false).not.toBeNull();
```

### toBeNumeric

Check that the tested object is a numeric value.
A numeric is something that contains a numeric value, regardless of its type (it
can be a `string` containing a numeric value or a `number`).

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a numeric value`

#### Example:

```javascript
expect(2).toBeNumeric();
expect(1.5).toBeNumeric();
expect('2').toBeNumeric();
expect('1.5').toBeNumeric();
expect('foo').not.toBeNumeric();
```

### toBeOddNumber

Check that the tested object is an odd number.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be an odd number`

#### Example:

```javascript
expect(1).toBeOddNumber();
expect(2).not.toBeOddNumber();
expect(0).not.toBeOddNumber();
```

### toBePartiallyEqualTo

Check that the tested object is partially equals to a second one.
Note that this matcher works fine with custom equality matchers.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `other` | `Array.<*>,Object` | The second object to use for equality. |

#### Message

`Expect [actual] (not) to be partially equal to [other]`

#### Example:

```javascript
const a1 = { id: 1, foo: 'bar' };
const a2 = { id: 2, foo: 'bar' };

const b1 = { id: 1 };
const b2 = { id: 2 };

const c1 = { id: 2 };
const c2 = { id: 2 };

const array1 = [a1, a2];
const array2 = [b1, b2];
const array3 = [c1, c2];
expect(array1).toBePartiallyEqualTo(array2);
expect(array1).not.toBePartiallyEqualTo(array3);
```

### toBePositive

Check that the tested object is a number strictly greater than zero.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be a positive number`

#### Example:

```javascript
expect(1).toBePositive();
expect(0).not.toBePositive();
expect(-1).not.toBePositive();
```

### toBeSameDay

Check that the tested object is the same *day* as an other date.

The tested date and the date to compare may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `day` | `Date,number,string` | The other date. |

#### Message

`Expect [actual] (not) the same day as [day]`

#### Example:

```javascript
const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
const date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
const date3 = new Date(2014, 5, 6, 10, 0, 0, 0);

expect(date1).toBeSameDay(date2);
expect(date1).not.toBeSameDay(date3);
```

### toBeSorted

Check that the tested object is an array and is sorted (i.e for each elements in
the array, `array[i - 1] <= array[i]`).

A custom comparator can be specified as parameter:
- Takes values to compare as arguments.
- Must return a number:
  - Less than zero if first argument is less than the second.
  - Greater than zero if first argument is greater than the second.
  - Zero if both parameters are "equivalent".

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `comparator` | `function` | Comparator function (optional). |

#### Message

`Expect [actual] (not) to be sorted`

#### Example:

```javascript
expect([0, 1, 2, 3]).toBeSorted();
expect(['bar', 'foo']).toBeSorted();
expect([false, false, true, true]).toBeSorted();
expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted((a, b) => a.id - b.id);
expect([1, 0, 2, 3]).not.toBeSorted();
```

### toBeToday

Check that the tested object is the same day as now (i.e `Date.now()`).

The tested date may be:
- A date instance.
- A timestamp.
- A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).

**Note:** Using date strings should be avoided due to browser differences and inconsistencies.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be today`

#### Example:

```javascript
const date1 = new Date();
const date2 = new Date();
date2.setDate(date1.getDate() - 1);

expect(date1).toBeToday();
expect(date2).not.toBeToday();
```

### toBeTrue

Check that the tested object is strictly equal to `true`.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be true`

#### Example:

```javascript
expect(true).toBeTrue();
expect(false).not.toBeTrue();
expect(1).not.toBeTrue();
```

### toBeZero

Check that the tested object is a number strictly equal to zero.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to be zero`

#### Example:

```javascript
expect(0).toBeZero();
expect(1).not.toBeZero();
expect('0').not.toBeZero();
```

### toContainsDistinctValues

Check that the tested object is an array containing only distinct values.
The tested object may be an array or any iterable object (i.e that can be
traversed with the `for..of` loop).

Note that this matcher works fine with custom equality matchers.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to contains only distinct values`

#### Example:

```javascript
expect([0, 1, 2, 3]).toContainsDistinctValues();
expect([0, 1, 2, 3, 0]).not.toContainsDistinctValues();
```

### toContainsOnlyFalsyValues

Check that the tested object contains only falsy values.
The tested object may be an array or any iterable object (i.e that can be
traversed with the `for..of` loop).

Note that this matcher works fine with custom equality matchers.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to contains only falsy values`

#### Example:

```javascript
expect([0, false, null, undefined, '']).toContainsOnlyFalsyValues();

expect([1, false, null, undefined, '']).not.toContainsOnlyFalsyValues();
expect([0, true, null, undefined, '']).not.toContainsOnlyFalsyValues();
expect([0, false, {}, undefined, '']).not.toContainsOnlyFalsyValues();
expect([0, false, null, [], '']).not.toContainsOnlyFalsyValues();
expect([0, false, null, undefined, 'foo']).not.toContainsOnlyFalsyValues();
```

### toContainsOnlyTruthyValues

Check that the tested object contains only truthy values.
The tested object may be an array or any iterable object (i.e that can be
traversed with the `for..of` loop).

Note that this matcher works fine with custom equality matchers.

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to contains only truthy values.`

#### Example:

```javascript
expect([1, 2, true, 'foo', {}, []]).toContainsOnlyTruthyValues();

expect([1, 2, false, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
expect([1, 2, true, '', {}, []]).not.toContainsOnlyTruthyValues();
expect([0, 2, true, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
```

### toEndWith

Check that the tested object is a `string` and end with an expected suffix.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `suffix` | `string` | The suffix to look for. |

#### Message

`Expect [actual] (not) to end with [suffix]`

#### Example:

```javascript
expect('foo').toEndWith('o');
expect('foo').toEndWith('oo');
expect('foo').toEndWith('foo');
expect('foo').not.toEndWith('bar');
```

### toEqualIgnoringCase

Check that the tested object is a `string` equal to an other `string`: comparison is
case-insensitive.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `other` | `string` | Other string to compare. |

#### Message

`Expect [actual] (not) to be equal to [other] (case insensitive)`

#### Example:

```javascript
expect('foo').toEqualIgnoringCase('foo');
expect('foo').toEqualIgnoringCase('FOO');
expect('foo').not.toEqualIgnoringCase('bar');
```

### toHaveBeenCalledOnceWith

Check that the tested object is a spy that has been called once (and exactly
once) with expected arguments.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `args` | `...*` | Expected call arguments. |

#### Message

`Expect [actual] to have been called once but was called [count] time(s)
Expect [actual] to have been called once but was called [count] time(s) with different arguments`

#### Example:

```javascript
const spy = jasmine.createSpy('foo');
expect(spy).not.toHaveBeenCalledOnce();

spy('foo');
expect(spy).toHaveBeenCalledOnceWith('foo');
expect(spy).not.toHaveBeenCalledOnceWith('bar');
```

### toHaveBeenCalledOnce

Check that the tested object is a spy that has been called once (and only once).

#### Since

0.1.0

#### Parameters

*No parameters*

#### Message

`Expect [actual] (not) to have been called once but was called [count] time(s)`

#### Example:

```javascript
const spy = jasmine.createSpy('foo');
expect(spy).not.toHaveBeenCalledOnce();

spy();
expect(spy).toHaveBeenCalledOnce();

spy();
expect(spy).not.toHaveBeenCalledOnce();
```

### toHaveFunctions

Check that actual object contains all given expected functions.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `methods` | `...string` | List of methods to look for. |

#### Message

`Expect [actual] (not) to contain functions [methods]`

#### Example:

```javascript
const foo = jasmine.createSpy('foo');
const bar = jasmine.createSpy('bar');
const obj = { id: 1, name: 'foo', foo, bar };

expect(obj).toHaveFunctions('foo', 'bar');
expect(obj).not.toHaveFunctions('id', 'name');
```

### toHaveKeys

Check that actual object contains all given expected keys.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expectedKeys` | `...string` | Keys to look for in tested object. |

#### Message

`Expect [actual] (not) to have keys [expectedKeys]`

#### Example:

```javascript
const obj = { id: 1, name: 'foo' };
expect(obj).toHaveKeys('id', 'name');
expect(obj).not.toHaveKeys('foo', 'bar');
```

### toHaveLength

Check that tested object has a `length` property with expected value.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expectedLength` | `number` | The expected length value. |

#### Message

`Expect length of [actual] (not) to be [expectedLength]`

#### Example:

```javascript
expect([]).toHaveLength(0);
expect([0, 1, 2]).toHaveLength(3);
expect('').toHaveLength(0);
expect('foo').toHaveLength(3);
```

### toHaveSameLengthAs

Check that tested object has the same length as an other value with `length`
property.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expected` | `Array.<*>` | The other array. |

#### Message

`Expect [actual] (not) to have same length as [expected]`

#### Example:

```javascript
expect([]).toHaveSameLengthAs('');
expect(['f', 'o', 'o']).toHaveSameLengthAs('foo');
expect('').toHaveSameLengthAs([]);
expect('foo').toHaveSameLengthAs(['f', 'o', 'o']);
```

### toHaveSameSizeAs

Check that tested object has the same size as an other one.

A size may be computed from:
- An array (or an array-like object) with the `length` property.
- A `Map` or a `Set` using its `size` property.
- Any iterable object (using a `for..of` loop).
- An object (number of own enumerable properties).

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expected` | `*` | The other object (or array, or array-like object). |

#### Message

`Expect [actual] to have same size as [expected]`

#### Example:

```javascript
expect('foo').toHaveSameSizeAs('foo');
expect('bar').toHaveSameSizeAs({ b: 1, a: 1, r: 1 });
expect([ 'foo', 'bar' ]).toHaveSameSizeAs(new Set(['foo', 'bar']));
```

### toHaveSize

Check that tested object has an expected size.

A size may be computed from:
- An array (or an array-like object) with the `length` property.
- A `Map` or a `Set` using its `size` property.
- Any iterable object (using a `for..of` loop).
- An object (number of own enumerable properties).

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expectedSize` | `number` | The expected size. |

#### Message

`Expect size of [actual] (not) to be [expectedSize]`

#### Example:

```javascript
expect([1, 2, 3]).toHaveSize(3);
expect('foo bar').toHaveSize(7);
expect(new Set([0, 1, 2])).toHaveSize(3);
expect({ foo: 'bar' }).toHaveSize(1);
```

### toHaveSome

Verifies that the tested object satisfies a predicate function for at
at least one element in the collection.

The collection may be an `array`, a `set`, a `map` or any iterable object.

The predicate function is executed with three arguments:
- The value being iterated.
- The key of the value being iterated.
- The collection being iterated.

**Important:**
Note that the key may be different with arrays and map/set:
- With an array or an iterable object, the key will be the index of the value being traversed.
- With a map, the key will be the index value of the value being traversed.
- With a set, the key will be the same value being traversed (since a `Set` does not have any keys).

See the documentation of the `forEach` functions of `Map` and `Set` structure:
- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set/forEach
- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map

This matcher may take an optional first argument: the error message that will
be displayed if the matcher does not pass.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `message` | `string` | Custom error message (optional). |
| `iterator` | `function` | Predicate function. |

#### Message

`Expect [actual] (not) to have at least one element that verify condition
Expect [actual] (not) to have at least one element that verify "[message]"`

#### Example:

```javascript
expect([1, 2, 3]).toHaveSome(x => x % 2 === 0);
expect([1, 3, 5, 7]).not.toHaveSome(x => x % 2 === 0);
```

### toHaveValues

Check that the tested object contains expected values (the key is not checked,
only the value).

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `expectedValues` | `...*` | The values to look for. |

#### Message

`Expect [actual] (not) to have values [values]`

#### Example:

```javascript
const obj = { id: 1, name: 'foo', array: [1, 2, 3] };
expect(obj).toHaveValues(1, 'foo', [1, 2, 3]);
expect(obj).not.toHaveValues(2, 'bar');
expect(obj).not.toHaveValues([ 1, 2, 3, 4 ]);
```

### toStartWith

Check that the tested object is a string and start with an expected prefix.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `prefix` | `string` | The prefix to look for. |

#### Message

`Expect [actual] (not) to start with [prefix]`

#### Example:

```javascript
expect('foo').toStartWith('f');
expect('foo').toStartWith('fo');
expect('foo').toStartWith('foo');
expect('foo').not.toStartWith('bar');
```

### toVerify

Check that the tested object satisfies a given predicate.
The collection may be an `array`, a `set`, a `map` or any iterable object.

The predicate function is executed with three arguments:
- The value being iterated.
- The key of the value being iterated.
- The collection being iterated.

**Important:**
Note that the key may be different with arrays and map/set:
- With an array or an iterable object, the key will be the index of the value being traversed.
- With a map, the key will be the index value of the value being traversed.
- With a set, the key will be the same value being traversed (since a `Set` does not have any keys).

See the documentation of the `forEach` functions of `Map` and `Set` structure:
- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set/forEach
- https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map

This matcher may take an optional first argument: the error message that will
be displayed if the matcher does not pass.

#### Since

0.1.0

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `message` | `string` | Error message thrown when the test fail (optional). |
| `iterator` | `function` | Predicate function. |

#### Message

`Expect [actual] (not) to verify condition
Expect [actual] (not) to verify "[message]"`

#### Example:

```javascript
expect([2, 4, 6, 8]).toVerify(x => x % 2 === 0);
expect([2, 4, 6, 8, 9]).not.toVerify(x => x % 2 === 0);
```


## Licence

MIT License (MIT)

## Contributing

If you think some matchers are missing or error messages are not useful enough, feel free to contribute and submit an issue or a pull request.

Thanks to [@geoffdutton](https://github.com/geoffdutton) for his [contribution](https://github.com/mjeanroy/jasmine-utils/pull/5)!
