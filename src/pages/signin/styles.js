export default theme => ({
  main: {
    height: '100vh'
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${theme.loginBg || 'https://source.unsplash.com/random'})`
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  langPicker: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
})
