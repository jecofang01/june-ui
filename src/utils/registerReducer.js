import React, { Component } from 'react'
import { ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'

import reducerRegistrar from './reducerRegistrar'

/**
 * Dynamically register a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  const displayName =
    WrappedComponent.displayName ||
    /* istanbul ignore next */ WrappedComponent.name ||
    /* istanbul ignore next */ 'Component'

  class ReducerRegistrar extends Component {
    constructor(props, context) {
      super(props)

      const { register } = reducerRegistrar(context.store)

      register(key, reducer)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ReducerRegistrar.contextType = ReactReduxContext

  ReducerRegistrar.WrappedComponent = WrappedComponent

  ReducerRegistrar.displayName = `withReducer(${displayName})`

  return hoistNonReactStatics(ReducerRegistrar, WrappedComponent)
}
