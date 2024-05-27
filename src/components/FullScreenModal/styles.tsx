import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: ${theme.size.md};
  background-color: ${theme.color.white};
`;

export const Body = styled.div`
  max-width: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.size.sm};
  text-align: center;
`;
