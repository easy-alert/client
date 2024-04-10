import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.xsm};

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: ${theme.size.md};
`;

export const Card = styled.div`
  background-color: ${theme.color.white};
  padding: ${theme.size.sm};
  border-radius: ${theme.size.xxsm};

  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > h5 {
    font-weight: 500;
    color: ${theme.color.primary};
  }
`;

export const CardHeaderRightSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const CardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  > p {
    font-weight: 500;
  }

  > :first-child {
    color: ${theme.color.gray4};
  }
`;
