import styled from 'styled-components';
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
  gap: ${theme.size.md};
  flex-direction: column;

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

export const ButtonGrid = styled.div<{ canAccessTickets: boolean }>`
  display: grid;
  grid-template-columns: ${({ canAccessTickets }) =>
    canAccessTickets ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};

  gap: ${theme.size.sm};

  button {
    width: 100%;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.5s;

    :hover {
      opacity: 0.8;
    }
  }

  .supportLink {
    width: 100%;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.5s;
    border-radius: ${theme.size.xxsm};
    padding: ${theme.size.xsm} ${theme.size.sm};
    outline: none;
    border: none;
    cursor: pointer;
    color: ${theme.color.white};
    background-color: ${theme.color.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Carrousel = styled.div`
  img {
    height: 500px;
    max-height: 500px;
  }

  @media (max-width: 900px) {
    height: 250px;
    max-height: 250px;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet-active {
    background-color: ${theme.color.primary}; /* Cor da bolinha ativa */
  }

  .swiper-pagination {
    background-color: white;
    bottom: 0;
  }
`;
