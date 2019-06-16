/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Select from '../../src/components/Select'

describe('Select test suite', () => {
  it('render all the options', () => {
    const options = ['A', 'B', 'C', 'D']
    const selectWrapper = render(<Select items={options} />)

    expect(selectWrapper.find('.select')).toBeDefined()
    expect(selectWrapper.find('.select-item')).toHaveLength(options.length)
  })

  it('render no options', () => {
    const options = []
    const selectWrapper = shallow(<Select items={options} />)

    expect(selectWrapper.find('.select-empty').exists()).toBe(true)
  })

  it('render a single option', () => {
    const options = ['React']
    const selectWrapper = mount(<Select items={options} />)

    expect(selectWrapper.contains(<li className='select-item'>React</li>)).toBeTruthy()
  })

  it('render correct text', () => {
    const options = ['React', 'Vue', 'Angular', 'Svelte']
    const selectWrapper = mount(<Select items={options} />)

    expect(selectWrapper.find('.select-item').get(0).props.children).toEqual('React')
  })

  it('render snapshot', () => {
    const options = ['React', 'Redux']
    const renderTree = renderer
      .create(<Select items={options} />)
      .toJSON()

      expect(renderTree).toMatchSnapshot()
  })

})


