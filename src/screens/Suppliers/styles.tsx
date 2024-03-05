import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.size.sm};
  padding-top: ${theme.size.sm};

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  > h2 {
    margin-right: ${theme.size.sm};
  }

  @media (max-width: 900px) {
    width: 60%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xxsm};
  width: 100%;
  > input {
    height: 24px;
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: none !important;
    outline: none;
  }
`;

export const PaginationFooter = styled.footer`
  margin-top: 8px;
  padding-right: 16px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  gap: ${theme.size.xxsm};
  > h3 {
    color: ${theme.color.gray4};
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-top: ${theme.size.sm};
  gap: ${theme.size.md};
`;

export const Card = styled.button`
  all: unset;
  background-color: ${theme.color.white};
  padding: ${theme.size.md};
  border-radius: ${theme.size.xsm};
  color: ${theme.color.black};

  cursor: pointer;
  transition: 0.1s;

  :hover {
    scale: 1.05;
  }

  display: flex;
  flex-direction: column;
  gap: ${theme.size.md};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.color.gray3};
  margin-bottom: ${theme.size.xsm};
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardContent = styled.div`
  > p {
    margin-top: ${theme.size.xsm};
    color: #3f3e3e;
  }
`;

export const CardFooter = styled.div`
  color: #3f3e3e;
`;

export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
`;
