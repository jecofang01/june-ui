export const drawerWidth = 260

export default theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%'
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appTitle: {
    flexGrow: 1
  },
  section: {
    display: 'flex'
  },
  homeIcon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuIcon: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex'
    }
  },
  notification: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  langPicker: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& span': {
      color: theme.palette.primary.contrastText
    }
  },
  toolbar: theme.mixins.toolbar
})
