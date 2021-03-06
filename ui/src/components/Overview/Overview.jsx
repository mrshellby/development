// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import theme from '../../theme'
import { DONSmall } from '../CustomDON'
import {
  StyledHeader,
  StyledAddLinkMobile,
  StyledAddIcon,
} from './Overview.styles'

export const ResultsHeader = ({
  totalResults,
  objectName,
  objectNamePlural,
  addLinkTarget,
}) => (
  <StyledHeader>
    {totalResults ? (
      <DONSmall data-test="total">
        {totalResults} {totalResults > 1 ? objectNamePlural : objectName}
      </DONSmall>
    ) : null}
    <StyledAddLinkMobile as={Link} to={addLinkTarget} variant="link">
      <StyledAddIcon color={theme.colorTextLink} />
      {objectName} toevoegen
    </StyledAddLinkMobile>
  </StyledHeader>
)

ResultsHeader.propTypes = {
  totalResults: PropTypes.number,
  objectName: PropTypes.string.isRequired,
  objectNamePlural: PropTypes.string.isRequired,
  addLinkTarget: PropTypes.string.isRequired,
}
