import React, { forwardRef } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'

export const Link = props => <MuiLink {...props} component={RouteLink} />

// eslint-disable-next-line react/display-name
export const RefLink = forwardRef((props, ref) => <RouteLink to="/" {...props} innerRef={ref} />)
