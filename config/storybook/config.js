/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/react'
/* eslint-enable */
import './options'

const packages = require.context('../../packages', true, /\.stories\.js$/)

const loadStories = () => {
  packages.keys().forEach(filename => packages(filename))
}

configure(loadStories, module)
