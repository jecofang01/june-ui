/* eslint-disable import/no-extraneous-dependencies */
const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
/* eslint-enable */

configure({ adapter: new Adapter() })
