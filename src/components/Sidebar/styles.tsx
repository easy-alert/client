import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (max-width: 900px) {
    min-width: 280px;
  }
`;

export const Navbar = styled.header`
  background-color: ${theme.color.primary};
  min-width: fit-content;
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-height: 62px;

  > img {
    height: 30px;
    width: 130px;
    margin: 0 ${theme.size.sm};
  }
`;

export const WebContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavbarButtonWeb = styled.header<{ selected: boolean }>`
  padding: ${theme.size.md} ${theme.size.sm};

  color: ${theme.color.white};
  font-weight: 500;

  transition: 0.25s;

  ${({ selected }) =>
    selected &&
    css`
      background: #f1a7a726;
    `}

  :hover {
    background: #f1a7a726;
  }
`;

export const HamburguerWrapper = styled.div`
  display: none;
  z-index: 10;

  @media (max-width: 900px) {
    position: relative;
    display: block;
    margin: 0 ${theme.size.sm};
  }
`;

export const NavbarButtonMobile = styled.header<{ selected: boolean }>`
  padding: ${theme.size.sm};

  color: ${theme.color.black};
  font-weight: 500;
  transition: 0.25s;

  ${({ selected }) =>
    selected &&
    css`
      background: #f1a7a726;
    `}

  :hover {
    background: #f1a7a726;
  }
`;

export const MobileContent = styled.div`
  position: absolute;
  left: 0;
  top: 47px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 6px 6px;
  background-color: ${theme.color.white};
`;

export const AppContent = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow: auto;
  max-width: 1920px;
  padding: ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;
