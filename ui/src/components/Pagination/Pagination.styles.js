// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import arrowDownSolidIcon from '../Icons/arrow-down-solid-icon.svg'

export const StyledPagination = styled.div`
  margin-top: ${(p) => p.theme.tokens.spacing10};
  display: flex;
  ${mq.xs`
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    margin-top: 2rem;
  `}
`

export const StyledPages = styled.div`
  display: flex;
  align-items: center;
  min-height: ${(p) => p.theme.tokens.spacing08};
`

export const StyledPageButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: ${(p) => p.theme.tokens.spacing01};
  border: none;
  color: ${(p) => (p.current ? p.theme.colorTextInverse : p.theme.colorText)};
  background-color: ${(p) =>
    p.current ? p.theme.tokens.colorBrand3 : p.theme.tokens.colorBrand2};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  cursor: ${(p) => (p.current ? 'default' : 'pointer')};
  user-select: none;

  &:hover {
    filter: brightness(90%);
  }

  ${mq.xs`
    width: 48px;
    height: 48px;
  `}
`

export const StyledArrowButton = styled(StyledPageButton)`
  &:disabled {
    color: ${(p) => p.theme.tokens.colorPaletteGray500};
    background-color: ${(p) => p.theme.tokens.colorPaletteGray200};
    filter: brightness(100%);
    cursor: default;
  }

  ${mq.xs`
    display: inline-block};
    margin-right: ${(p) => p.theme.tokens.spacing02};
  `}

  ${mq.smUp`
    margin-right: ${(p) => p.theme.tokens.spacing01};
  `}
`

export const StyledDottedButton = styled.div`
  align-items: center;
  background-color: transparent;
  border: none;
  display: inline-flex;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  height: 40px;
  justify-content: center;
  margin-right: ${(p) => p.theme.tokens.spacing01};
  text-align: center;
  user-select: none;
  width: 40px;
`

export const StyledPageCount = styled.span`
  margin-left: ${(p) => p.theme.tokens.spacing03};
  ${mq.mdDown`
    display: none;
  `}
`

export const SelectFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  position: relative;
  bottom: ${(p) => p.theme.tokens.spacing07};
  margin-top: ${(p) => p.theme.tokens.spacing08};
  ${mq.xs`
    margin-left: unset;
    max-width: 214px;
  `}
`

export const SelectField = styled.select`
  -webkit-appearance: none;
  appearance: none;
  height: 48px;
  border-radius: 0;
  background: url(${arrowDownSolidIcon}) right center no-repeat;
  background-color: ${(p) => p.theme.tokens.colorBackground};
  margin-top: ${(p) => p.theme.tokens.spacing03};
  padding: 0 ${(p) => p.theme.tokens.spacing04};
  background-origin: content-box;
`
