import styled from 'styled-components'
import {Field} from 'formik'

export const StyledFieldset = styled.fieldset`
  border: 0 none;
  margin-bottom: 40px;
`

export const StyledLegend = styled.legend`
  font-size: 20px;
  font-weight: 700;
  color: #517FFF;
  margin-bottom: 16px;
`

export const StyledLabel = styled.label`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
  color: #2D3240;
  font-weight: 600;
  display: inline-block;
`

export const StyledField = styled(Field)`
  width: 100%;
  height: calc(1.5rem + 2px);
  padding: 9px 16px 11px 16px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 20px;
  height: 40px;
  border-sizing: border-box;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 3px;
  transition: border-color .15s ease-in-out,
              box-shadow .15s ease-in-out;
`

export const StyledFormGroupColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (min-width: 688px) {
    & > div + div {
      padding-left: 25px;
    }
  }
`

export const StyledFormGroupColumn = styled.div`
  flex: 1 1 310px;
`

export const StyledFormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    flex: 0 1 auto;
    order: 1;
    width: initial;
    margin-right: 12px;
  }

  label {
    flex: 1;
    order: 2;
    margin-bottom: 0;
  }
`

export const StyledSubmitButton = styled.button`
  background-color: #517FFF;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  padding: 9px 20px 11px 20px;
  border: 0 none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
`

