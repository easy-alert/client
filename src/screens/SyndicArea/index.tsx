// LIBS
import { useState, useEffect } from 'react';

// COMPONENTS
import { Button } from '../../components/Buttons/Button';
import { IconButton } from '../../components/Buttons/IconButton';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';

// FUNCTIONS
import { requestSyndicKanban } from './functions';
import { capitalizeFirstLetter, query } from '../../utils/functions';

// TYPES
import { IFilter, IFilterOptions, IKanban } from './types';

// STYLES
import { icon } from '../../assets/icons';
import { theme } from '../../styles/theme';
import * as Style from './styles';

export const SyndicArea = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [kanban, setKanban] = useState<IKanban[]>([]);
  console.log('kanban', kanban);

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    months: [],
    status: [],
    years: [],
  });

  const [filter, setFilter] = useState<IFilter>({
    months: '02', // arrumar arrumar arrumar
    status: '',
    years: String(new Date().getFullYear()),
  });

  const syndicId = query.get('syndicId') ?? '';

  useEffect(() => {
    requestSyndicKanban({ setLoading, syndicId, setFilterOptions, filter, setOnQuery, setKanban });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <Style.Container>
      <Style.Header>
        <h2>Monte Ravello</h2>
        <IconButton
          icon={icon.filter}
          size="16px"
          label={showFilter ? 'Ocultar filtros' : 'Filtrar'}
          color={theme.color.gray5}
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        />
      </Style.Header>
      {showFilter && (
        <Style.FilterWrapper>
          <Select
            disabled={onQuery}
            selectPlaceholderValue={' '}
            label="Ano"
            value={filter.years}
            onChange={(e) => {
              setFilter((prevState) => {
                const newState = { ...prevState };
                newState.years = e.target.value;
                return newState;
              });
            }}
          >
            {filterOptions.years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            disabled={onQuery}
            selectPlaceholderValue={' '}
            label="Mês"
            value={filter.months}
            onChange={(e) => {
              setFilter((prevState) => {
                const newState = { ...prevState };
                newState.months = e.target.value;
                return newState;
              });
            }}
          >
            <option value="">Todos</option>
            {filterOptions.months.map((option) => (
              <option key={option.monthNumber} value={option.monthNumber}>
                {capitalizeFirstLetter(option.label)}
              </option>
            ))}
          </Select>
          <Select
            disabled={onQuery}
            selectPlaceholderValue={' '}
            label="Status"
            value={filter.status}
            onChange={(e) => {
              setFilter((prevState) => {
                const newState = { ...prevState };
                newState.status = e.target.value;
                return newState;
              });
            }}
          >
            <option value="">Todas</option>
            {filterOptions.status.map((option) => (
              <option key={option.name} value={option.name}>
                {capitalizeFirstLetter(option.label)}
              </option>
            ))}
          </Select>
          <Button
            type="button"
            label="Filtrar"
            disable={onQuery}
            onClick={() => {
              requestSyndicKanban({
                setLoading,
                syndicId,
                setFilterOptions,
                filter,
                setOnQuery,
                setKanban,
              });
            }}
          />
        </Style.FilterWrapper>
      )}
      <Style.Kanban>
        <Style.KanbanCard>
          <Style.KanbanHeader>
            <h5>Pendentes</h5>
          </Style.KanbanHeader>
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
          <Style.KanbanHeader>
            <h5>Vencidas</h5>
          </Style.KanbanHeader>
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
          <Style.KanbanHeader>
            <h5>Concluídas</h5>
          </Style.KanbanHeader>
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
};
