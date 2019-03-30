import invariant from 'invariant'
import isEmpty from 'lodash.isempty'
import isFunction from 'lodash.isfunction'
import isString from 'lodash.isstring'

import checkStore from './checkStore'
import createReducer from '../reducers'

export const reducerRegistrarFactory = (store, isValid) => (key, reducer) => {
  if (!isValid) {
    checkStore(store)
  }

  invariant(
    isString(key) && !isEmpty(key) && isFunction(reducer),
    '(app/utils...) registerReducer: Expected `reducer` to be a reducer function'
  )

  if (Reflect.has(store.registeredReducers, key) && store.registeredReducers[key] === reducer) {
    return
  }

  store.registeredReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(createReducer(store.registeredReducers))
}

export default store => {
  checkStore(store)

  return {
    register: reducerRegistrarFactory(store, true)
  }
}
