import checkStore from './checkStore'

describe('checkStore', () => {
  let store

  beforeEach(() => {
    store = {
      dispatch: () => {},
      subscribe: () => {},
      getState: () => {},
      replaceReducer: () => {},
      runSaga: () => {},
      registeredReducers: {},
      registeredSagas: {}
    }
  })

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow()
  })

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrow()
    expect(() => checkStore({ ...store, registeredReducers: null })).toThrow()
    expect(() => checkStore({ ...store, registeredSagas: null })).toThrow()
    expect(() => checkStore({ ...store, runSaga: null })).toThrow()
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow()
  })
})