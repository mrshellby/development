import styled from 'styled-components'
import { Button } from '@commonground/design-system'
import Search from '../../components/design-system-candidates/Search'

import mq from '../../theme/mediaQueries'

import APIFilters from '../../components/APIFilters/APIFilters'
import addIcon from '../../components/Icons/add_icon.svg'

export const StyledOverviewPage = styled.div`
  display: flex;
  max-width: ${(p) => p.theme.containerWidth};
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.containerPadding};
  flex-wrap: wrap;
`

export const StyledOverviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const StyledSubtitle = styled.p`
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
`

export const StyledSearch = styled(Search)`
  max-width: 495px;
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
`

export const StyledIconButton = styled(Button)`
  align-self: flex-start;

  &:before {
    height: 16px;
    margin-right: ${(p) => p.theme.tokens.spacing04};
    content: url(${addIcon});
  }
`

export const StyledAPIListContainer = styled.div`
  display: flex;
  width: 100%;

  ${mq.smDown`
    flex-direction: column;
  `}
`

export const StyledAPIFilters = styled(APIFilters)`
  flex: 0 0 250px;
  margin-top: ${(p) => p.theme.tokens.spacing08};
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-left: ${(p) => p.theme.tokens.spacing10};
  margin-bottom: ${(p) => p.theme.tokens.spacing12};

  ${mq.smDown`
    margin-left: 0;
  `}
`