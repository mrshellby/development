import styled from 'styled-components'
import APIFilters from '../../components/APIFilters'

export const StyledOverviewPage = styled.div`
  display: flex;
  max-width: 1240px;
  margin: 0 40px;
  flex-wrap: wrap;
`

export const StyledAPIFilters = styled(APIFilters)`
  flex: 0 0 250px;
  margin-top: 44px;
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-left: 40px;
`

export const StyledH1 = styled.h1`
  flex: 0 0 100%;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
`
