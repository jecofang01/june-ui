module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          "browsers": ["last 3 versions"]
        },
      },
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
  plugins: [
    "styled-components",
    "transform-flow-strip-types",
  ],
}