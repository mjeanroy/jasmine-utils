jasmine-utils
=============

Jasmine-Utils is a set of custom matchers that I used in my previous projects.

Jasmine-Utils is compatible with __Jasmine 1.3__ and __Jasmine 2.0__.

## Utils Functions

- `jasmine.spyAll(object)`
  - Spy all functions of given object.
  - Spies are configured with `callThrough`

- `jasmine.spyIf(function)`
  - Spy function if and only if function is not already a spy.
  - Spy is returned.

- `jasmine.spyAllExcept(object, [excepts])`
  - Spy all functions of given object, excepts function names given in array (second arguments).
  - Spies are configured with `callThrough`

## Matchers

### Booleans

- `toBeABoolean()`
  - Check that a given value is a boolean object
  - Error message: 'Expect <value> (not) to be a boolean'

- `toBeTrue()`
  - Check that a given value is strictly equals to true
  - Error message: 'Expect <value> (not) to be true'

- `toBeFalse()`
  - Check that a given value is strictly equals to false
  - Error message: 'Expect <value> (not) to be false'

### Strings

- `toBeAString()`
  - Check that a given string is a string object
  - Error message: 'Expect <value> (not) to be a string'

- `toBeAnEmptyString()`
  - Check that a given string is empty (i.e. === '')
  - Error message: 'Expect <value> (not) to be an empty string'

- `toBeEmpty()`
  - Same as `toBeAnEmptyString`
  - Error message: 'Expect <string> (not) to be empty'

- `toHaveLength(length)`
  - Check that a given string has a length equals to expected length
  - Error message: 'Expect length of <string> (not) to be <length> but was <string.length>'

- `toHaveSize(size)`
  - Same as `toHaveLength`
  - Error message: 'Expect size of <string> (not) to be <size> but was <string.length>'

- `toHaveSameLengthAs(array|string)`
  - Check that a given string has a length equals to length of array or string in parameter
  - Error message: 'Expect length of <string> (not) to be <param.length> but was <string.length>'

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given string has a length equals to parameter size
  - Error message: 'Expect size of <string> (not) to be <size(param)> but was <string.length>'

- `toEqualsIgnoringCase(string)`
  - Check that a given string is equals to an other string ignoring case
  - Error message: 'Expect <actual> (not) to be equals to <string> (case insensitive)'

- `toStartsWith(prefix)`
  - Check that a given string starts with given prefix
  - Error message: 'Expect <value> (not) to starts with <prefix>'

- `toEndsWith(suffix)`
  - Check that a given string ends with given suffix
  - Error message: 'Expect <value> (not) to ends with <suffix>'

### Numbers

- `toBeANumber()`
  - Check that a given value is a number object.
  - Error message: 'Expect <actual> (not) to be a number'

- `toBeZero()`
  - Check that a given value is strictly equals to zero.
  - Error message: 'Expect <actual> (not) to be zero'

- `toBePositive()`
  - Check that a given value is strictly greater than zero.
  - Error message: 'Expect <actual> (not) to be positive'

- `toBeNegative()`
  - Check that a given value is strictly lower than zero.
  - Error message: 'Expect <actual> (not) to be negative'

- `toBeOddNumber()`
  - Check that a given value is an odd number.
  - Error message: 'Expect <actual> (not) to be an odd number'

- `toBeEvenNumber()`
  - Check that a given value is an even number.
  - Error message: 'Expect <actual> (not) to be an even number'

- `toBeNumeric()`
  - Check that a given value is a numeric value (i.e. a number or a string that is a numeric value).
  - Error message: 'Expect <actual> (not) to be a numeric value'

- `toBeInteger()`
  - Check that a given value is a numeric and an integer value (some integers: 1, 1.0)
  - Error message: 'Expect <actual> (not) to be an integer'

- `toBeFloat()`
  - Check that a given value is a numeric and not an integer value (some floats: 1.5)
  - Error message: 'Expect <actual> (not) to be a float'

- `toBeInRange(lower, upper)`
  - Check that a given value is number that is strictly greater than lower bound and strictly lower than upper bound.
  - Error message: 'Expect <actual> (not) to be between <lower> and <upper>'

### Dates

- `toBeADate()`
  - Check that a given value is a date object
  - Error message: 'Expect <value> (not) to be a date'

- `toBeADateCloseTo(date, maxDiff)`
  - Check that a given value is a date object close to an other date.
  - Default `maxDiff` value is 1000 ms.
  - Error message: 'Expect date <actual> (not) to be close to <date>'

- `toBeADateCloseToNow(maxDiff)`
  - Check that a given value is a date object close to current timestamp.
  - Default `maxDiff` value is 1000 ms.
  - Error message: 'Expect date <actual> (not) to be close to now'

- `toBeDateAfter(lower)`
  - Check that a given value is a date object that is strictly after an other date.
  - Error message: 'Expect date <actual> (not) to be after <lower>'

- `toBeDateAfterNow()`
  - Check that a given value is a date object that is strictly after current timestamp.
  - Error message: 'Expect date <actual> (not) to be after now'

- `toBeDateBefore(upper)`
  - Check that a given value is a date object that is strictly before an other date.
  - Error message: 'Expect date <actual> (not) to be before <upper>'

- `toBeDateBeforeNow()`
  - Check that a given value is a date object that is strictly before current timestamp.
  - Error message: 'Expect date <actual> (not) to be before now'

- `toBeSameDay(date)`
  - Check that a given value is a date object and is the same day as an other date.
  - Error message: 'Expect date <actual> (not) to be same day as <date>'

- `toBeToday()`
  - Check that a given value is a date object and is today.
  - Error message: 'Expect date <actual> (not) to be today'

### Arrays

- `toBeAnArray()`
  - Check that a given value is an array
  - Error message: 'Expect <value> (not) to be an array'

- `toHaveSize(expectedSize)`
  - Check that a given array has an expected size (i.e. length of array)
  - Error message: 'Expect size of <array> (not) to be <expectedSize> but was <array.length>'

- `toHaveLength(expectedLength)`
  - Check that a given array has an expected length
  - Error message: 'Expect length of <array> (not) to be <expectedLength> but was <array.length>'

- `toHaveSameLengthAs(array|string)`
  - Check that a given array has a length equals to length of array or string in parameter
  - Error message: 'Expect length of <array> (not) to be <param.length> but was <array.length>'

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given array has a length equals to the size of parameter
  - Error message: 'Expect size of <array> (not) to be <size(param)> but was <array.length>'

- `toBeEmpty()`
  - Check that a given array is empty (i.e. has a length equal to zero)
  - Error message: 'Expect <array> (not) to be empty'

- `toBeSorted(comparator)`
  - Check that a given array is sorted (using given comparator if given)
  - Error message: 'Expect <array> (not) to be sorted'

- `toVerify(iterator)`
  - Check that all values of array verify function iterator (must return a truthy / falsy value).
  - Error message: 'Expect <actual> (not) to verify condition'

- `toHaveSome(iterator)`
  - Check that at least one values of array verify function iterator (must return a truthy / falsy value).
  - Error message: 'Expect <actual> (not) to have at least one element that verify condition'

- `toContainsDistinctValues()`
  - Check that a given array contains only distinct values.
  - Error message: 'Expect <actual> (not) to contains only distinct values'

- `toContainsOnlyTruthyValues()`
  - Check that a given array contains only truthy values.
  - Error message: 'Expect <actual> (not) to contains only truthy values'

- `toContainsOnlyFalsyValues()`
  - Check that a given array contains only falsy values.
  - Error message: 'Expect <actual> (not) to contains only falsy values'

### Objects

- `toBeInstanceOf(Klass)`
  - Check that a given object is an instance of given class.
  - Error message: 'Expect <actual> (not) to be an instance of <Klass>'

- `toHaveKeys(keys...)`
  - Check that a given object contains given keys
  - Error message: 'Expect object <object> to contain keys <keys>'

- `toHaveValues(values...)`
  - Check that a given object contains given values
  - Error message: 'Expect object <object> to contain values <values>'

- `toHaveFunctions(functionNames...)`
  - Check that a given object contains given functions
  - Error message: 'Expect object <object> to contain functions <functionNames>'

- `toHaveSize(expectedSize)`
  - Check that a given object has an expected size (i.e. number of keys)
  - Error message: 'Expect size of <object> (not) to be <expectedSize> but was <object.size>'

- `toHaveSameSizeAs(object|array|string)`
  - Check that a given object has a size equals to the size of parameter
  - Error message: 'Expect size of <array> (not) to be <size(param)> but was <array.length>'

- `toBeEmpty()`
  - Check that a given object is empty (i.e. does not have any key)
  - Error message: 'Expect <object> (not) to be empty'

### Functions

- `toBeAFunction()`
  - Check that a given value is a function
  - Error message: 'Expect <actual> (not) to be a function'

- `toHaveBeenCalledOnce()`
  - Check that a given spy has been called exactly one time
  - Error message: 'Expect spy to have been called once but was called <actual.callCount> time(s)'

- `toHaveBeenCalledOnceWith(args...)`
  - Check that a given spy has been called exactly one time with given arguments
  - Error message: 'Expect spy to have been called once but was called <actual.callCount> time(s) (with different arguments)'

## Licence

MIT License (MIT)

## Contributing

If you think some matchers are missing or error messages are not useful enough, feel free to contribute and submit an issue or a pull request.
