import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import * as PropTypes from 'prop-types';
import { cloneElement, Component } from 'react';
import { handleRef } from '../../lib/refUtils';

var RefForward =
/*#__PURE__*/
function (_Component) {
  _inherits(RefForward, _Component);

  function RefForward() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RefForward);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RefForward)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRefOverride", function (node) {
      var _this$props = _this.props,
          children = _this$props.children,
          innerRef = _this$props.innerRef;
      handleRef(children.ref, node);
      handleRef(innerRef, node);
    });

    return _this;
  }

  _createClass(RefForward, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return cloneElement(children, {
        ref: this.handleRefOverride
      });
    }
  }]);

  return RefForward;
}(Component);

_defineProperty(RefForward, "handledProps", ["children", "innerRef"]);

export { RefForward as default };
RefForward.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.element.isRequired,

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : {};