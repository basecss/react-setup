/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom'

import './index.less'

function App () {
  return (
    <h1><img src='/static/images/react.png' width='74' height='74' />Hello React.</h1>
  )
}

const container = document.querySelector('#container')
ReactDOM.render(
  <App />,
  container
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
