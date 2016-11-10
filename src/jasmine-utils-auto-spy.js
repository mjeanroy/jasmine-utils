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


jasmine.autoSpy = (function autoMock() {

    var autoSpyAll = [];

    var helpers = {
        get: function get() {
            return autoSpyAll.slice(0);
        },
        remove: function remove(obj) {
            if(!Array.isArray(obj)) {
                obj = [obj];
            }
            for (var i = 0, size = obj.length; i < size; ++i) {
                var index = autoSpyAll.indexOf(obj[i]);
                if(index !== -1) {
                    autoSpyAll.splice(index, 1);
                }
            }
            return helpers.get();
        },
        add: function add(obj) {
            if(!Array.isArray(obj)) {
                obj = [obj];
            }
            for (var i = 0, size = obj.length; i < size; ++i) {
                if(autoSpyAll.indexOf(obj[i]) === -1) {
                    autoSpyAll.push(obj[i]);
                }
            }

            return helpers.get();
        }
    };

    function _beforeEach() {
        for (var i = 0, size = autoSpyAll.length; i < size; ++i) {
            jasmine.spyAll(autoSpyAll[i]);
        }
    }


    function _afterEach() {
        for (var i = 0, size = autoSpyAll.length; i < size; ++i) {
            jasmine.resetAll(autoSpyAll[i]);
        }
    }

    var autoSpy = function(objOrArrayOfObjects, description) {
        beforeAll(function () {
            if(description) {
                console.log('autoSpy:: ' + description)
            }
            helpers.add(objOrArrayOfObjects);
        });
        beforeEach(_beforeEach);

        afterEach(_afterEach);

        afterAll(function () {
            helpers.remove(objOrArrayOfObjects);
        });

    };

    autoSpy.get = helpers.get;

    autoSpy.add = helpers.add;

    autoSpy.remove = helpers.remove;

    autoSpy.removeAll = function removeAll() {
        autoSpyAll = [];
    };

    return autoSpy;

})();