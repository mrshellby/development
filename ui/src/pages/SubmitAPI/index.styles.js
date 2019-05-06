import styled from 'styled-components'

export const StyledSubmitAPI = styled.div`
  max-width: 900px;
  margin: 0 auto;

  p {
    font-size: 14px;
    color: #676D80;
  }

  & > p {
    text-align: center;
  }
`

export const StyledPageTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
`

export const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  & > a {
    flex: 0 0 auto;
    padding: 8px 10px;
    line-height: 24px;
    font-size: 14px;
    text-decoration: none;
    color: #A3AABF;

    &.active {
      border-bottom: 1px solid #517FFF;
      color: #517FFF;
      padding-bottom: 7px;
    }
  }
`

