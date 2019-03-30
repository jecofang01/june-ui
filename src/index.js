import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseLine from '@material-ui/core/CssBaseline'

import themes from './theme'
import configureStore from './configureStore'
import App from './app'

import './i18n'
import * as serviceWorker from './serviceWorker'

const store = configureStore()
const persistor = persistStore(store)

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={themes.default}>
          <CssBaseLine />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./app', () => {
    setImmediate(() => {
      unmountComponentAtNode(document.getElementById('root'))
      renderApp()
    })
  })
}

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
