"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactIs = require("react-is");

var _RefFindNode = _interopRequireDefault(require("./RefFindNode"));

var _RefForward = _interopRequireDefault(require("./RefForward"));

/**
 * This component exposes a prop that supports functional and createRef() API and returns the DOM
 * node of both functional and class component children.
 */
function Ref(props) {
  var children = props.children,
      innerRef = props.innerRef;

  var child = _react.default.Children.only(children);

  var ElementType = (0, _reactIs.isForwardRef)(child) ? _RefForward.default : _RefFindNode.default;
  return _react.default.createElement(ElementType, {
    innerRef: innerRef
  }, child);
}

Ref.handledProps = ["children", "innerRef"];
Ref.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: _propTypes.default.element.isRequired,

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
} : {};
Ref.FindNode = _RefFindNode.default;
Ref.Forward = _RefForward.default;
var _default = Ref;
exports.default = _default;