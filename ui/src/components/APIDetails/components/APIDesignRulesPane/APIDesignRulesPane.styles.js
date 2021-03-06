// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Collapsible } from '@commonground/design-system'

import External from '../../../Icons/External'
import { ReactComponent as ExclamationMark } from '../../../Icons/exclamationmark.svg'
import { IconList } from '../../APIDetails.styles'

export const IntroSection = styled.div``

export const StyledLink = styled.a``

export const ExternalIcon = styled(External)`
  margin-left: ${(p) => p.theme.tokens.spacing03};
`

export const StyledIconListItem = styled(IconList.ListItem)`
  margin-top: ${(p) => p.theme.tokens.spacing07};
`

export const DesignRuleTitle = styled.div`
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
`

export const DesignRuleDescription = styled.div`
  margin: ${(p) => p.theme.tokens.spacing03} 0px;
`

export const DesignRuleLinkContainer = styled.div`
  display: inline-flex;
  align-items: center;
`

export const CollapsibleContainer = styled.div`
  border: solid ${(p) => p.theme.tokens.colorPaletteGray400};
  border-width: 1px 0px;
  padding: ${(p) => p.theme.tokens.spacing04} 0px;
  margin-top: ${(p) => p.theme.tokens.spacing06};
`

export const ErrorsCollapsible = styled(Collapsible)``

export const StyledErrorsTitle = styled.div`
  display: flex;
  align-items: center;
`

export const StyledExclamationMark = styled(ExclamationMark)`
  margin-right: ${(p) => p.theme.tokens.spacing03};
`

export const ErrorList = styled.ul`
  margin-top: ${(p) => p.theme.tokens.spacing05};
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  padding-left: ${(p) => p.theme.tokens.spacing06};
`

export const Error = styled.li`
  list-style-type: none;
  color: ${(p) => p.theme.colorAlertError};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};

  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.tokens.spacing03};
  }
`
