/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom'

import Select from './components/Select'
import './index.less'

const container = document.querySelector('#container')
const options = [
  'React',
  'Vue',
  'Angular',
  'jQuery'
]

ReactDOM.render(
  <Select items={ options } />,
  container
)
