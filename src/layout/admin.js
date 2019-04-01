import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import classnames from 'classnames'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'

import LangPicker from '../components/langpicker'
import { RefLink } from '../components/mui-adapter/link'
import ProfileButton from '../components/profile-button'
import styles from './styles'

const AdminLayout = ({
  classes: {
    root,
    appBar,
    appBarShift,
    appTitle,
    section,
    notification,
    langPicker,
    menuIcon,
    homeIcon,
    toolbar,
    drawer,
    drawerPaper
  },
  theme
}) => {
  const { t } = useTranslation()
  const [isDrawerOpen, setDrawerOpen] = useState(true)

  const handleResize = () => {
    if (window.innerWidth >= theme.breakpoints.values.md) {
      setDrawerOpen(true)
    } else {
      setDrawerOpen(false)
    }
  }

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  return (
    <div className={root}>
      <AppBar className={classnames(appBar, { [appBarShift]: isDrawerOpen })}>
        <ToolBar>
          <IconButton
            edge="start"
            color="inherit"
            title={t('toggle menu')}
            onClick={handleToggleDrawer}
            className={menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            component={RefLink}
            edge="start"
            color="inherit"
            title={t('home')}
            to="/"
            className={homeIcon}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" className={appTitle}>
            {t('appname')}
          </Typography>
          <div className={section}>
            <IconButton
              component={RefLink}
              color="inherit"
              to="/notifications"
              className={notification}
            >
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <LangPicker color="inherit" className={langPicker} />
            <ProfileButton edge="end" color="inherit" />
          </div>
        </ToolBar>
      </AppBar>
      <Drawer
        className={drawer}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        classes={{
          paper: drawerPaper
        }}
      >
        <div className={toolbar} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

AdminLayout.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired
}

export default withStyles(styles, { withTheme: true })(AdminLayout)
