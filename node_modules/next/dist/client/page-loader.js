"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global document */

var mitt_1 = __importDefault(require("next-server/dist/lib/mitt")); // smaller version of https://gist.github.com/igrigorik/a02f2359f3bc50ca7a9c


function supportsPreload(list) {
  if (!list || !list.supports) {
    return false;
  }

  try {
    return list.supports('preload');
  } catch (e) {
    return false;
  }
}

var hasPreload = supportsPreload(document.createElement('link').relList);

var PageLoader =
/*#__PURE__*/
function () {
  function PageLoader(buildId, assetPrefix) {
    (0, _classCallCheck2.default)(this, PageLoader);
    this.buildId = buildId;
    this.assetPrefix = assetPrefix;
    this.pageCache = {};
    this.prefetchCache = new _set.default();
    this.pageRegisterEvents = mitt_1.default();
    this.loadingRoutes = {};
  }

  (0, _createClass2.default)(PageLoader, [{
    key: "normalizeRoute",
    value: function normalizeRoute(route) {
      if (route[0] !== '/') {
        throw new Error("Route name should start with a \"/\", got \"".concat(route, "\""));
      }

      route = route.replace(/\/index$/, '/');
      if (route === '/') return route;
      return route.replace(/\/$/, '');
    }
  }, {
    key: "loadPage",
    value: function loadPage(route) {
      var _this = this;

      route = this.normalizeRoute(route);
      return new _promise.default(function (resolve, reject) {
        var fire = function fire(_ref) {
          var error = _ref.error,
              page = _ref.page;

          _this.pageRegisterEvents.off(route, fire);

          delete _this.loadingRoutes[route];

          if (error) {
            reject(error);
          } else {
            resolve(page);
          }
        }; // If there's a cached version of the page, let's use it.


        var cachedPage = _this.pageCache[route];

        if (cachedPage) {
          var error = cachedPage.error,
              page = cachedPage.page;
          error ? reject(error) : resolve(page);
          return;
        } // Register a listener to get the page


        _this.pageRegisterEvents.on(route, fire); // If the page is loading via SSR, we need to wait for it
        // rather downloading it again.


        if (document.getElementById("__NEXT_PAGE__".concat(route))) {
          return;
        } // Load the script if not asked to load yet.


        if (!_this.loadingRoutes[route]) {
          _this.loadScript(route);

          _this.loadingRoutes[route] = true;
        }
      });
    }
  }, {
    key: "loadScript",
    value: function loadScript(route) {
      var _this2 = this;

      route = this.normalizeRoute(route);
      var scriptRoute = route === '/' ? '/index.js' : "".concat(route, ".js");
      var script = document.createElement('script');
      var url = "".concat(this.assetPrefix, "/_next/static/").concat(encodeURIComponent(this.buildId), "/pages").concat(scriptRoute);
      script.crossOrigin = process.crossOrigin;
      script.src = url;

      script.onerror = function () {
        var error = new Error("Error when loading route: ".concat(route));
        error.code = 'PAGE_LOAD_ERROR';

        _this2.pageRegisterEvents.emit(route, {
          error: error
        });
      };

      document.body.appendChild(script);
    } // This method if called by the route code.

  }, {
    key: "registerPage",
    value: function registerPage(route, regFn) {
      var _this3 = this;

      var register = function register() {
        try {
          var _regFn = regFn(),
              error = _regFn.error,
              page = _regFn.page;

          _this3.pageCache[route] = {
            error: error,
            page: page
          };

          _this3.pageRegisterEvents.emit(route, {
            error: error,
            page: page
          });
        } catch (error) {
          _this3.pageCache[route] = {
            error: error
          };

          _this3.pageRegisterEvents.emit(route, {
            error: error
          });
        }
      };

      if (process.env.NODE_ENV !== 'production') {
        // Wait for webpack to become idle if it's not.
        // More info: https://github.com/zeit/next.js/pull/1511
        if (module.hot && module.hot.status() !== 'idle') {
          console.log("Waiting for webpack to become \"idle\" to initialize the page: \"".concat(route, "\""));

          var check = function check(status) {
            if (status === 'idle') {
              module.hot.removeStatusHandler(check);
              register();
            }
          };

          module.hot.status(check);
          return;
        }
      }

      register();
    }
  }, {
    key: "prefetch",
    value: function () {
      var _prefetch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(route) {
        var _this4 = this;

        var scriptRoute, link;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                route = this.normalizeRoute(route);
                scriptRoute = route === '/' ? '/index.js' : "".concat(route, ".js");

                if (!this.prefetchCache.has(scriptRoute)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                this.prefetchCache.add(scriptRoute); // Inspired by quicklink, license: https://github.com/GoogleChromeLabs/quicklink/blob/master/LICENSE
                // Don't prefetch if the user is on 2G / Don't prefetch if Save-Data is enabled

                if (!('connection' in navigator)) {
                  _context.next = 8;
                  break;
                }

                if (!((navigator.connection.effectiveType || '').indexOf('2g') !== -1 || navigator.connection.saveData)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return");

              case 8:
                if (!hasPreload) {
                  _context.next = 16;
                  break;
                }

                link = document.createElement('link');
                link.rel = 'preload';
                link.crossOrigin = process.crossOrigin;
                link.href = "".concat(this.assetPrefix, "/_next/static/").concat(encodeURIComponent(this.buildId), "/pages").concat(scriptRoute);
                link.as = 'script';
                document.head.appendChild(link);
                return _context.abrupt("return");

              case 16:
                if (!(document.readyState === 'complete')) {
                  _context.next = 21;
                  break;
                }

                _context.next = 19;
                return this.loadPage(route);

              case 19:
                _context.next = 22;
                break;

              case 21:
                return _context.abrupt("return", new _promise.default(function (resolve, reject) {
                  window.addEventListener('load', function () {
                    _this4.loadPage(route).then(function () {
                      return resolve();
                    }, reject);
                  });
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function prefetch(_x) {
        return _prefetch.apply(this, arguments);
      }

      return prefetch;
    }()
  }, {
    key: "clearCache",
    value: function clearCache(route) {
      route = this.normalizeRoute(route);
      delete this.pageCache[route];
      delete this.loadingRoutes[route];
      var script = document.getElementById("__NEXT_PAGE__".concat(route));

      if (script) {
        script.parentNode.removeChild(script);
      }
    }
  }]);
  return PageLoader;
}();

exports.default = PageLoader;