import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import styled from '@material-ui/core/styles/styled'

export const MainContainter = styled(Grid)({
  height: '100vh'
})

export const Left = styled(Grid)(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `url(${theme.loginBg || 'https://source.unsplash.com/random'}`
}))

export const RightInner = styled('div')(({ theme }) => ({
  margin: theme.spacing(8, 4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}))

export const IconWrapper = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main
}))

export const Form = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1)
}))

export const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}))
