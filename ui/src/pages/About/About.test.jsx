// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import About from './About'
import { StyledPageTitle } from './About.styles'

test('contains the page title', () => {
  const wrapper = shallow(<About />)
  expect(wrapper.find(StyledPageTitle).exists()).toBe(true)
})
