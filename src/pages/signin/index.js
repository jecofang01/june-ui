import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { useTranslation } from 'react-i18next'

import LangPicker from '../../components/langpicker'
import SignInForm from './form'
import styles from './styles'

const SignIn = ({ classes: { main, image, paper, icon, form, submit, langPicker } }) => {
  const { t } = useTranslation()
  return (
    <Grid container className={main}>
      <Grid item xs={false} sm={4} md={7} className={image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <LangPicker className={langPicker} />
        <div className={paper}>
          <Avatar className={icon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign in')}
          </Typography>
          <SignInForm
            t={t}
            className={form}
            submitClassName={submit}
            onSubmit={values => {
              console.log(values)
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}

SignIn.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
    image: PropTypes.string,
    paper: PropTypes.string,
    icon: PropTypes.string,
    form: PropTypes.string,
    submit: PropTypes.string,
    langPicker: PropTypes.string
  }).isRequired
}

export default withStyles(styles)(SignIn)
