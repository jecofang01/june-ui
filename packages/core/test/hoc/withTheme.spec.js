import React from 'react'
import TestRenderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { ThemeProvider } from 'styled-components'
import withTheme from '../../src/hoc/withTheme'

describe('withTheme', () => {
  describe('render', () => {
    it('should not throw an error when defaultProps is defined', () => {
      const Component = () => <div>Wrapped Component</div>
      Component.defaultProps = {
        theme: {},
      }

      const WrappedComponent = withTheme()(Component)
      TestRenderer.create(<WrappedComponent />)
    })

    it('should not throw an error when defaultProps is not defined', () => {
      expect(() => {
        const Component = () => <div>Wrapped Component</div>
        const WrappedComponent = withTheme()(Component)
        TestRenderer.create(<WrappedComponent />)
      }).not.toThrow()
    })
  })

  describe('respect value sequence: props => context => mapper => default', () => {
    it('should respect the mapped value when default theme and mapper are provided', () => {
      const Component = () => <div>Wrapped Component</div>
      Component.defaultProps = {
        theme: {
          color: 'red',
        },
      }
      const WrappedComponent = withTheme(theme => ({
        ...theme,
        color: 'green',
      }))(Component)
      const wrapper = mount(<WrappedComponent />)
      const props = wrapper.find(Component).props()
      expect(props).toHaveProperty('theme.color', 'green')
    })

    it('should respect the context value when default value, mapper value and context value are provided', () => {
      const Component = () => <div>Wrapped Component</div>
      Component.defaultProps = {
        theme: {
          color: 'red',
        },
      }
      const WrappedComponent = withTheme(theme => ({
        ...theme,
        color: 'green',
      }))(Component)
      const wrapper = mount(
        <ThemeProvider theme={{ color: 'blue' }}>
          <WrappedComponent />
        </ThemeProvider>
      )
      const props = wrapper.find(Component).props()
      expect(props).toHaveProperty('theme.color', 'blue')
    })

    it('should respect the props value when default value, mapper value, context value and props value are provided', () => {
      const Component = () => <div>Wrapped Component</div>
      Component.defaultProps = {
        theme: {
          color: 'red',
        },
      }
      const WrappedComponent = withTheme(theme => ({
        ...theme,
        color: 'green',
      }))(Component)
      const wrapper = mount(
        <ThemeProvider theme={{ color: 'blue' }}>
          <WrappedComponent theme={{ color: 'purple' }} />
        </ThemeProvider>
      )
      const props = wrapper.find(Component).props()
      expect(props).toHaveProperty('theme.color', 'purple')
    })
  })

  describe('merge recursively', () => {
    it('should merge recursively among all provided values', () => {
      const Component = () => <div>Wrapped Component</div>
      Component.defaultProps = {
        theme: {
          colors: {
            primary: 'blue',
          },
        },
      }
      const WrappedComponent = withTheme(theme => ({
        ...theme,
        colors: { secondary: 'gray' },
      }))(Component)
      const wrapper = mount(
        <ThemeProvider theme={{ colors: { info: 'green' } }}>
          <WrappedComponent theme={{ colors: { warning: 'yellow' } }} />
        </ThemeProvider>
      )
      const props = wrapper.find(Component).props()
      expect(props).toHaveProperty('theme.colors.primary', 'blue')
      expect(props).toHaveProperty('theme.colors.secondary', 'gray')
      expect(props).toHaveProperty('theme.colors.info', 'green')
      expect(props).toHaveProperty('theme.colors.warning', 'yellow')
    })
  })
})
