import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const Card = styled.div`
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }

  > h6 {
    color: ${theme.color.gray4};
  }
`;

export const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.size.xsm};
`;
