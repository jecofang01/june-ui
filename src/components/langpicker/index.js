import React, { Fragment, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Language from '@material-ui/icons/Language'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Tooltip from '@material-ui/core/Tooltip'
import { useTranslation } from 'react-i18next'

const LangPicker = ({ className, menuClassName, menuItemClassName, langs, ...attrs }) => {
  const { t, i18n } = useTranslation()

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

  const handleChangeLang = lang => {
    setOpen(false)
    setTimeout(() => i18n.changeLanguage(lang), 0)
  }

  return (
    <Fragment>
      <Tooltip title={t('change language')}>
        <IconButton
          {...attrs}
          buttonRef={anchorEl}
          aria-owns={open ? 'june-ui-lang-menu' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={className}
        >
          <Language />
        </IconButton>
      </Tooltip>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id="june-ui-lang-menu">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className={menuClassName}>
                  {langs.map(({ lang, name }) => (
                    <MenuItem
                      key={lang}
                      onClick={() => handleChangeLang(lang)}
                      className={menuItemClassName}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}

LangPicker.propTypes = {
  langs: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string,
      name: PropTypes.string
    })
  ),
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  menuItemClassName: PropTypes.string
}

LangPicker.defaultProps = {
  className: null,
  menuClassName: null,
  menuItemClassName: null,
  langs: [{ lang: 'zh', name: '中文' }, { lang: 'en', name: 'English' }]
}

export default LangPicker
