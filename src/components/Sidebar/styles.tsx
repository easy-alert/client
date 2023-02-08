import styled from 'styled-components';
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

  > img {
    height: 30px;
    width: 130px;
    margin: 0 ${theme.size.sm};
  }
`;

export const NavbarButton = styled.header<{ selected: boolean }>`
  padding: ${theme.size.md} ${theme.size.sm};

  color: ${theme.color.white};
  font-weight: 500;

  transition: 0.25s;
  :hover {
    background: rgba(241, 167, 167, 0.15);
  }
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
