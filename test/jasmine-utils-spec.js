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

describe('jasmine-utils', function() {

  describe('toHaveLength', function() {
    beforeEach(function() {
      this.array = [1, 2, 3];
    });

    it('should pass with an array', function() {
      expect([1, 2, 3]).toHaveLength(3);
      expect([1, 2, 3]).not.toHaveLength(1);
    });

    it('should pass with a string of expected length', function() {
      expect('123').toHaveLength(3);
      expect('123').not.toHaveLength(1);
    });
  });

  describe('toHaveSize', function() {
    it('should pass with an array of expected size', function() {
      expect([1, 2, 3]).toHaveSize(3);
      expect([1, 2, 3]).not.toHaveSize(1);
    });

    it('should pass with an object of expected size', function() {
      var obj = {
        'one': 1,
        'two': 2,
        'three': 3
      };

      expect(obj).toHaveSize(3);
      expect(obj).not.toHaveSize(1);
    });

    it('should pass with a string of expected size', function() {
      expect('123').toHaveSize(3);
      expect('123').not.toHaveSize(1);
    });
  });

  describe('toBeEmpty', function() {
    it('should pass with an array', function() {
      expect([]).toBeEmpty();
      expect([1, 2, 3]).not.toBeEmpty();
    });

    it('should pass with an object', function() {
      expect({}).toBeEmpty();
      expect({'one': 1}).not.toBeEmpty();
    });

    it('should pass with an empty string', function() {
      expect('').toBeEmpty();
      expect('123').not.toBeEmpty();
    });

    it('should pass with null', function() {
      expect(null).toBeEmpty();
    });

    it('should pass with undefined', function() {
      expect(undefined).toBeEmpty();
    });
  });

  describe('toBeAnArray', function() {
    it('should pass', function() {
      expect([]).toBeAnArray();
      expect('123').not.toBeAnArray();
      expect(1).not.toBeAnArray();
      expect(false).not.toBeAnArray();
      expect({}).not.toBeAnArray();
      expect(null).not.toBeAnArray();
      expect(undefined).not.toBeAnArray();
    });
  });

  describe('toBeNull', function() {
    it('should pass', function() {
      expect(null).toBeNull();
      expect('123').not.toBeNull();
      expect(1).not.toBeNull();
      expect(false).not.toBeNull();
      expect({}).not.toBeNull();
      expect(undefined).not.toBeNull();
    });
  });

  describe('toBeANumber', function() {
    it('should pass', function() {
      expect(1).toBeANumber();
      expect(0).toBeANumber();

      expect('123').not.toBeANumber();
      expect(false).not.toBeANumber();
      expect({}).not.toBeANumber();
      expect(undefined).not.toBeANumber();
      expect(null).not.toBeANumber();
    });
  });

  describe('toBeAString', function() {
    it('should pass', function() {
      expect('1').toBeAString();
      expect('').toBeAString();

      expect(123).not.toBeAString();
      expect(false).not.toBeAString();
      expect({}).not.toBeAString();
      expect(undefined).not.toBeAString();
      expect(null).not.toBeAString();
    });
  });

  describe('toBeAnEmptyString', function() {
    it('should pass', function() {
      expect('').toBeAnEmptyString();

      expect('123').not.toBeAnEmptyString();
      expect(' ').not.toBeAnEmptyString();
    });
  });

  describe('toBeZero', function() {
    it('should pass', function() {
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

  describe('toBePositive', function() {
    it('should pass', function() {
      expect(1).toBePositive();

      expect(-1).not.toBePositive();
      expect(0).not.toBePositive();
    });
  });

  describe('toBeNegative', function() {
    it('should pass', function() {
      expect(-1).toBeNegative();

      expect(1).not.toBeNegative();
      expect(0).not.toBeNegative();
    });
  });

  describe('toBeAFunction', function() {
    it('should pass', function() {
      var myFunc = function() {};
      expect(myFunc).toBeAFunction();

      expect(0).not.toBeAFunction();
      expect(null).not.toBeAFunction();
    });
  });

  describe('toBeInstanceOf', function() {
    it('should pass', function() {
      var Klass = function() {
      };

      var value = new Klass();

      expect(value).toBeInstanceOf(Klass);
    });
  });

  describe('toHaveKeys', function() {
    it('should pass', function() {
      var obj = {
        id: 1,
        name: 'foo'
      };

      expect(obj).toHaveKeys('id', 'name');
      expect(obj).not.toHaveKeys('foo', 'bar');
    });
  });

  describe('toBeADate', function() {
    it('should pass', function() {
      expect(new Date()).toBeADate();

      expect(null).not.toBeADate();
      expect(123).not.toBeADate();
    });
  });

  describe('toVerify', function() {
    it('should pass', function() {
      var iterator = function(item) {
        return item % 2 === 0;
      };

      expect([2, 4, 6, 8]).toVerify(iterator);
      expect([2, 4, 6, 8, 9]).not.toVerify(iterator);
    });
  });

  describe('toHaveSome', function() {
    it('should pass', function() {
      var iterator = function(item) {
        return item % 2 === 0;
      };

      expect([1, 2, 3]).toHaveSome(iterator);
      expect([1, 3, 5, 7]).not.toHaveSome(iterator);
    });
  });

  describe('toBeDateCloseTo', function() {
    it('should pass', function() {
      var date1 = new Date(2014, 6, 6, 10, 0, 0, 0);
      var date2 = new Date(2014, 6, 6, 10, 0, 0, 1000);

      expect(date1).toBeDateCloseTo(date2, 1000);
      expect(date1).toBeDateCloseTo(date2);
      expect(date1).not.toBeDateCloseTo(date2, 999);
    });
  });

  describe('toBeDateCloseToNow', function() {
    it('should pass', function() {
      var date = new Date(new Date().getTime() + 900);

      expect(date).toBeDateCloseToNow(1000);
      expect(date).toBeDateCloseToNow();
      expect(date).not.toBeDateCloseToNow(890);
    });
  });

  describe('toBeDateAfter', function() {
    it('should pass', function() {
      var date1 = new Date(new Date().getTime() + 1000);
      var date2 = new Date(new Date().getTime() + 2000);

      expect(date2).toBeDateAfterNow();
      expect(date2).toBeDateAfter(date1);
      expect(date1).not.toBeDateAfter(date2);
    });
  });

  describe('toBeDateBefore', function() {
    it('should pass', function() {
      var date1 = new Date(new Date().getTime() - 2000);
      var date2 = new Date(new Date().getTime() - 1000);

      expect(date1).toBeDateBeforeNow();
      expect(date1).toBeDateBefore(date2);
      expect(date2).not.toBeDateBefore(date1);
    });
  });

  describe('toBeABoolean', function() {
    it('should pass', function() {
      expect(true).toBeABoolean();
      expect(false).toBeABoolean();

      expect(0).not.toBeABoolean();
      expect(null).not.toBeABoolean();
      expect(undefined).not.toBeABoolean();
      expect('').not.toBeABoolean();
    });
  });

  describe('toBeTrue', function() {
    it('should pass', function() {
      expect(true).toBeTrue();

      expect(false).not.toBeTrue();
      expect(0).not.toBeTrue();
      expect(null).not.toBeTrue();
      expect(undefined).not.toBeTrue();
      expect('').not.toBeTrue();
    });
  });

  describe('toBeFalse', function() {
    it('should pass', function() {
      expect(false).toBeFalse();

      expect(true).not.toBeFalse();
      expect(0).not.toBeFalse();
      expect(null).not.toBeFalse();
      expect(undefined).not.toBeFalse();
      expect('').not.toBeFalse();
    });
  });
});
