import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const AuthorizedRoute = ({ isAuthorized, loginPath, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthorized ? <Component {...props} /> : <Redirect to={loginPath} />)}
  />
)

AuthorizedRoute.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  loginPath: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.node.isRequired, PropTypes.element, PropTypes.func])
    .isRequired
}

export default AuthorizedRoute
