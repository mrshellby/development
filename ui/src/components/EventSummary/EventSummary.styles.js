// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import Card from '../Card/Card'
import mq from '../../theme/mediaQueries'
import EventBackground from './EventBackground.svg'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  ${mq.mdUp`
    height: 135px;
    flex-direction: row;
  `}
`

StyledCard.Title = styled.div`
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  color: ${(p) => p.theme.colorText};
`

StyledCard.DateTime = styled.div`
  position: relative;
  white-space: nowrap;
  color: ${(p) => p.theme.tokens.colorPaletteGray700};
  margin: ${(p) => p.theme.tokens.spacing06};

  ${mq.mdUp`
    width: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(p) => p.theme.colorText};
    margin: ${(p) => `${p.theme.tokens.spacing06} ${p.theme.tokens.spacing07}`};
  `}
  ${mq.smDown`
    margin-bottom: ${(p) => p.theme.tokens.spacing05};
  `}
`

StyledCard.DateTime.DayOfWeek = styled.span`
  ${mq.mdUp`
    font-size: ${(p) => p.theme.tokens.fontSizeSmall};
    margin-bottom: ${(p) => p.theme.tokens.spacing04};
  `}
  ${mq.smDown`
    text-transform: capitalize;
  `}
`

StyledCard.DateTime.Day = styled.span`
  ${mq.mdUp`
    font-size: 2.5rem;
    margin-bottom: ${(p) => p.theme.tokens.spacing04};
  `}
`

StyledCard.DateTime.Month = styled.span``

StyledCard.Body = styled.div`
  margin: ${(p) => p.theme.tokens.spacing01} ${(p) => p.theme.tokens.spacing06};

  ${mq.mdUp`
    margin: ${(p) => p.theme.tokens.spacing06};
    flex-grow: 1;
  `}
`

StyledCard.LinkContainer = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin: ${(p) => p.theme.tokens.spacing06};
`

StyledCard.Details = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(p) => p.theme.tokens.spacing06};
  color: ${(p) => p.theme.tokens.colorPaletteGray600};
`

StyledCard.Details.Item = styled.small`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  svg {
    margin-right: ${(p) => p.theme.tokens.spacing02};
  }
`

StyledCard.EventBackground = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  background-image: url(${EventBackground});
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 141px;
  height: 100%;
  ${mq.mdDown`
    display: none;
  `}
`

export const StyledLink = styled.a`
  text-decoration: none;
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  margin-right: ${(p) => p.theme.tokens.spacing03};
`
