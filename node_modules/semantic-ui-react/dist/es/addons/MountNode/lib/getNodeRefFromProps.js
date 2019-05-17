import _isNil from "lodash/isNil";
import _memoize from "lodash/memoize";
import { isBrowser, isRefObject } from '../../../lib';

var toRef = _memoize(function (node) {
  return {
    current: node
  };
});
/**
 * Given `this.props`, return a `node` value or undefined.
 *
 * @param {object|React.RefObject} props Component's props
 * @return {React.RefObject|undefined}
 */


var getNodeRefFromProps = function getNodeRefFromProps(props) {
  var node = props.node;

  if (isBrowser()) {
    if (isRefObject(node)) return node;
    return _isNil(node) ? toRef(document.body) : toRef(node);
  }
};

export default getNodeRefFromProps;