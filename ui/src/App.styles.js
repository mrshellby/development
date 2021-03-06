// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from './theme/mediaQueries'

export const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

export const ContentWrap = styled.div`
  padding-bottom: ${(p) => p.theme.footerHeight};

  ${mq.xs`
    padding-bottom: ${(p) => p.theme.footerHeightMobile};
  `}
`
