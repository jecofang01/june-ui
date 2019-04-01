import React from 'react'
import TextField from '@material-ui/core/TextField'
import isObject from 'lodash.isobject'
import isString from 'lodash.isstring'

/* eslint-disable react/prop-types */
const AdaptedTextField = ({ label, input, meta: { touched, invalid, error }, t, ...rest }) => {
  /* eslint-enable */
  let errorMessage = ''
  if (isObject(error)) {
    const { key, ...custom } = error
    errorMessage = t(key, { ...custom })
  } else if (isString(error)) {
    errorMessage = t(error)
  }
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && errorMessage}
      {...input}
      {...rest}
    />
  )
}

export default AdaptedTextField
