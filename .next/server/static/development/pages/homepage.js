module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "core-js/library/fn/object/create");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "core-js/library/fn/symbol");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);


function _getPrototypeOf(o) {
  _getPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a ? _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a : function _getPrototypeOf(o) {
    return o.__proto__ || _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inherits; });
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js");


function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__);

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof2(obj) { if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && typeof _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && _typeof2(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./pages/homepage.js":
/*!***************************!*\
  !*** ./pages/homepage.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _static_hometest_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../static/hometest.css */ "./static/hometest.css");
/* harmony import */ var _static_hometest_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_static_hometest_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_12__);














var HomepageHeading = function HomepageHeading(_ref) {
  var mobile = _ref.mobile;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Container"], {
    text: true,
    className: "cont"
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h1",
    content: "A blockchain-based E-voting system, built with love.",
    inverted: true,
    style: {
      fontSize: mobile ? '2em' : '3em',
      fontWeight: 'normal',
      marginBottom: 0,
      marginTop: mobile ? '1.5em' : '2em',
      color: 'black'
    }
  }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h4",
    content: "Make your vote count!",
    inverted: true,
    style: {
      fontSize: mobile ? '1.5em' : '1.7em',
      fontWeight: 'normal',
      marginTop: mobile ? '0.5em' : '1.5em',
      color: 'grey'
    }
  }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    style: {
      float: 'left',
      marginTop: '10%'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h4",
    style: {
      color: 'grey'
    }
  }, "Register/ Sign in for the company"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_routes__WEBPACK_IMPORTED_MODULE_9__["Link"], {
    route: "./company_login"
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Button"], {
    primary: true,
    size: "huge",
    style: {
      color: 'white',
      backgroundColor: '#627eea'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Icon"], {
    name: "left arrow"
  }), "Company"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
    style: {
      float: 'right',
      marginTop: '10%'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h4",
    style: {
      color: 'grey'
    }
  }, ' ', "Sign in for Voters!"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_routes__WEBPACK_IMPORTED_MODULE_9__["Link"], {
    route: "/voter_login"
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Button"], {
    primary: true,
    size: "huge",
    style: {
      color: 'white',
      backgroundColor: '#627eea'
    }
  }, "Voters", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Icon"], {
    name: "right arrow"
  })))));
};

HomepageHeading.propTypes = {
  mobile: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool
};

var DesktopContainer =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(DesktopContainer, _Component);

  function DesktopContainer() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, DesktopContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(DesktopContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "state", {});

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "hideFixedMenu", function () {
      return _this.setState({
        fixed: false
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "showFixedMenu", function () {
      return _this.setState({
        fixed: true
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(DesktopContainer, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var fixed = this.state.fixed;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Responsive"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("link", {
        rel: "stylesheet",
        href: "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_12__["Helmet"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("title", null, "HomePage"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("link", {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "../../static/logo3.png"
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Visibility"], {
        once: false,
        onBottomPassed: this.showFixedMenu,
        onBottomPassedReverse: this.hideFixedMenu
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Segment"], {
        inverted: true,
        textAlign: "center",
        style: {
          minHeight: 700,
          padding: '1em 0em'
        },
        vertical: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Menu"], {
        fixed: fixed ? 'top' : null,
        inverted: !fixed,
        pointing: !fixed,
        secondary: !fixed,
        size: "large",
        className: "menu"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Container"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h1", {
        style: {
          color: '#627eea',
          verticalAlign: 'middle',
          fontFamily: 'Freestyle Script',
          fontSize: '400%',
          paddingLeft: '42%'
        }
      }, "BlockVotes"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(HomepageHeading, null))), children);
    }
  }]);

  return DesktopContainer;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

DesktopContainer.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.node
};

var ResponsiveContainer = function ResponsiveContainer(_ref2) {
  var children = _ref2.children;
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(DesktopContainer, null, children));
};

ResponsiveContainer.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.node
};

var HomepageLayout = function HomepageLayout() {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ResponsiveContainer, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Segment"], {
    style: {
      padding: '8em 0em'
    },
    vertical: true
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Grid"], {
    columns: "equal",
    stackable: true
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Grid"].Row, {
    textAlign: "center"
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Grid"].Column, {
    style: {
      paddingBottom: '5em',
      paddingTop: '5em'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em'
    }
  }, "Private"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em'
    }
  }, "Doesn't give any information ", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("br", null), "regarding personal data."), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em'
    }
  }, "Secure"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em'
    }
  }, "Not even a single chance of shutting ", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("br", null), " down of the system.")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Image"], {
    src: "../static/ether2.png",
    width: "216",
    height: "256",
    style: {
      paddingTop: '50px'
    }
  }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Grid"].Column, {
    style: {
      paddingBottom: '5em',
      paddingTop: '5em'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em'
    }
  }, "Decentralized"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em'
    }
  }, "Decentralized technology gives you the ", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("br", null), " power to store your assets in a network."), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em'
    }
  }, "Immutable"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em'
    }
  }, "Keeps its ledgers in a never-ending ", react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("br", null), " state of forwarding momentum."))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Segment"], {
    inverted: true,
    vertical: true,
    style: {
      padding: '5em 0em',
      backgroundColor: '#627eea'
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Container"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em',
      color: 'white',
      textAlign: 'center'
    }
  }, "A fascinating quote"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em',
      textAlign: 'center',
      fontStyle: 'Italic'
    }
  }, "\"We have elected to put our money and faith in a mathematical framework that is free of politics and human error.\""), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h2",
    style: {
      fontSize: '1.33em',
      color: 'white',
      textAlign: 'center'
    }
  }, "Tyler Winklevoss"))));
};

/* harmony default export */ __webpack_exports__["default"] = (HomepageLayout);

/***/ }),

/***/ "./routes.js":
/*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var routes = __webpack_require__(/*! next-routes */ "next-routes")();

routes.add('/homepage', '/homepage').add('/company_login', '/company_login').add('/voter_login', '/voter_login').add('/election/:address/company_dashboard', '/election/company_dashboard').add('/election/:address/voting_list', '/election/voting_list').add('/election/:address/addcand', '/election/addcand').add('/election/:address/vote', '/election/vote').add('/election/:address/candidate_list', '/election/candidate_list');
module.exports = routes;

/***/ }),

/***/ "./static/hometest.css":
/*!*****************************!*\
  !*** ./static/hometest.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!*********************************!*\
  !*** multi ./pages/homepage.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\BlockChainVoting\BlockChainVoting-Private\pages\homepage.js */"./pages/homepage.js");


/***/ }),

/***/ "core-js/library/fn/object/create":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/create" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/get-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "core-js/library/fn/object/set-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/set-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "core-js/library/fn/symbol":
/*!********************************************!*\
  !*** external "core-js/library/fn/symbol" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),

/***/ "core-js/library/fn/symbol/iterator":
/*!*****************************************************!*\
  !*** external "core-js/library/fn/symbol/iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "next-routes":
/*!******************************!*\
  !*** external "next-routes" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-routes");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ })

/******/ });
//# sourceMappingURL=homepage.js.map