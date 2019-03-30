import React, { Component, Fragment, Suspense } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withTranslation } from 'react-i18next'

class LangPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchor: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeLang = this.handleChangeLang.bind(this)
  }

  handleClick(event) {
    this.setState({
      anchor: event.target
    })
  }

  handleClose() {
    this.setState({
      anchor: null
    })
  }

  handleChangeLang(lang) {
    const { i18n } = this.props // eslint-disable-line
    this.setState({
      anchor: null
    })
    i18n.changeLanguage(lang)
  }

  render() {
    const { anchor } = this.state
    const { t } = this.props // eslint-disable-line

    return (
      <Fragment>
        <Button
          aria-owns={anchor ? 'june-ui-lang-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {t('currentLang')}
        </Button>
        <Menu
          id="june-ui-lang-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.handleChangeLang('zh')}>中文</MenuItem>
          <MenuItem onClick={() => this.handleChangeLang('en')}>English</MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

const Enhanced = withTranslation()(LangPicker)

const Wrapped = () => (
  <Suspense fallback={<CircularProgress />}>
    <Enhanced />
  </Suspense>
)

export default Wrapped
