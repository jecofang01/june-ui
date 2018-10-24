const path = require('path')

const root = path.join.bind(path, path.resolve(__dirname, '../..'))

/* eslint-disable no-unused-vars */
module.exports = (storybookBaseConfig, configType) => {
  /* eslint-enable */
  storybookBaseConfig.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [root('packages')],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }
  )

  return storybookBaseConfig
}
