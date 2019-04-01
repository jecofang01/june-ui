import React from 'react'
import { isValidElementType } from 'react-is'
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
  // eslint-disable-next-line react/require-default-props
  component: (props, propName) => {
    if (props[propName] === null) {
      throw new Error()
    }
    if (!isValidElementType(props[propName])) {
      throw new Error(
        "Invalid prop 'component' supplied to 'AuthorizedRoute': the prop is not a valid React component"
      )
    }
  }
}

export default AuthorizedRoute
