// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const StyledListItem = styled.li`
  margin: ${(p) => `0 0 ${p.theme.tokens.spacing04} 0`};
`
