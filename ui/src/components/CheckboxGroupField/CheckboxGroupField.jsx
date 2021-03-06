// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, arrayOf, shape, func, bool, number } from 'prop-types'
import { FieldArray } from 'formik'
import { CheckboxField } from '../Form/Form'
import { DONSmall } from '../CustomDON'
import { StyledCheckboxGroupField } from './CheckboxGroupField.styles'

const CheckboxGroupField = ({ name, options, value, onChange }) => (
  <FieldArray name={name}>
    {(arrayHelpers) => (
      <>
        {options.map((option, index) => (
          <StyledCheckboxGroupField key={index}>
            <CheckboxField
              type="checkbox"
              id={`${name}.${index}`}
              name={`${name}.${index}`}
              value={option.value}
              checked={value.indexOf(option.value) !== -1}
              disabled={option.disabled}
              onChange={() => {
                value.indexOf(option.value) === -1
                  ? arrayHelpers.insert(index, option.value)
                  : arrayHelpers.remove(value.indexOf(option.value))
                onChange && setTimeout(() => onChange(), 0)
              }}
            />
            <label key={index} htmlFor={`${name}.${index}`}>
              {option.label}
              <DONSmall className="count axe-ignore">({option.count})</DONSmall>
            </label>
          </StyledCheckboxGroupField>
        ))}
      </>
    )}
  </FieldArray>
)

CheckboxGroupField.propTypes = {
  name: string.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      count: number.isRequired,
      label: string.isRequired,
      disabled: bool,
    }),
  ),
  onChange: func.isRequired,
  value: arrayOf(string.isRequired).isRequired,
}

CheckboxGroupField.defaultProps = {
  onChange: null,
}

export default CheckboxGroupField
