import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.size.sm};
  height: 100%;
`;

export const Wrapper = styled.div`
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.md};

  padding: ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 130px;
    cursor: pointer;
    transition: 0.5s;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const WebBanner = styled.img<{ redirectUrl: string }>`
  border-radius: ${theme.size.xxsm};
  width: 100%;
  max-height: 430px;
  object-fit: contain;
  transition: 0.25s;
  ${({ redirectUrl }) =>
    redirectUrl &&
    css`
      cursor: pointer;
      :hover {
        opacity: 0.9;
      }
    `}

  @media (max-width: 900px) {
    display: none;
  }
`;

export const MobileBanner = styled.img`
  display: none;

  @media (max-width: 900px) {
    display: block;
    transition: 0.25s;
    border-radius: ${theme.size.xxsm};
    width: 100%;
    max-height: 230px;
    object-fit: contain;
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.size.sm};

  button {
    width: 100%;
    height: 48px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.5s;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
