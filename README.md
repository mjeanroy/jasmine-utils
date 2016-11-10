jasmine-utils
=============

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

  jasmine.spyEach(obj, ['method1', 'method2');
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

### Booleans

- `toBeABoolean()`
  - Check that a given value is a boolean object
  - Error message: 'Expect value (not) to be a boolean'

```javascript
it('should check if object is a boolean', function() {
  expect(true).toBeABoolean();
  expect(false).toBeABoolean();
  expect(0).not.toBeABoolean();
  expect('').not.toBeABoolean();
  expect(null).not.toBeABoolean();
  expect(undefined).not.toBeABoolean();
});
```

- `toBeTrue()`
  - Check that a given value is strictly equals to true
  - Error message: 'Expect value (not) to be true'

```javascript
it('should check if object is true', function() {
  expect(true).toBeTrue();
  expect(false).not.toBeTrue();
});
```

- `toBeFalse()`
  - Check that a given value is strictly equals to false
  - Error message: 'Expect value (not) to be false'

```javascript
it('should check if object is false', function() {
  expect(false).toBeFalse();
  expect(true).not.toBeFalse();
});
```

### Strings

- `toBeAString()`
  - Check that a given string is a string object
  - Error message: 'Expect value (not) to be a string'

```javascript
it('should check if object is a string', function() {
  expect('').toBeAString();
  expect('foo').toBeAString();
  expect(false).not.toBeAString();
  expect(0).not.toBeAString();
});
```

- `toBeAnEmptyString()`
  - Check that a given string is empty (i.e. === '')
  - Error message: 'Expect value (not) to be an empty string'

```javascript
it('should check if string is empty', function() {
  expect('').toBeAnEmptyString();
  expect('foo').not.toBeAnEmptyString();
});
```

- `toBeEmpty()`
  - Same as `toBeAnEmptyString`
  - Error message: 'Expect value (not) to be empty'

```javascript
it('should check if string is empty', function() {
  expect('').toBeEmpty();
  expect('foo').not.toBeAnEmpty();
});
```

- `toHaveLength(length)`
  - Check that a given string has a length equals to expected length
  - Error message: 'Expect length of actual (not) to be length but was actual.length'

```javascript
it('should check length of string', function() {
  expect('').toHaveLength(0);
  expect('foo').toHaveLength(3);
  expect('foo').not.toHaveLength(0);
});
```

- `toHaveSize(size)`
  - Same as `toHaveLength`
  - Error message: 'Expect size of actual (not) to be size but was actual.length'

```javascript
it('should check size of string', function() {
  expect('').toHaveSize(0);
  expect('foo').toHaveSize(3);
  expect('foo').not.toHaveSize(0);
});
```

- `toHaveSameLengthAs(array|string)`
  - Check that a given string has a length equals to length of array or string in parameter
  - Error message: 'Expect length of actual (not) to be param.length but was actual.length'

```javascript
it('should check that length are equals', function() {
  expect('').toHaveSameLengthAs([]);
  expect('foo').toHaveSameLengthAs(['f', 'o', 'o']);
  expect('foo').not.toHaveSameLengthAs(['f', 'o', 'o', 'b', 'a', 'r']);
});
```

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given string has a length equals to parameter size
  - Error message: 'Expect size of actual (not) to be size(param) but was actual.length'

```javascript
it('should check that size are equals', function() {
  expect('').toHaveSameSizeAs([]);
  expect('').toHaveSameSizeAs({});
  expect('foo').toHaveSameSizeAs(['f', 'o', 'o']);

  expect('bar').toHaveSameSizeAs({
    b: 1,
    a: 1,
    r: 1
  });

  expect('foo').not.toHaveSameSizeAs({
    f: 1,
    o: 2
  });
});
```

- `toEqualIgnoringCase(string)`
  - Check that a given string is equal to an other string ignoring case
  - Error message: 'Expect actual (not) to be equal to string (case insensitive)'

```javascript
it('should check that strings are equal ignoring case', function() {
  expect('foo').toEqualIgnoringCase('foo');
  expect('foo').toEqualIgnoringCase('FOO');
  expect('foo').not.toEqualIgnoringCase('bar');
});
```

- `toStartWith(prefix)`
  - Check that a given string start with given prefix
  - Error message: 'Expect actual (not) to start with prefix'

```javascript
it('should check that string start with expected prefix', function() {
  expect('foo').toStartWith('f');
  expect('foo').toStartWith('fo');
  expect('foo').toStartWith('foo');
  expect('foo').not.toStartWith('bar');
});
```

- `toEndWith(suffix)`
  - Check that a given string end with given suffix
  - Error message: 'Expect actual (not) to end with suffix'

```javascript
it('should check that string end with expected suffix', function() {
  expect('foo').toEndWith('o');
  expect('foo').toEndWith('oo');
  expect('foo').toEndWith('foo');
  expect('foo').not.toEndWith('bar');
});
```

### Numbers

- `toBeANumber()`
  - Check that a given value is a number object.
  - Error message: 'Expect actual (not) to be a number'

```javascript
it('should check if object is a number', function() {
  expect(0).toBeANumber();
  expect(1).toBeANumber();
  expect(1.5).toBeANumber();
  expect('0').not.toBeANumber();
});
```

- `toBeZero()`
  - Check that a given value is strictly equals to zero.
  - Error message: 'Expect actual (not) to be zero'

```javascript
it('should check if object is zero', function() {
  expect(0).toBeZero();
  expect(1).not.toBeZero();
  expect('0').not.toBeZero();
});
```

- `toBePositive()`
  - Check that a given value is strictly greater than zero.
  - Error message: 'Expect actual (not) to be positive'

```javascript
it('should check if number is positive', function() {
  expect(1).toBePositive();
  expect(0).not.toBePositive();
  expect(-1).not.toBePositive();
});
```

- `toBeNegative()`
  - Check that a given value is strictly lower than zero.
  - Error message: 'Expect actual (not) to be negative'

```javascript
it('should check if number is negative', function() {
  expect(-1).toBeNegative();
  expect(0).not.toBeNegative();
  expect(1).not.toBeNegative();
});
```

- `toBeOddNumber()`
  - Check that a given value is an odd number.
  - Error message: 'Expect actual (not) to be an odd number'

```javascript
it('should check if number is an odd number', function() {
  expect(1).toBeOddNumber();
  expect(2).not.toBeOddNumber();
  expect(0).not.toBeOddNumber();
});
```

- `toBeEvenNumber()`
  - Check that a given value is an even number.
  - Error message: 'Expect actual (not) to be an even number'

```javascript
it('should check if number is an even number', function() {
  expect(2).toBeEvenNumber();
  expect(0).not.toBeEvenNumber();
  expect(1).not.toBeEvenNumber();
});
```

- `toBeNumeric()`
  - Check that a given value is a numeric value (i.e. a number or a string that is a numeric value).
  - Error message: 'Expect actual (not) to be a numeric value'

```javascript
it('should check if value is numeric', function() {
  expect(2).toBeNumeric();
  expect(1.5).toBeNumeric();
  expect('2').toBeNumeric();
  expect('1.5').toBeNumeric();
  expect('foo').not.toBeNumeric();
});
```

- `toBeInteger()`
  - Check that a given value is a numeric and an integer value (some integers: 1, 1.0)
  - Error message: 'Expect actual (not) to be an integer'

```javascript
it('should check if value is an integer', function() {
  expect(1).toBeInteger();
  expect(1.0).toBeInteger();
  expect('1').toBeInteger();
  expect('1.0').toBeInteger();
  expect(1.5).not.toBeInteger();
});
```

- `toBeFloat()`
  - Check that a given value is a numeric and not an integer value (some floats: 1.5)
  - Error message: 'Expect actual (not) to be a float'

```javascript
it('should check if value is a float', function() {
  expect(1.5).toBeFloat();
  expect('1.5').toBeFloat();
  expect(1).not.toBeFloat();
  expect('1.0').not.toBeFloat();
});
```

- `toBeInRange(lower, upper)`
  - Check that a given value is number that is strictly greater than lower bound and strictly lower than upper bound.
  - Error message: 'Expect actual (not) to be between lower and upper'

```javascript
it('should check if value is in given range', function() {
  expect(2).toBeInRange(1, 3);
  expect(1).not.toBeInRange(1, 3);
  expect(3).not.toBeInRange(1, 3);
});
```

### Dates

- `toBeADate()`
  - Check that a given value is a date object
  - Error message: 'Expect value (not) to be a date'

```javascript
it('should check if object is a date object', function() {
  expect(new Date()).toBeADate();
  expect(null).not.toBeADate();
  expect(123).not.toBeADate();
});
```

- `toBeDateCloseTo(date, maxDiff)`
  - Check that a given value is a date object close to an other date.
  - Default `maxDiff` value is 1000 ms.
  - Error message: 'Expect date actual (not) to be close to date'

```javascript
it('should check if a date is close to another date', function() {
  var date1 = new Date(2014, 6, 6, 10, 0, 0, 0);
  var date2 = new Date(2014, 6, 6, 10, 0, 0, 1000);

  expect(date1).toBeDateCloseTo(date2, 1000);
  expect(date1).toBeDateCloseTo(date2);
  expect(date1).not.toBeDateCloseTo(date2, 999);
});
```

- `toBeDateCloseToNow(maxDiff)`
  - Check that a given value is a date object close to current timestamp.
  - Default `maxDiff` value is 1000 ms.
  - Error message: 'Expect date actual (not) to be close to now'

```javascript
it('should check if a date is close to current date', function() {
  var date = new Date(new Date().getTime() + 900);

  expect(date).toBeDateCloseToNow(1000);
  expect(date).toBeDateCloseToNow();
  expect(date).not.toBeDateCloseToNow(890);
});
```

- `toBeDateAfter(lower)`
  - Check that a given value is a date object that is strictly after an other date.
  - Error message: 'Expect date actual (not) to be after lower'

```javascript
it('should check if a date is after an other date', function() {
  var date1 = new Date(new Date().getTime() + 1000);
  var date2 = new Date(new Date().getTime() + 2000);

  expect(date2).toBeDateAfter(date1);
  expect(date1).not.toBeDateAfter(date2);
});
```

- `toBeDateAfterNow()`
  - Check that a given value is a date object that is strictly after current timestamp.
  - Error message: 'Expect date actual (not) to be after now'

```javascript
it('should check if a date is after current date', function() {
  var date1 = new Date(new Date().getTime() + 1000);
  expect(date1).toBeDateAfterNow();
});
```

- `toBeDateBefore(upper)`
  - Check that a given value is a date object that is strictly before an other date.
  - Error message: 'Expect date actual (not) to be before upper'

```javascript
it('should check if a date is before an other date', function() {
  var date1 = new Date(new Date().getTime() - 2000);
  var date2 = new Date(new Date().getTime() - 1000);

  expect(date1).toBeDateBefore(date2);
  expect(date2).not.toBeDateBefore(date1);
});
```

- `toBeDateBeforeNow()`
  - Check that a given value is a date object that is strictly before current timestamp.
  - Error message: 'Expect date actual (not) to be before now'

```javascript
it('should check if a date is before current date', function() {
  var date1 = new Date(new Date().getTime() - 2000);
  expect(date1).toBeDateBeforeNow();
});
```

- `toBeSameDay(date)`
  - Check that a given value is a date object and is the same day as an other date.
  - Error message: 'Expect date actual (not) to be same day as date'

```javascript
it('should check if a date same day as an other date', function() {
  var date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
  var date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
  var date3 = new Date(2014, 5, 6, 10, 0, 0, 0);

  expect(date1).toBeSameDay(date2);
  expect(date1).not.toBeSameDay(date3);
});
```

- `toBeToday()`
  - Check that a given value is a date object and is today.
  - Error message: 'Expect date actual (not) to be today'

```javascript
it('should check if a date same day as current date', function() {
  var date1 = new Date();
  var date2 = new Date();
  date2.setDate(date1.getDate() - 1);

  expect(date1).toBeToday();
  expect(date2).not.toBeToday();
});
```

### Arrays

- `toBeAnArray()`
  - Check that a given value is an array
  - Error message: 'Expect actual (not) to be an array'

```javascript
it('should check if an object is array', function() {
  expect([]).toBeAnArray();
  expect('123').not.toBeAnArray();
  expect(1).not.toBeAnArray();
  expect(false).not.toBeAnArray();
  expect({}).not.toBeAnArray();
  expect(null).not.toBeAnArray();
  expect(undefined).not.toBeAnArray();
});
```

- `toHaveSize(expectedSize)`
  - Check that a given array has an expected size (i.e. length of array)
  - Error message: 'Expect size of actual (not) to be expectedSize but was array.length'

```javascript
it('should check if size of array', function() {
  expect([1, 2, 3]).toHaveSize(3);
  expect([1, 2, 3]).not.toHaveSize(1);
});
```

- `toHaveLength(expectedLength)`
  - Check that a given array has an expected length
  - Error message: 'Expect length of actual (not) to be expectedLength but was array.length'

```javascript
it('should check if length of array', function() {
  expect([1, 2, 3]).toHaveLength(3);
  expect([1, 2, 3]).not.toHaveLength(1);
});
```

- `toHaveSameLengthAs(array|string)`
  - Check that a given array has a length equals to length of array or string in parameter
  - Error message: 'Expect length of actual (not) to be param.length but was array.length'

```javascript
it('should check if length of array is equal to the length of an other object', function() {
  expect(['f', 'o', 'o']).toHaveSameLengthAs('foo');
  expect(['f', 'o']).not.toHaveSameLengthAs('foo');
});
```

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given array has a length equals to the size of parameter
  - Error message: 'Expect size of actual (not) to be size(param) but was array.length'

```javascript
it('should check if size of array is equal to the size of an other object', function() {
  expect(['f', 'o', 'o']).toHaveSameSizeAs('foo');
  expect(['f', 'o', 'o']).not.toHaveSameSizeAs({
    f: 1,
    o: 2
  });
});
```

- `toBeEmpty()`
  - Check that a given array is empty (i.e. has a length equal to zero)
  - Error message: 'Expect actual (not) to be empty'

```javascript
it('should check if array is empty', function() {
  expect([]).toBeEmpty();
  expect([1, 2, 3]).not.toBeEmpty();
});
```

- `toBeSorted(comparator)`
  - Check that a given array is sorted (using given comparator if given)
  - Error message: 'Expect actual (not) to be sorted'

```javascript
it('should check if an array is sorted', function() {
  expect([0, 1, 2, 3]).toBeSorted();
  expect(['bar', 'foo']).toBeSorted();
  expect([false, false, true, true]).toBeSorted();
  expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted(function(a, b) {
    return a.id - b.id;
  });

  expect([1, 0, 2, 3]).not.toBeSorted();
});
```

- `toVerify(iterator)`
  - Check that all values of array verify function iterator (must return a truthy / falsy value).
  - Error message: 'Expect actual (not) to verify condition'

```javascript
it('should check that each element of an array verify a condition', function() {
  var condition = function(item) {
    return item % 2 === 0;
  };

  expect([2, 4, 6, 8]).toVerify(condition);
  expect([2, 4, 6, 8, 9]).not.toVerify(condition);
});
```

- `toHaveSome(iterator)`
  - Check that at least one values of array verify function iterator (must return a truthy / falsy value).
  - Error message: 'Expect actual (not) to have at least one element that verify condition'

```javascript
it('should check that at least one element of an array verify a condition', function() {
  var condition = function(item) {
    return item % 2 === 0;
  };

  expect([1, 2, 3]).toHaveSome(condition);
  expect([1, 3, 5, 7]).not.toHaveSome(condition);
});
```

- `toContainsDistinctValues()`
  - Check that a given array contains only distinct values.
  - Error message: 'Expect actual (not) to contains only distinct values'

```javascript
it('should check that an array contains only distinct values', function() {
  expect([0, 1, 2, 3]).toContainsDistinctValues();
  expect([0, 1, 2, 3, 0]).not.toContainsDistinctValues();
});
```

- `toContainsOnlyTruthyValues()`
  - Check that a given array contains only truthy values.
  - Error message: 'Expect actual (not) to contains only truthy values'

```javascript
it('should check that an array contains only truthy values', function() {
  expect([1, 2, true, 'foo', {}, []]).toContainsOnlyTruthyValues();

  expect([1, 2, false, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
  expect([1, 2, true, '', {}, []]).not.toContainsOnlyTruthyValues();
  expect([0, 2, true, 'foo', {}, []]).not.toContainsOnlyTruthyValues();
});
```

- `toContainsOnlyFalsyValues()`
  - Check that a given array contains only falsy values.
  - Error message: 'Expect actual (not) to contains only falsy values'

```javascript
it('should check that an array contains only falsy values', function() {
  expect([0, false, null, undefined, '']).toContainsOnlyFalsyValues();

  expect([1, false, null, undefined, '']).not.toContainsOnlyFalsyValues();
  expect([0, true, null, undefined, '']).not.toContainsOnlyFalsyValues();
  expect([0, false, {}, undefined, '']).not.toContainsOnlyFalsyValues();
  expect([0, false, null, [], '']).not.toContainsOnlyFalsyValues();
  expect([0, false, null, undefined, 'foo']).not.toContainsOnlyFalsyValues();
});
```

- `toBePartiallyEqualTo(array)`
  - Check that two arrays are equals using only item properties properties of array in parameter (ignoring other properties).
  - Error message: 'Expect actual (not) to be partially equals to param'

```javascript
it('should check that an object is partially equal to an other object', function() {
  var a1 = {
    id: 1,
    foo: 'bar'
  };

  var a2 = {
    id: 2,
    foo: 'bar'
  };

  var b1 = {
    id: 1
  };

  var b2 = {
    id: 2,
  };

  var c1 = {
    id: 2
  };

  var c2 = {
    id: 2
  };

  var array1 = [a1, a2];
  var array2 = [b1, b2];
  var array3 = [c1, c2];

  expect(array1).toBePartiallyEqualTo(array2);
  expect(array1).not.toBePartiallyEqualTo(array3);
});
```

### Objects

- `toBeInstanceOf(Klass)`
  - Check that a given object is an instance of given class.
  - Error message: 'Expect actual (not) to be an instance of Klass'

```javascript
it('should check that an object is an instance of given class', function() {
  var Klass = function() {
  };

  expect(new Klass()).toBeInstanceOf(Klass);
});
```

- `toHaveKeys(keys...)`
  - Check that a given object contains given keys
  - Error message: 'Expect object actual (not) to contain keys keys'

```javascript
it('should check that an object contains keys', function() {
  var obj = {
    id: 1,
    name: 'foo'
  };

  expect(obj).toHaveKeys('id', 'name');
  expect(obj).not.toHaveKeys('foo', 'bar');
});
```

- `toHaveValues(values...)`
  - Check that a given object contains given values
  - Error message: 'Expect object actual to contain values values'

```javascript
it('should check that an object contains values', function() {
  var obj = {
    id: 1,
    name: 'foo',
    array: [1, 2, 3],
    o: {
      id: 10
    }
  };

  expect(obj).toHaveValues(1, 'foo', [1, 2, 3], { id: 10 });
  expect(obj).not.toHaveValues(2, 'bar');
  expect(obj).not.toHaveValues({ id: 11 });
});
```

- `toHaveFunctions(functionNames...)`
  - Check that a given object contains given functions
  - Error message: 'Expect object actual to contain functions functionNames'

```javascript
it('should check that an object contains functions', function() {
  var obj = {
    id: 1,
    name: 'foo',
    foo: jasmine.createSpy('foo'),
    bar: jasmine.createSpy('bar')
  };

  expect(obj).toHaveFunctions('foo', 'bar');
  expect(obj).not.toHaveFunctions('id', 'name');
});
```

- `toHaveSize(expectedSize)`
  - Check that a given object has an expected size (i.e. number of keys)
  - Error message: 'Expect size of actual (not) to be expectedSize but was object.size'

```javascript
it('should check that an object has expected size', function() {
  var obj = {
    one: 1,
    two: 2,
    three: 3
  };

  expect(obj).toHaveSize(3);
  expect(obj).not.toHaveSize(1);
});
```

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given object has a size equals to the size of parameter
  - Error message: 'Expect size of actual (not) to be size(param) but was size(actual)'

```javascript
it('should check that an object has same size as an other object', function() {
  var obj = {
    b: 1,
    a: 1,
    r: 1
  };

  expect(obj).toHaveSameSizeAs('bar');
  expect(obj).toHaveSameSizeAs(['b', 'a', 'r']);
  expect(obj).not.toHaveSameSizeAs('foobar');
});
```

- `toBeEmpty()`
  - Check that a given object is empty (i.e. does not have any key)
  - Error message: 'Expect actual (not) to be empty'

```javascript
it('should check that an object is empty', function() {
  expect({}).toBeEmpty();
  expect({ id: 1 }).not.toBeEmpty();
});
```

- `toBePartiallyEqualsTo(object)`
  - Check that two objects are equals using only properties of parameter object (ignoring other properties).
  - Error message: 'Expect actual (not) to be partially equals to param'

```javascript
it('should check that an object is partially equals to an other object', function() {
  var a = {
    id: 1,
    foo: 'bar',
    bar: 'foo'
  };

  var b = {
    id: 1,
    foo: 'bar'
  };

  var c = {
    id: 2
  };

  expect(a).toBePartiallyEqualsTo(b);
  expect(a).not.toBePartiallyEqualsTo(c);
});
```

### DOM

- `toBeDOMElement(tagName)`
  - Check that a given object is a dom element (and check tag name if an argument is provided)
  - Error message: - 'Expect actual (not) to be a dom element'

```javascript
it('should check that an object is a dom element', function() {
  var span = document.createElement('span');
  expect(span).toBeDOMElement();
  expect(span).toBeDOMElement('span');
  expect(span).not.toBeDOMElement('p');

  expect([]).not.toBeDOMElement();
  expect({}).not.toBeDOMElement();
});
```

- `toBeDOMElementWithId(id)`
  - Check that a given object is a dom element with expected id
  - Error message: - 'Expect actual (not) to be a dom element with id expectedId but was actualId'

```javascript
it('should check that an object is a dom element', function() {
  var span = document.createElement('span');
  span.setAttribute('id', 'foo');

  expect(span).toBeDOMElementWithId('foo');
  expect(span).not.toBeDOMElementWithId('bar');
});
```

- `toBeDOMElementWithAttributes(attributes)`
  - Check that a given object is a dom element with expected attributes
  - Error message: - 'Expect actual (not) to be a dom element with attributes expectedAttributes but was actualAttributes'

```javascript
it('should check that an object is a dom element', function() {
  var span = document.createElement('span');
  span.setAttribute('foo', 'foo');
  span.setAttribute('bar', 'bar');

  expect(span).toBeDOMElementWithAttributes({
    foo: 'foo',
    bar: 'bar'
  });

  expect(span).not.toBeDOMElementWithAttributes({
    foo: 'bar',
    bar: 'foo'
  });
});
```

- `toBeDOMElementWithClasses(classes)`
  - Check that a given object is a dom element with expected css classes
  - Error message: - 'Expect actual (not) to be a dom element with classes expectedClasses but was actualClasses'

```javascript
it('should check that an object is a dom element', function() {
  var span = document.createElement('span');
  span.className = 'foo bar'

  expect(span).toBeDOMElementWithClasses('foo');
  expect(span).toBeDOMElementWithClasses('bar');
  expect(span).toBeDOMElementWithClasses(['foo', 'bar']);
  expect(span).toBeDOMElementWithClasses('foo bar');

  expect(span).not.toBeDOMElementWithClasses('foobar');
});
```

### Functions

- `toBeAFunction()`
  - Check that a given value is a function
  - Error message: 'Expect actual (not) to be a function'

```javascript
it('should check that an object is a function', function() {
  var myFunc = function() {};
  expect(myFunc).toBeAFunction();

  expect(0).not.toBeAFunction();
  expect(null).not.toBeAFunction();
});
```

- `toHaveBeenCalledOnce()`
  - Check that a given spy has been called exactly one time
  - Error message: 'Expect spy to have been called once but was called actual.callCount time(s)'

```javascript
it('should check that a spy has been called once', function() {
  var spy = jasmine.createSpy('foo');
  expect(spy).not.toHaveBeenCalledOnce();

  spy();
  expect(spy).toHaveBeenCalledOnce();

  spy();
  expect(spy).not.toHaveBeenCalledOnce();
});
```

- `toHaveBeenCalledOnceWith(args...)`
  - Check that a given spy has been called exactly one time with given arguments
  - Error message: 'Expect spy to have been called once but was called actual.callCount time(s) (with different arguments)'

```javascript
it('should check that a spy has been called once with given arguments', function() {
  var spy = jasmine.createSpy('foo');
  expect(spy).not.toHaveBeenCalledOnce();

  spy('foo');
  expect(spy).toHaveBeenCalledOnceWith('foo');
  expect(spy).not.toHaveBeenCalledOnceWith('bar');
});
```

##Since version >0.3.x

- `jasmine.autoSpy(objectOrArrayOfObjects)`
  - Calls jasmine.spyAll on all of the objects passed in beforeEach()
  - Calls jasmine.resetAll on all of the objects passed in afterEach()
  - Only keeps spies in the called describe() scope
```javascript
describe('jasmine.autoSpy', function() {
    var mockMe = {one: function() {}};

    autoSpy([mockMe]);

    it('should auto spy', function () {
        var now = autoSpy.get().length;
        expect(now).toBe(1);
        expect(autoSpy.get()[0]).toBe(mockMe);
        expect(jasmine.isSpy(mockMe.one)).toBe(true);
    });

    it('should auto spy mocks at this describe scope only once', function () {
        expect(autoSpy.get().length).toBe(1);
        expect(autoSpy.get()[0]).toBe(mockMe);
    });

    describe(' - first child scope', function () {

        var anotherObj = {another: function() {}};
        autoSpy(anotherObj, 'first child scope');

        it('should add to existing auto mock', function () {
            expect(autoSpy.get().length).toBe(2);
            expect(autoSpy.get()[0]).toBe(mockMe);
            expect(jasmine.isSpy(mockMe.one)).toBe(true);

            expect(autoSpy.get()[1]).toBe(anotherObj);
            expect(jasmine.isSpy(anotherObj.another)).toBe(true);
        });
    });
 });
```

##Since version >=0.4.1

- `jasmine.spyAll(window)` will only spy on the following methods:

```
// if window is passed to spyAll, we only want to spy on the following methods
// taken from here: https://developer.mozilla.org/en-US/docs/Web/API/Window#Methods
var whiteListedWindowMethods = [
    'alert',
    'atob',
    //'back', <- non standard
    'blur',
    'btoa',
    'cancelAnimationFrame',
    'captureEvents',
    'clearImmediate',
    'clearInterval',
    'clearTimeout',
    'close',
    'confirm',
    'convertPointFromNodeToPage',
    'createImageBitmap',
    'dump',
    //'fetch',
    'find',
    'focus',
    //'forward', <- non standard
    'getAttention',
    'getComputedStyle',
    //'getDefaultComputedStyle', <- non standard
    'getSelection',
    //'home', <- non standard
    'matchMedia',
    'minimize',
    'moveBy',
    'moveTo',
    'open',
    'openDialog',
    'postMessage',
    'print',
    'prompt',
    'releaseEvents',
    'requestAnimationFrame',
    'resizeBy',
    'resizeTo',
    'restore',
    'routeEvent',
    'scroll',
    'scrollBy',
    'scrollByLines',
    'scrollByPages',
    'scrollTo',
    'setCursor',
    'setImmediate',
    'setInterval',
    'setTimeout',
    'showModalDialog',
    'sizeToContent',
    'stop',
    'updateCommands'
];
```

- `jasmine.spyAll(document)` will only spy on the following methods:

```
// if document is passed to spyAll, we only want to spy on the following methods
// taken from here: https://developer.mozilla.org/en-US/docs/Web/API/Document#Methods
var whitelistDocumentMethods = [
    'adoptNode',
    'append',
    'caretPositionFromPoint',
    'caretRangeFromPoint',
    'clear',
    'close',
    'createAttribute',
    'createCDATASection',
    'createComment',
    'createDocumentFragment',
    'createElement',
    'createElementNS',
    'createEntityReference',
    'createEvent',
    'createExpression',
    'createNodeIterator',
    'createNSResolver',
    'createProcessingInstruction',
    'createRange',
    'createTextNode',
    'createTouch',
    'createTouchList',
    'createTreeWalker',
    'elementFromPoint',
    'enableStyleSheetsForSet',
    'evaluate',
    'execCommand',
    'exitFullscreen',
    'exitPointerLock',
    'getAnimations',
    'getBoxObjectFor',
    'getElementById',
    'getElementsByClassName',
    'getElementsByName',
    'getElementsByTagName',
    'getElementsByTagNameNS',
    'getSelection',
    'hasFocus',
    'importNode',
    'loadOverlay',
    'mozSetImageElement',
    'open',
    'prepend',
    'queryCommandEnabled',
    'queryCommandSupported',
    'querySelector',
    'querySelectorAll',
    'registerElement',
    'releaseCapture',
    'write',
    'writeln'
];
```

## Licence

MIT License (MIT)

## Contributing

If you think some matchers are missing or error messages are not useful enough, feel free to contribute and submit an issue or a pull request.
