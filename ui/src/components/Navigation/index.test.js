import React from 'react'
import {shallow} from 'enzyme/build'
import Navigation from './index'

describe('the navigation', () => {
    let navigation

    beforeAll(() => {
        const wrapper = shallow(<Navigation/>)
        navigation = wrapper.find('ul')
    })

    it('should contain a link to the Homepage', () => {
        const homeLink = navigation.childAt(0).find('Link')
        expect(homeLink.props().children).toBe('Home')
        expect(homeLink.props().to).toBe('/')
    })

    it('should contain a link to the Overview page', () => {
        const homeLink = navigation.childAt(1).find('Link')
        expect(homeLink.props().children).toBe('Overview')
        expect(homeLink.props().to).toBe('/overview')
    })

    it('should contain a link to the Submit API page', () => {
        const homeLink = navigation.childAt(2).find('Link')
        expect(homeLink.props().children).toBe('Submit your API')
        expect(homeLink.props().to).toBe('/submit-api')
    })

    it('should contain a link to the About page', () => {
        const homeLink = navigation.childAt(3).find('Link')
        expect(homeLink.props().children).toBe('About')
        expect(homeLink.props().to).toBe('/about')
    })
})