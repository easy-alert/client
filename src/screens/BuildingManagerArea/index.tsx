// STYLES
import { Button } from '../../components/Buttons/Button';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import * as Style from './styles';

export const BuildingManagerArea = () => (
  <Style.Container>
    <h2>Monte Ravello</h2>
    <Style.FilterWrapper>
      <Select label="Ano" />
      <Select label="Mês" />
      <Select label="Status" />
      <Button type="button" label="Filtrar" />
    </Style.FilterWrapper>
    <Style.Kanban>
      <Style.KanbanCard>
        <h5>Pendentes</h5>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
      </Style.KanbanCard>

      <Style.KanbanCard>
        <h5>Vencidas</h5>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>
            {' '}
            Sistemas Hidrossanitários Hidrossanitários Hidrossanitários Hidrossanitários
            HidrossanitáriosHidrossanitários
          </h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
      </Style.KanbanCard>

      <Style.KanbanCard>
        <h5>Concluídas</h5>
        <Style.MaintenanceInfo>
          <span>
            <h6>Sistemas Hidrossanitáriosdsada da</h6>
            <EventTag status="overdue" />
          </span>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
        <Style.MaintenanceInfo>
          <h6>Sistemas Hidrossanitários</h6>
          <p className="p2">
            Verificar as tubulações de água potável e servida para detectar obstruções, falhas,
            entupimentos e problemas de fixação. Reconstruir a sua integridade, se necessário.
          </p>
          <p className="p2">tagzinha</p>
        </Style.MaintenanceInfo>
      </Style.KanbanCard>
    </Style.Kanban>
  </Style.Container>
);
