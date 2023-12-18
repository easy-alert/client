import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  height: 100%;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.size.md};
`;

export const Card = styled.a`
  background-color: ${theme.color.white};
  padding: ${theme.size.md};
  border-radius: ${theme.size.xsm};

  cursor: pointer;
  transition: 0.1s;

  :hover {
    scale: 1.05;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: ${theme.size.md};

  height: 100%;

  > h5 {
    color: ${theme.color.black};
  }

  > p {
    color: ${theme.color.gray4};
  }
`;
