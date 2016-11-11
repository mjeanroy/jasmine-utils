/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Geoff Dutton <g.dutton@gmail.com>
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


describe('jasmine-utils-auto-spy', function() {
    var before = [],
        autoSpy = jasmine.autoSpy,
        mockMe = {
            one: function() {},
            two: function() {},
            multi: {
                one: function () {

                },
                two: function () {

                }
            }
        };

    beforeEach(function () {
        before = autoSpy.get();
    });

    describe('autoSpyAll', function () {

        it('should add to existing auto mocks', function () {
            var obj = {a: 'object'};
            expect(autoSpy.add(obj).length).toEqual(1 + before.length);
            expect(autoSpy.add(obj).length).toEqual(1 + before.length);
            expect(autoSpy.add({}).length).toEqual(2 + before.length);
        });

        it('should remove existing or non-existing auto mocks', function () {
            var obj = {some: 'object'},
                now = autoSpy.remove(obj);

            expect(now.length).toEqual(before.length);
            now = autoSpy.add(obj);
            expect(now.length).toEqual(before.length + 1);
            now = autoSpy.remove(obj);
            expect(now.length).toEqual(before.length);
        });

        it('should add a single object', function() {
            var obj = {some: 'object2'};
            autoSpy.add(obj);
            expect(autoSpy.get().length).toEqual(before.length + 1);
        });

        it('should add an array of objects', function() {
            var obj = {some: 'object3'},
                obj2 = {other: 'object4'};

            autoSpy.add([obj, obj2]);
            expect(autoSpy.get().length).toEqual(before.length + 2);
            autoSpy.remove([obj, obj2]);
            expect(autoSpy.get().length).toEqual(before.length);
        });
    });

    describe('jasmine.autoSpyAll - parent scope', function() {
        beforeAll(autoSpy.removeAll);

        autoSpy([mockMe], 'parent scope');

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

            describe(' - second child scope', function () {
                var andAnotherObj = {nextAgain: function() {}};
                autoSpy(andAnotherObj, ' - second child scope');

                it('should add to existing auto mock', function () {
                    expect(autoSpy.get().length).toBe(3);
                    expect(autoSpy.get()[0]).toBe(mockMe);
                    expect(jasmine.isSpy(mockMe.one)).toBe(true);

                    expect(autoSpy.get()[1]).toBe(anotherObj);
                    expect(jasmine.isSpy(anotherObj.another)).toBe(true);

                    expect(autoSpy.get()[2]).toBe(andAnotherObj);
                    expect(jasmine.isSpy(andAnotherObj.nextAgain)).toBe(true);
                });
            });

            it('should remove the added spies after each describe block', function () {
                expect(autoSpy.get().length).toBe(2);
                expect(autoSpy.get()[0]).toBe(mockMe);
                expect(jasmine.isSpy(mockMe.one)).toBe(true);

                expect(autoSpy.get()[1]).toBe(anotherObj);
                expect(jasmine.isSpy(anotherObj.another)).toBe(true);
            });
        });

        it('should auto spy after child scopes', function () {
            var now = autoSpy.get().length;
            expect(now).toBe(1);
            expect(autoSpy.get()[0]).toBe(mockMe);
            expect(jasmine.isSpy(mockMe.one)).toBe(true);
        });
    });
});