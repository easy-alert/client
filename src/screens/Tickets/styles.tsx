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
  gap: ${theme.size.xxsm};

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};

  @media (max-width: 600px) {
    gap: ${theme.size.sm};
  }

  > label {
    display: flex;
    align-items: center;
    gap: ${theme.size.xxsm};

    cursor: pointer;
    color: ${theme.color.gray4};
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
  width: 100%;

  @media (max-width: 600px) {
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
  gap: ${theme.size.xsm};

  cursor: pointer;
  transition: 0.1s;
  :hover {
    scale: 1.05;
  }
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
  gap: ${theme.size.xxsm};

  > p {
    font-weight: 500;
  }

  > :first-child {
    color: ${theme.color.gray4};
  }
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.6fr 0.8fr 71px;

  align-items: flex-end;
  gap: ${theme.size.xsm};
  max-width: 70%;

  > :last-child {
    margin-left: ${theme.size.xsm};
  }

  @media (max-width: 900px) {
    max-width: 100%;
    grid-template-columns: 1fr;

    background-color: ${theme.color.white};
    padding: ${theme.size.sm};
    border-radius: ${theme.size.xxsm};

    > :last-child {
      margin-left: auto;
      margin-top: ${theme.size.xsm};
    }
  }
`;
