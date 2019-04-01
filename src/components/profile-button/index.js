import React, { Fragment, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Lock from '@material-ui/icons/Lock'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import SignOff from '@material-ui/icons/PowerSettingsNew'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'

import { RefLink } from '../mui-adapter/link'
import styles from './styles'

const ProfileButton = ({
  username,
  avatar,
  className,
  menuClassName,
  menuItemClassName,
  profilePath,
  changePasswordPath,
  signOffPath,
  classes: { profile, divider },
  ...attrs
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const anchorEl = useRef(null)

  function handleToggle() {
    setOpen(!open)
  }

  function handleClose(event) {
    if (anchorEl.current && anchorEl.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <Fragment>
      <Tooltip title={t('View profile and more')}>
        <IconButton
          {...attrs}
          buttonRef={anchorEl}
          aria-owns={open ? 'june-ui-profile-menu' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={className}
        >
          <Avatar src={avatar} alt={t('profile')} className={profile}>
            {!avatar && <AccountCircle />}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id="june-ui-profile-menu">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList component="div" className={menuClassName}>
                  <MenuItem
                    component="p"
                    className={menuItemClassName}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {`${t('hello')}, `}
                    <strong>{username || t('visitor')}</strong>
                  </MenuItem>
                  <Divider className={divider} />
                  <MenuItem
                    component={RefLink}
                    onClick={handleClose}
                    to={profilePath}
                    className={menuItemClassName}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    {t('profile')}
                  </MenuItem>
                  <MenuItem
                    component={RefLink}
                    onClick={handleClose}
                    to={changePasswordPath}
                    className={menuItemClassName}
                  >
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    {t('change password')}
                  </MenuItem>
                  <Divider className={divider} />
                  <MenuItem
                    component={RefLink}
                    onClick={handleClose}
                    to={signOffPath}
                    className={menuItemClassName}
                  >
                    <ListItemIcon>
                      <SignOff />
                    </ListItemIcon>
                    {t('sign off')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}

ProfileButton.propTypes = {
  username: PropTypes.string,
  avatar: PropTypes.string,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  menuItemClassName: PropTypes.string,
  profilePath: PropTypes.string,
  changePasswordPath: PropTypes.string,
  signOffPath: PropTypes.string,
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired
}

ProfileButton.defaultProps = {
  username: null,
  avatar: null,
  className: null,
  menuClassName: null,
  menuItemClassName: null,
  profilePath: '/profile',
  changePasswordPath: '/change-password',
  signOffPath: '/logout'
}

export default withStyles(styles)(ProfileButton)
