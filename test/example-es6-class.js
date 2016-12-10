'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExampleEs6Class = function () {
  function ExampleEs6Class() {
    _classCallCheck(this, ExampleEs6Class);
  }

  _createClass(ExampleEs6Class, [{
    key: 'methodOne',
    value: function methodOne() {}
  }, {
    key: 'methodTwo',
    value: function methodTwo() {}
  }]);

  return ExampleEs6Class;
}();

var ChildExampleEs6Class = function (_ExampleEs6Class) {
  _inherits(ChildExampleEs6Class, _ExampleEs6Class);

  function ChildExampleEs6Class() {
    _classCallCheck(this, ChildExampleEs6Class);

    return _possibleConstructorReturn(this, (ChildExampleEs6Class.__proto__ || Object.getPrototypeOf(ChildExampleEs6Class)).call(this));
  }

  _createClass(ChildExampleEs6Class, [{
    key: 'methodOne',
    value: function methodOne() {}
  }, {
    key: 'childMethodOne',
    value: function childMethodOne() {}
  }]);

  return ChildExampleEs6Class;
}(ExampleEs6Class);

//export default ExampleEs6Class;