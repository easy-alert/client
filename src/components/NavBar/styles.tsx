import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;

  @media (max-width: 960px) {
    min-width: 280px;
  }
`;

export const Navbar = styled.header`
  background-color: ${theme.color.white};
  min-width: fit-content;
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-height: 62px;
`;

export const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    max-height: 54px;
    max-width: 125px;
    margin: 0 ${theme.size.sm};
  }

  @media (max-width: 960px) {
    margin: 0 auto;
    > img {
      margin-left: 0;
      margin-right: 64px;
    }
  }
`;

export const WebContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const NavbarButtonWeb = styled.div<{ selected: boolean; showRedDot?: boolean }>`
  padding: ${theme.size.md} ${theme.size.sm};
  color: ${theme.color.black};
  font-weight: 500;

  transition: 0.25s;

  ${({ selected }) =>
    selected &&
    css`
      background: #edededcc;
    `}

  :hover {
    background: #edededcc;
  }

  > span {
    position: relative;

    ${({ showRedDot }) =>
      showRedDot &&
      css`
        ::before {
          content: '';
          background-color: ${theme.color.primary};
          border-radius: 50%;
          top: 0px;
          right: -8px;
          width: 8px;
          height: 8px;
          position: absolute;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
  }
`;

export const HamburguerWrapper = styled.div`
  display: none;
  z-index: 10;

  @media (max-width: 960px) {
    position: relative;
    display: block;
    margin: 0 ${theme.size.sm};
  }
`;

export const NavbarButtonMobile = styled.div<{ selected: boolean; showRedDot?: boolean }>`
  padding: ${theme.size.sm};
  color: ${theme.color.black};
  font-weight: 500;
  transition: 0.25s;

  ${({ selected }) =>
    selected &&
    css`
      background: #ededed80;
    `}

  :hover {
    background: #ededed80;
  }

  > span {
    position: relative;

    ${({ showRedDot }) =>
      showRedDot &&
      css`
        ::before {
          content: '';
          background-color: ${theme.color.primary};
          border-radius: 50%;
          top: 0px;
          right: -8px;
          width: 8px;
          height: 8px;
          position: absolute;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
  }
`;

export const MobileContent = styled.div`
  position: absolute;
  left: 0px;
  top: 47px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 6px 6px;
  background-color: ${theme.color.white};
`;

export const AppContent = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  max-width: 1920px;
  padding: ${theme.size.md};

  @media (max-width: 960px) {
    padding: ${theme.size.sm};
  }
`;
