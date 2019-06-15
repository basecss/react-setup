/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'

function SelectOption (props) {
  const { value } = props

  return <li className="select-item">{ value }</li>
}

SelectOption.propTypes = {
  value: PropTypes.string
}

SelectOption.defaultProps = {
  value: ''
}

export default SelectOption
