import { persistCombineReducers } from 'redux-persist'
import session from 'redux-persist/lib/storage/session'
import { reducer as formReducer } from 'redux-form'
import { reducer as loaderReducer } from './utils/loader'

const rootPersistConfig = {
  key: 'juneui',
  debug: process.env.NODE_ENV !== 'production',
  storage: session,
  whitelist: ['auth']
}

export default (injectedReducers = {}) =>
  persistCombineReducers(rootPersistConfig, {
    ...injectedReducers, // dynamic registered reducer
    // global reducer goes here
    loader: loaderReducer,
    form: formReducer
  })
