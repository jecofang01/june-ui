import invariant from 'invariant'
import isEmpty from 'lodash.isempty'
import isFunction from 'lodash.isfunction'
import isString from 'lodash.isstring'

import checkStore from './checkStore'
import { RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT } from './sagaMode'

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT]

const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) registerSaga: Expected `key` to be a non empty string'
  )

const checkSaga = saga =>
  invariant(isFunction(saga), '(app/utils...) registerSaga: Expected `saga` to be a function')

const checkMode = mode =>
  invariant(
    isString(mode) && allowedModes.includes(mode),
    '(app/utils...) registerSaga: Expected a valid saga mode'
  )

export const sagaRegistrarFactory = (store, isValid) => {
  if (!isValid) {
    checkStore(store)
  }

  const register = (key, descriptor = {}, args) => {
    const { saga, mode } = {
      ...descriptor,
      mode: descriptor.mode || RESTART_ON_REMOUNT
    }

    checkKey(key)
    checkSaga(saga)
    checkMode(mode)

    let hasRegistered = Reflect.has(store.registeredSagas, key)

    if (process.env.NODE_ENV !== 'production' && hasRegistered) {
      const { saga: registeredSaga, task } = store.registeredSagas[key]
      if (registeredSaga !== saga) {
        task.descriptor.cancel()
        hasRegistered = false
      }
    }

    if (!hasRegistered || (hasRegistered && mode === RESTART_ON_REMOUNT)) {
      /* eslint-disable no-param-reassign */
      store.registeredSagas[key] = {
        saga,
        mode,
        task: store.runSaga(saga, args)
      }
      /* eslint-enable no-param-reassign */
    }
  }

  const unregister = key => {
    checkKey(key)

    if (Reflect.has(store.registeredSagas, key)) {
      const { mode, task } = store.registeredSagas[key]
      if (mode && mode !== DAEMON) {
        task.cancel()
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done' // eslint-disable-line no-param-reassign
        }
      }
    }
  }

  return {
    register,
    unregister
  }
}

export default store => {
  checkStore(store)

  return sagaRegistrarFactory(store, true)
}
