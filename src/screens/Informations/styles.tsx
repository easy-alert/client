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
  gap: ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.color.gray2};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  > p {
    font-weight: 400;
  }
`;
