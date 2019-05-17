import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import PropTypes from 'prop-types';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { handleRef } from '../../lib/refUtils';

var RefFindNode =
/*#__PURE__*/
function (_Component) {
  _inherits(RefFindNode, _Component);

  function RefFindNode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RefFindNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RefFindNode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "prevNode", null);

    return _this;
  }

  _createClass(RefFindNode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this.prevNode = findDOMNode(this);
      handleRef(this.props.innerRef, this.prevNode);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // eslint-disable-next-line react/no-find-dom-node
      var currentNode = findDOMNode(this);

      if (this.prevNode !== currentNode) {
        this.prevNode = currentNode;
        handleRef(this.props.innerRef, currentNode);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      handleRef(this.props.innerRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children;
    }
  }]);

  return RefFindNode;
}(Component);

_defineProperty(RefFindNode, "handledProps", ["children", "innerRef"]);

export { RefFindNode as default };
RefFindNode.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.element.isRequired,

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : {};