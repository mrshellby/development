// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledErrorMessage = styled.span`
  color: ${(p) => {
    switch (p.level) {
      case 'warning':
        return p.theme.colorAlertWarning
      case 'error':
      default:
        return p.theme.colorAlertError
    }
  }};
`

const ErrorMessage = (props) =>
  props.children ? <StyledErrorMessage {...props} /> : null

ErrorMessage.propTypes = {
  children: PropTypes.string,
  level: PropTypes.oneOf(['error', 'warning']),
}

ErrorMessage.defaultProps = {
  level: 'error',
}

export default ErrorMessage
