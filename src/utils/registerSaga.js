import React, { Component } from 'react'
import { ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'

import sagaRegistrar from './sagaRegistrar'

/**
 * Dynamically register a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default ({ key, saga, mode }) => WrappedComponent => {
  const displayName =
    WrappedComponent.displayName ||
    /* istanbul ignore next */ WrappedComponent.name ||
    /* istanbul ignore next */ 'Component'

  class SagaRegistrar extends Component {
    constructor(props, context) {
      super(props)

      const { register, unregister } = sagaRegistrar(context.store)

      register(key, { saga, mode }, this.props)

      this.unregister = unregister
    }

    componentWillUnmount() {
      this.unregister(key)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  SagaRegistrar.contextType = ReactReduxContext

  SagaRegistrar.WrappedComponent = WrappedComponent

  SagaRegistrar.displayName = `withSaga(${displayName})`

  return hoistNonReactStatics(SagaRegistrar, WrappedComponent)
}
