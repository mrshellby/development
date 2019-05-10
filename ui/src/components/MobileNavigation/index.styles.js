import styled from 'styled-components'
import { IconButton } from '@commonground/design-system'
import { NavLink } from 'react-router-dom'

export const NavButton = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: white;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 1px 8px rgba(0, 0, 0, 0.04);
`

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  transform: ${(p) => (p.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.35s ease;
  padding: 24px 0;
`

export const Menu = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
`

export const Link = styled(NavLink)`
  display: block;
  color: ${p => p.theme.color.text.normal};
  text-decoration: none;
  font-weight: ${p => p.theme.font.weight.semibold};
  padding: 12px 24px;

  &.active {
    position: relative;
    color: ${p => p.theme.color.primary.normal};

    &:before {
      content: '';
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 0;
      width: 2px;
      background-color: ${p => p.theme.color.primary.normal};
    }
  }
`

export const Divider = styled.hr`
  margin: 8px;
  border: none;
  border-bottom: 1px solid #f0f2f7;
`
