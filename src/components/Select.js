/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types'

import SelectOption from './SelectOption'

function Select (props) {
  const { items } = props

  if (!items.length) {
    return <h2 className='select-empty'>No items.</h2>
  }

  return (
    <ul className="select">
      {items.map(item => (
        <SelectOption key={ item } value={ item } />
      ))}
    </ul>
  )
}

Select.propTypes = {
  items: PropTypes.array
}

Select.defaultProps = {
  items: []
}

export default Select
