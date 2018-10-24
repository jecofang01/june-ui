// @flow
import get from 'lodash.get'

export default (themePropName: string | string[], defaultValue: string | number) => (props: {
  [key: string]: mixed,
}) => {
  const theme = get(props, 'theme', {})
  return get(theme, themePropName, defaultValue)
}
