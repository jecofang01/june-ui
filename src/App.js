import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AuthorizedRoute from './components/router'
import { LOGIN_PATH } from './constants'

import Login from './pages/login'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LOGIN_PATH} component={Login} />
      <AuthorizedRoute
        isAuthorized={false}
        loginPath={LOGIN_PATH}
        component={() => <div>Layout</div>}
      />
    </Switch>
  </BrowserRouter>
)

export default App
