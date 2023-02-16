/* eslint-disable react/no-array-index-key */
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

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    months: [],
    status: [],
    years: [],
  });

  const [filter, setFilter] = useState<IFilter>({
    months: `0${String(new Date().getMonth() + 1)}`, // arrumar arrumar arrumar
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
        <h2>req</h2>
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
            <option value="">Todos</option>
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
        {kanban.map((card) => (
          <Style.KanbanCard key={card.status}>
            <Style.KanbanHeader>
              <h5>{card.status}</h5>
            </Style.KanbanHeader>

            {card.maintenances.length > 0 ? (
              card.maintenances.map((maintenance, i: number) => (
                <Style.MaintenanceInfo key={maintenance.id + i} status={maintenance.status}>
                  <span>
                    <h6>{maintenance.element}</h6>
                    {maintenance.status === 'overdue' && <EventTag status="overdue" />}
                  </span>
                  <p className="p2">{maintenance.activity}</p>
                  <p className="p3">{maintenance.label}</p>
                </Style.MaintenanceInfo>
              ))
            ) : (
              <Style.NoDataContainer>
                <h4>Nenhuma manutenção encontrada.</h4>
              </Style.NoDataContainer>
            )}
          </Style.KanbanCard>
        ))}
      </Style.Kanban>
    </Style.Container>
  );
};
