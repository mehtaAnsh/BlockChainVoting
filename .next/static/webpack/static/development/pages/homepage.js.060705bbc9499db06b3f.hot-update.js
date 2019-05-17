webpackHotUpdate("static\\development\\pages\\homepage.js",{

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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _static_hometest_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../static/hometest.css */ "./static/hometest.css");
/* harmony import */ var _static_hometest_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_static_hometest_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");
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
      color: "black"
    }
  }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h4",
    content: "Make your vote count!",
    inverted: true,
    style: {
      fontSize: mobile ? '1.5em' : '1.7em',
      fontWeight: 'normal',
      marginTop: mobile ? '0.5em' : '1.5em',
      color: "grey"
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
      color: "white",
      backgroundColor: "#627eea"
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
  }, " Sign in for Voters!"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_routes__WEBPACK_IMPORTED_MODULE_9__["Link"], {
    route: "/voter_login"
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Button"], {
    primary: true,
    size: "huge",
    style: {
      color: "white",
      backgroundColor: "#627eea"
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
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_12__["Helmet"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("link", {
        href: "http://allfont.net/allfont.css?fonts=freestyle-script-normal",
        rel: "stylesheet",
        type: "text/css"
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("title", null, "HomePage"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("link", {
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
          fontFamily: 'Times',
          fontSize: '400%',
          paddingLeft: '36%'
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
      backgroundColor: "#627eea"
    }
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Container"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h3",
    style: {
      fontSize: '2em',
      color: "white",
      textAlign: "center"
    }
  }, "A fascinating quote"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
    style: {
      fontSize: '1.33em',
      textAlign: "center",
      fontStyle: 'Italic'
    }
  }, "\"We have elected to put our money and faith in a mathematical framework that is free of politics and human error.\""), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Header"], {
    as: "h2",
    style: {
      fontSize: '1.33em',
      color: "white",
      textAlign: "center"
    }
  }, "Tyler Winklevoss"))));
};

/* harmony default export */ __webpack_exports__["default"] = (HomepageLayout);

/***/ })

})
//# sourceMappingURL=homepage.js.060705bbc9499db06b3f.hot-update.js.map