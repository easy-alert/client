import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const WebBanner = styled.img`
  border-radius: ${theme.size.xxsm};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const MobileBanner = styled.img`
  border-radius: ${theme.size.xxsm};
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const Card = styled.div`
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  margin-bottom: ${theme.size.md};
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-end;
  gap: ${theme.size.xsm};
  max-width: 65%;

  > :last-child {
    margin-left: ${theme.size.xsm};
  }

  @media (max-width: 900px) {
    max-width: 100%;
    grid-template-columns: 1fr;

    > :last-child {
      margin-left: auto;
      margin-top: ${theme.size.xsm};
    }
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const MonthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const DayWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.size.xxsm};
  width: 45px;

  > p {
    color: ${theme.color.gray4};
    font-weight: 500;
  }
`;

export const Maintenance = styled.div`
  min-height: 62px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.sm} ${theme.size.sm} ${theme.size.sm} ${theme.size.md};

  //trocar
  background: linear-gradient(
    90deg,
    rgba(52, 181, 58, 1) 0%,
    rgba(52, 181, 58, 1) 7px,
    rgba(250, 250, 250, 1) 7px,
    rgba(250, 250, 250, 1) 100%
  );
`;

export const MaintenanceTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
  flex-wrap: wrap;

  margin-bottom: ${theme.size.xsm};
`;

export const NoMaintenanceCard = styled.div`
  width: 100%;
  min-height: 62px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.sm} ${theme.size.sm} ${theme.size.sm} ${theme.size.md};
  background: linear-gradient(
    90deg,
    rgb(217, 217, 217) 0%,
    rgb(217, 217, 217) 7px,
    rgba(250, 250, 250, 1) 7px,
    rgba(250, 250, 250, 1) 100%
  );
`;
