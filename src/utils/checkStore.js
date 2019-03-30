import invariant from 'invariant'
import conformsTo from 'lodash.conformsto'
import isFunction from 'lodash.isfunction'
import isObject from 'lodash.isobject'

/**
 * refer to https://github.com/react-boilerplate/react-boilerplate
 * Validate the shape of redux store
 */
export default store => {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    registeredReducers: isObject,
    registeredSagas: isObject
  }
  invariant(conformsTo(store, shape), '(app/utils...) registrar: Expected a valid redux store')
}
