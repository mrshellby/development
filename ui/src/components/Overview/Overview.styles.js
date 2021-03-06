// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Button } from '@commonground/design-system'
import mq from '../../theme/mediaQueries'

import AddIcon from '../../components/Icons/AddIcon'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(p) => p.theme.tokens.spacing05};
  padding-right: ${(p) => p.theme.tokens.spacing05};

  ${mq.smDown`
    width: 100%;
  `}
`

export const StyledAddLinkMobile = styled(Button)`
  ${mq.mdUp`
    display: none;
  `}
`

export const StyledAddIcon = styled(AddIcon)`
  height: 20px;
  width: 20px;
  margin-right: ${(p) => p.theme.tokens.spacing01};
`
