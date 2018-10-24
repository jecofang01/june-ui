// @flow
import React, { type ComponentType } from 'react'
import { ThemeConsumer } from 'styled-components'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { setDisplayName, wrapDisplayName } from 'recompose'
import get from 'lodash.get'
import merge from 'lodash.merge'

/**
 * This function rewrite styled-component withTheme
 *
 * The defaultTheme, mappedTheme, contextTheme and propsTheme
 * are merged recursively. The merged value respect the right
 * most value
 *
 * @param {function} mapper map theme value to another
 */
const withTheme = (mapper?: ({ [key: string]: mixed }) => { [key: string]: mixed }) => (
  BaseComponent: ComponentType<any>
) => {
  const WithTheme = React.forwardRef((props, ref) => (
    <ThemeConsumer>
      {(theme: { [key: string]: mixed } = {}) => {
        // $FlowFixMe
        const { defaultProps } = BaseComponent
        // $FlowFixMe
        const isDefaultTheme = defaultProps && props.theme === defaultProps.theme

        const defaultTheme = get(defaultProps, 'theme', {})
        const propsTheme = props.theme && !isDefaultTheme ? props.theme : {}
        const mappedTheme = mapper !== null && typeof mapper === 'function' ? mapper(theme) : {}

        const mergedProps = merge(defaultTheme, mappedTheme, theme, propsTheme)

        return <BaseComponent {...props} ref={ref} theme={mergedProps} />
      }}
    </ThemeConsumer>
  ))

  hoistNonReactStatics(WithTheme, BaseComponent)

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withTheme'))(WithTheme)
  }

  /* istanbul ignore next */
  return WithTheme
}

export default withTheme
