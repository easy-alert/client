// STYLES
import { Button } from '../../components/Buttons/Button';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import * as Style from './styles';

export const MaintenancesPlan = () => {
  const months = [
    {
      name: 'Janeiro',
      maintenances: [
        {
          dayNumber: '02',
          dayName: 'Seg',
          status: 'Concluída',
        },
        {
          dayNumber: '03',
          dayName: 'Seg',
          status: 'Concluída',
        },
        {
          dayNumber: '04',
          dayName: 'Seg',
          status: 'Concluída',
        },
      ],
    },
    {
      name: 'Fevereiro',
      maintenances: [
        {
          dayNumber: '05',
          dayName: 'Qui',
          status: 'Concluída',
        },
      ],
    },
    {
      name: 'Março',
      maintenances: [],
    },
  ];

  return (
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
          {months.map((e) => (
            <Style.MonthSection key={e.name}>
              <h5>{e.name}</h5>
              {e.maintenances.length > 0 ? (
                e.maintenances.map((f) => (
                  <Style.DayWrapper key={f.dayNumber}>
                    <Style.DayInfo>
                      <p className="p3">{f.dayNumber}</p>
                      <p className="p3">{f.dayName}</p>
                    </Style.DayInfo>
                    <Style.Maintenance>
                      {/* {e.MaintenancesStatus.name === 'overdue' && <EventTag status="completed" />} */}
                      <Style.MaintenanceTags>
                        <EventTag status="completed" />
                        <EventTag status="overdue" />
                      </Style.MaintenanceTags>

                      <h6>Integridade da cerca</h6>
                      <p className="p2">
                        Verificação no perímetro da cerca, buscando uma tentativa de intrusão ou de
                        crescimento de vegetação
                      </p>
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
