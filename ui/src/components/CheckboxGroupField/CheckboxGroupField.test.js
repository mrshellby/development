// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { act } from '@testing-library/react'
import { mount } from 'enzyme/build'
import { Formik, useFormikContext } from 'formik'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import CheckboxGroupField from './CheckboxGroupField'

const options = [
  { value: '41', label: '41', count: 1 },
  { value: '42', label: '42', count: 2 },
  { value: '43', label: '43', count: 3 },
]

const createForm = (onChange = () => {}, onSubmit = () => {}) => {
  return mount(
    <ThemeProvider theme={theme}>
      <Formik initialValues={{ theNumber: ['42'] }} onSubmit={onSubmit}>
        {({ values }) => (
          <CheckboxGroupField
            name="theNumber"
            options={options}
            onChange={onChange}
            value={values.theNumber}
          />
        )}
      </Formik>
    </ThemeProvider>,
  )
}

describe('CheckboxGroupField', () => {
  it('displays the labels together with the count', () => {
    const wrapper = createForm()

    options.forEach((option, i) => {
      expect(wrapper.find(`label[htmlFor="theNumber.${i}"]`).text()).toEqual(
        `${option.label}(${option.count})`,
      )
    })
  })

  it('unchecks values not included in initialValue', () => {
    const wrapper = createForm()
    const firstInput = wrapper.find(`input[value="41"]`)

    expect(firstInput.getDOMNode().checked).toEqual(false)
  })

  it('checks values included in initialValue', () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => jest.fn())

    const wrapper = createForm()
    const secondInput = wrapper.find(`input[value="42"]`)

    expect(secondInput.getDOMNode().checked).toEqual(true)
  })

  it('triggers onChange when a checkbox is changed', () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => jest.fn())

    return new Promise((resolve) => {
      const onChange = jest.fn()
      const wrapper = createForm(onChange)

      const firstInput = wrapper.find(`input[value="41"]`)
      act(() => {
        firstInput.simulate('change', { target: { checked: true } })
      })

      setTimeout(() => {
        expect(onChange).toHaveBeenCalled()
        resolve()
      }, 1)
    })
  })

  it('returns the correct value when checked', () => {
    let formikValues = null

    const TransferValues = () => {
      const { values, submitForm } = useFormikContext()
      React.useEffect(() => {
        formikValues = values
      }, [values, submitForm])
      return null
    }

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Formik initialValues={{ theNumber: ['42'] }}>
          {({ values }) => (
            <>
              <CheckboxGroupField
                name="theNumber"
                options={options}
                onChange={() => {}}
                value={values.theNumber}
              />
              <TransferValues />
            </>
          )}
        </Formik>
      </ThemeProvider>,
    )

    const firstInput = wrapper.find('input[value="41"]')
    firstInput.simulate('change', { target: { checked: true } })

    expect(formikValues).toEqual({ theNumber: ['41', '42'] })
  })
})
