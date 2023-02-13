// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS
import { Button } from '../../components/Buttons/Button';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { requestMaintenancesPlan } from './functions';

// STYLES
import * as Style from './styles';

// TYPES
import { IMaintenancesPlan } from './types';

export const MaintenancesPlan = () => {
  const [maintenancesPlan, setMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    requestMaintenancesPlan({
      buildingId: 'e24696d4-aaef-442c-b6bd-187717bf1c3d',
      syndicId: 'f814fd08-1fdb-4876-b066-276606a01fb1',
      setLoading,
      setMaintenancesPlan,
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <Style.Container>
      <h2>Monte Ravello</h2>
      <Style.WebBanner
        src="https://larguei.s3.us-west-2.amazonaws.com/Rectangle+600+%281%29-1676307129017.png"
        alt="Web banner"
      />
      <Style.MobileBanner
        src="https://larguei.s3.us-west-2.amazonaws.com/Rectangle%20604-1676307085432.png"
        alt="Web banner"
      />
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
            <Style.MonthSection key={month.name}>
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
                <Style.NoMaintenanceCard>
                  <h6>Sem manutenções</h6>
                </Style.NoMaintenanceCard>
              )}
            </Style.MonthSection>
          ))}
        </Style.CalendarWrapper>
      </Style.Card>
    </Style.Container>
  );
};
