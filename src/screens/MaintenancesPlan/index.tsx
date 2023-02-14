// LIBS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { Button } from '../../components/Buttons/Button';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { requestMaintenancesPlan } from './functions';

// STYLES
import * as Style from './styles';

// TYPES
import { IBuilding, IMaintenancesPlan } from './types';

export const MaintenancesPlan = () => {
  const { buildingId } = useParams() as { buildingId: string };
  const [maintenancesPlan, setMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);
  const [building, setBuilding] = useState<IBuilding>({ Banners: [], name: '' });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    requestMaintenancesPlan({
      buildingId,
      setLoading,
      setMaintenancesPlan,
      setBuilding,
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <Style.Container>
      <h2>{building.name}</h2>
      {building.Banners.map(
        (banner) =>
          banner.type === 'Web' && (
            <Style.WebBanner
              key={banner.id}
              src={banner.url}
              alt="Web banner"
              onClick={() => {
                window.open(banner.redirectUrl, '_blank');
              }}
            />
          ),
      )}

      {building.Banners.map(
        (banner) =>
          banner.type === 'Mobile' && (
            <Style.MobileBanner
              key={banner.id}
              src={banner.url}
              alt="Mobile banner"
              onClick={() => {
                window.open(banner.redirectUrl, '_blank');
              }}
            />
          ),
      )}
      <Style.Card>
        <Style.CardHeader>
          <h4>Plano de manutenções</h4>
          <Style.FilterWrapper>
            <Select label="Ano" />
            <Select label="Mês" />
            <Select label="Status" />
            <Button type="button" label="Filtrar" />
          </Style.FilterWrapper>
        </Style.CardHeader>
        <Style.CalendarWrapper>
          {maintenancesPlan.map((month) => (
            <Style.MonthSection
              key={month.name}
              onClick={() => {
                // abrir modal
              }}
            >
              <h5>{month.name}</h5>
              {month.dates.length > 0 ? (
                month.dates.map((maintenance, i: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Style.DayWrapper key={maintenance.activity + i}>
                    <Style.DayInfo>
                      <p className="p3">{maintenance.dateInfos.dayNumber}</p>
                      <p className="p3">{maintenance.dateInfos.smName}</p>
                    </Style.DayInfo>
                    <Style.Maintenance>
                      <Style.MaintenanceTags>
                        {maintenance.status === 'overdue' && <EventTag status="completed" />}
                        <EventTag status={maintenance.status} />
                      </Style.MaintenanceTags>

                      <h6>{maintenance.activity}</h6>
                      <p className="p2">{maintenance.element}</p>
                    </Style.Maintenance>
                  </Style.DayWrapper>
                ))
              ) : (
                <Style.NoDataDayWrapper>
                  <Style.DayInfo />
                  <Style.NoMaintenanceCard>
                    <h6>Sem manutenções</h6>
                  </Style.NoMaintenanceCard>
                </Style.NoDataDayWrapper>
              )}
            </Style.MonthSection>
          ))}
        </Style.CalendarWrapper>
      </Style.Card>
    </Style.Container>
  );
};
