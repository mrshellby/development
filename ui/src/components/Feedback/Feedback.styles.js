// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import { Container } from '../design-system-candidates/Grid'
import { ReactComponent as GitlabIcon } from '../Icons/gitlab-black-icon.svg'
import ExternalIcon from '../Icons/External'

export const FeedbackArea = styled.div`
  background-color: ${(p) => p.theme.tokens.colorBackground};
`

export const FeedbackContainer = styled(Container)`
  padding-top: ${(p) => p.theme.tokens.spacing09};
  padding-bottom: ${(p) => p.theme.tokens.spacing09};

  ${mq.smUp`
    padding-top: ${(p) => p.theme.tokens.spacing11};
    padding-bottom: ${(p) => p.theme.tokens.spacing11};
  `}
`

export const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.tokens.spacing05};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
`

export const StyledText = styled.p`
  margin-top: 15px;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
`

export const StyledGitlabIcon = styled(GitlabIcon)`
  height: 1rem;
  margin-right: ${(p) => p.theme.tokens.spacing06};
`

export const StyledExternalIcon = styled(ExternalIcon)`
  height: 1rem;
  margin-left: ${(p) => p.theme.tokens.spacing06};
`
