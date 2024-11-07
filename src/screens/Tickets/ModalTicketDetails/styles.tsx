import styled from 'styled-components';

import { theme } from '@styles/theme';

export const TicketDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const TicketDetailsColumnContainer = styled.div`
  display: flex;
  gap: ${theme.size.xxsm};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TicketDetailsLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 50%;
  float: left;

  gap: ${theme.size.xsm};
`;

export const TicketDetailsRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 50%;
  float: right;

  gap: ${theme.size.xsm};
`;

export const TicketDetailsColumnContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: ${theme.size.xxsm};
`;

export const TicketDetailsImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;

  gap: ${theme.size.xsm};
`;

export const TicketDetailsImagesContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  gap: ${theme.size.xsm};
`;

export const TicketDetailsRowLabel = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;

export const TicketDetailsRowValue = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: ${theme.size.sm};
  gap: ${theme.size.xsm};
`;
