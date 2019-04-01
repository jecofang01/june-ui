import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'

import TextField from '../../components/mui-adapter/textField'
import { required } from '../../utils/validation'

const SignInForm = ({ handleSubmit, className, submitClassName, t }) => (
  <form onSubmit={handleSubmit} className={className} noValidate>
    <Field
      component={TextField}
      margin="normal"
      required
      fullWidth
      id="email"
      label={t('email')}
      name="email"
      autoComplete="email"
      autoFocus
      validate={[required]}
      t={t}
    />
    <Field
      component={TextField}
      margin="normal"
      required
      fullWidth
      name="password"
      label={t('password')}
      type="password"
      id="password"
      autoComplete="current-password"
      validate={[required]}
      t={t}
    />
    <Button type="submit" fullWidth variant="contained" color="primary" className={submitClassName}>
      {t('sign in')}
    </Button>
  </form>
)

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  submitClassName: PropTypes.string.isRequired
}

export default reduxForm({ form: 'signIn' })(SignInForm)
