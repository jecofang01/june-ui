import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AuthorizedRoute from './components/router'
import { LOGIN_PATH } from './constants'
import AdminLayout from './layout/admin'

import SignIn from './pages/signin'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={LOGIN_PATH} component={SignIn} />
      <AuthorizedRoute isAuthorized loginPath={LOGIN_PATH} component={AdminLayout} />
    </Switch>
  </BrowserRouter>
)

export default App
