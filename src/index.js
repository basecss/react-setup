/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Select from './components/Select'
import './index.less'

const Button = styled.button`
  background-color: #ff6600;
  color: #ffffff;
  font-size: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
  :hover {
    background-color: #ff5500;
  }
`

const container = document.querySelector('#container')
const options = [
  'React',
  'Vue',
  'Angular',
  'jQuery'
]

ReactDOM.render(
  <div>
    <Button primary>Styled Components</Button>
    <Select items={ options } />
  </div>,
  container
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
