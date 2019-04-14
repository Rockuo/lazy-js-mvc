"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ELEMENTS_METADATA_MULTIPLE = exports.ELEMENTS_METADATA_SINGLE = exports.DATA_METADATA_MULTIPLE = exports.DATA_METADATA_SINGLE = exports.Controller = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Controller = require('./Controller')["default"];

exports.Controller = Controller;
var DATA_METADATA_SINGLE = Symbol('single');
exports.DATA_METADATA_SINGLE = DATA_METADATA_SINGLE;
var DATA_METADATA_MULTIPLE = Symbol('multiple');
exports.DATA_METADATA_MULTIPLE = DATA_METADATA_MULTIPLE;
var ELEMENTS_METADATA_SINGLE = Symbol('single');
exports.ELEMENTS_METADATA_SINGLE = ELEMENTS_METADATA_SINGLE;
var ELEMENTS_METADATA_MULTIPLE = Symbol('multiple');
exports.ELEMENTS_METADATA_MULTIPLE = ELEMENTS_METADATA_MULTIPLE;
var mvc = {
  init: function init(controllers) {
    if (controllers['_jsMvcControllersAll']) {
      controllers = Object.assign.apply(Object, [{}].concat(_toConsumableArray(controllers['_jsMvcControllersAll'])));
    } else {
      controllers = _objectSpread({}, controllers);
    }

    var controllerMethodEl = document.querySelector('input[data-js-mvc-routing="js-mvc-route"]');

    if (!controllerMethodEl || !controllerMethodEl.value || controllerMethodEl.value.indexOf('::') === -1) {
      throw new Error('Invalid Controller::method');
    }

    var _controllerMethodEl$v = controllerMethodEl.value.split('::'),
        _controllerMethodEl$v2 = _slicedToArray(_controllerMethodEl$v, 2),
        fullClass = _controllerMethodEl$v2[0],
        method = _controllerMethodEl$v2[1];

    var _fullClass$split$slic = fullClass.split('\\').slice(-1),
        _fullClass$split$slic2 = _slicedToArray(_fullClass$split$slic, 1),
        className = _fullClass$split$slic2[0];

    if (controllers[className]) {
      var controller = new controllers[className]();

      if (controller[method]) {
        var metadata = {};
        controller[method](getElements(metadata), getData(metadata), metadata);
      }
    }
  }
};
var _default = mvc;
exports["default"] = _default;

function getElements() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elements = {};
  metadata.elementsMetadata = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = document.querySelectorAll('[data-js-mvc-element]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;
      var key = elem.getAttribute('data-js-mvc-element');

      if (!metadata.elementsMetadata[key]) {
        metadata.elementsMetadata[key] = ELEMENTS_METADATA_SINGLE;
        elements[key] = elem;
      } else if (metadata.elementsMetadata[key] === ELEMENTS_METADATA_SINGLE) {
        metadata.elementsMetadata[key] = ELEMENTS_METADATA_MULTIPLE;
        data[key] = [data[key], elem];
      } else {
        data[key].push(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return elements;
}

function getData() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var data = {};
  metadata.dataMetadata = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = document.querySelectorAll('[data-js-mvc-data]')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var elem = _step2.value;
      var key = elem.getAttribute('data-js-mvc-data');
      var value = JSON.parse(elem.value);

      if (!!+elem.getAttribute('data-js-mvc-is-scalar')) {
        value = value[0];
      }

      if (!metadata.dataMetadata[key]) {
        metadata.dataMetadata[key] = DATA_METADATA_SINGLE;
        data[key] = value;
      } else if (metadata.dataMetadata[key] === DATA_METADATA_SINGLE) {
        metadata.dataMetadata[key] = DATA_METADATA_MULTIPLE;
        data[key] = [data[key], value];
      } else {
        data[key].push(value);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return data;
}