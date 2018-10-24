"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _recompose = require("recompose");

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This function rewrite styled-component withTheme
 *
 * The defaultTheme, mappedTheme, contextTheme and propsTheme
 * are merged recursively. The merged value respect the right
 * most value
 *
 * @param {function} mapper map theme value to another
 */
var withTheme = function withTheme(mapper) {
  return function (BaseComponent) {
    var WithTheme = _react.default.forwardRef(function (props, ref) {
      return _react.default.createElement(_styledComponents.ThemeConsumer, null, function () {
        var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // $FlowFixMe
        var defaultProps = BaseComponent.defaultProps; // $FlowFixMe

        var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
        var defaultTheme = (0, _lodash.default)(defaultProps, 'theme', {});
        var propsTheme = props.theme && !isDefaultTheme ? props.theme : {};
        var mappedTheme = mapper !== null && typeof mapper === 'function' ? mapper(theme) : {};
        var mergedProps = (0, _lodash2.default)(defaultTheme, mappedTheme, theme, propsTheme);
        return _react.default.createElement(BaseComponent, _extends({}, props, {
          ref: ref,
          theme: mergedProps
        }));
      });
    });

    (0, _hoistNonReactStatics.default)(WithTheme, BaseComponent);
    /* istanbul ignore else */

    if (process.env.NODE_ENV !== 'production') {
      return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withTheme'))(WithTheme);
    }
    /* istanbul ignore next */


    return WithTheme;
  };
};

var _default = withTheme;
exports.default = _default;
//# sourceMappingURL=withTheme.js.map