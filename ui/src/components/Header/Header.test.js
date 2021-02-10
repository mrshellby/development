// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithProviders } from '../../test-helpers'
import Header from './Header'

describe('Header', () => {
  it('should exist', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.exists()).toBe(true)
  })

  it('should have a forum link', () => {
    renderWithProviders(
      <Router>
        <Header />
      </Router>,
    )
    expect(screen.getByRole('link', { name: /Forum/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Forum/ })).toHaveAttribute(
      'href',
      'https://forum.developer.overheid.nl',
    )
  })
})
import '@testing-library/jest-dom/extend-expect'
