import React from 'react'
import { object } from 'prop-types'

import { Field } from '../Form/Form'
import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  width: 138px;
`

const Input = styled(Field)`
  flex-grow: 1;
  border-right: 0;
`

const Pct = styled.div`
  min-width: 3rem;
  height: 48px;
  line-height: 45px;
  text-align: center;
  border: 1px solid ${(p) => p.theme.tokens.colors.colorBorderInput};
  border-left: none;
  background-color: ${(p) => p.theme.tokens.colors.colorPaletteGray200};
`

const PercentageInput = ({ field, form, meta, ...inputProps }) => {
  return (
    <Box>
      <Input {...field} {...inputProps} />
      <Pct>%</Pct>
    </Box>
  )
}

PercentageInput.propTypes = {
  // Formik props: https://jaredpalmer.com/formik/docs/api/field
  field: object,
  form: object,
  meta: object,
}
PercentageInput.defaultProps = {}

export default PercentageInput
