// STYLES
import { Button } from '../../components/Buttons/Button';
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
          dayNumber: '02',
          dayName: 'Seg',
          status: 'Concluída',
        },
        {
          dayNumber: '02',
          dayName: 'Seg',
          status: 'Concluída',
        },
      ],
    },
    {
      name: 'Fevereiro',
      maintenances: [
        {
          dayNumber: '02',
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
                    <Style.MaintenanceInfo>{f.dayNumber}</Style.MaintenanceInfo>
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
