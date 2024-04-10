/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';
import { catchHandler, dateFormatter } from '../../utils/functions';
import { Api } from '../../services/api';
import { Skeleton } from '../../components/Skeleton';
import { NoDataFound } from '../../components/NoDataFound';
import { ListTag } from '../../components/ListTag';
import { TagsArray } from '../../components/TagsArray';
import { InputCheckbox } from '../../components/Inputs/InputCheckbox';
import { IconButton } from '../../components/Buttons/IconButton';
import { icon } from '../../assets/icons';
import { theme } from '../../styles/theme';
import { Button } from '../../components/Buttons/Button';
import { Select } from '../../components/Inputs/Select';
import { ModalTicketDetails } from './ModalTicketDetails';
import { Input } from '../../components/Inputs/Input';

interface IImage {
  id: string;
  ticketId: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
interface IStatus {
  name: string;
  label: string;
  color: string;
  backgroundColor: string;
}
interface IPlace {
  id: string;
  label: string;
}
interface IType {
  type: IPlace;
}

interface ITicket {
  id: string;
  residentName: string;
  residentApartment: string;
  residentEmail: string;
  description: string;
  placeId: string;
  statusName: string;
  buildingId: string;
  ticketNumber: number;
  createdAt: string;
  updatedAt: string;
  images: IImage[];
  status: IStatus;
  place: IPlace;
  types: IType[];
}

interface IStatusOptions {
  name: string;
  label: string;
}

export const Tickets = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [loading, setLoading] = useState<boolean>(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [buildingName, setBuildingName] = useState<string>('');
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [modalTicketDetailsOpen, setModalTicketDetailsOpen] = useState<boolean>(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');
  const [statusOptions, setStatusOptions] = useState<IStatusOptions[]>([]);
  const [initialCreatedAt, setInitialCreatedAt] = useState<string>('');
  const [finalCreatedAt, setFinalCreatedAt] = useState<string>('');
  const [statusName, setStatusName] = useState<string>('');

  const findManyTickets = async () => {
    setOnQuery(true);

    await Api.get(
      `/tickets/buildings/${buildingNanoId}?statusName=${statusName}&initialCreatedAt=${initialCreatedAt}&finalCreatedAt=${finalCreatedAt}`,
    )
      .then((res) => {
        setTickets(res.data.tickets);
        setBuildingName(res.data.buildingName);
        setStatusOptions(res.data.status);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    findManyTickets();
  }, []);

  return (
    <>
      {modalTicketDetailsOpen && (
        <ModalTicketDetails setModal={setModalTicketDetailsOpen} ticketId={selectedTicketId} />
      )}
      <Style.Container>
        <Style.Header>
          <Style.HeaderWrapper>
            <h2>Chamados{buildingName ? ` / ${buildingName}` : ''}</h2>
            <Style.HeaderSide>
              <IconButton
                icon={icon.filter}
                size="16px"
                label={showFilter ? 'Ocultar' : 'Filtrar'}
                color={theme.color.gray5}
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              />
            </Style.HeaderSide>
          </Style.HeaderWrapper>

          <IconButton
            icon={icon.siren}
            label="Responder chamados"
            onClick={() => {
              //
            }}
          />
        </Style.Header>
        {showFilter && (
          <Style.FilterWrapper>
            <Input
              label="Data inicial"
              type="date"
              value={initialCreatedAt}
              onChange={(evt) => {
                setInitialCreatedAt(evt.target.value);
              }}
            />
            <Input
              label="Data final"
              type="date"
              value={finalCreatedAt}
              onChange={(evt) => {
                setFinalCreatedAt(evt.target.value);
              }}
            />
            <Select
              selectPlaceholderValue={' '}
              label="Status"
              value={statusName}
              onChange={(evt) => {
                setStatusName(evt.target.value);
              }}
            >
              <option value="">Todos</option>
              {statusOptions.map(({ label, name }) => (
                <option key={name} value={name}>
                  {label}
                </option>
              ))}
            </Select>
            <Button type="button" label="Filtrar" disable={onQuery} onClick={findManyTickets} />
          </Style.FilterWrapper>
        )}

        <Style.Wrapper>
          {loading && [...Array(10).keys()].map((e) => <Skeleton key={e} height="262px" />)}

          {!loading &&
            tickets.length > 0 &&
            tickets.map(({ id, residentName, place, types, createdAt, ticketNumber, status }) => (
              <Style.Card
                key={id}
                onClick={() => {
                  setSelectedTicketId(id);
                  setModalTicketDetailsOpen(true);
                }}
              >
                <Style.CardHeader>
                  <h5>{`#${ticketNumber}`}</h5>

                  <Style.CardHeaderRightSide
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ListTag
                      label={status.label}
                      backgroundColor={status.backgroundColor}
                      color={status.color}
                      fontWeight={500}
                      padding="2px 4px"
                      fontSize="12px"
                    />
                    <InputCheckbox size="18px" />
                  </Style.CardHeaderRightSide>
                </Style.CardHeader>

                <Style.CardRow>
                  <p className="p3">Morador</p>
                  <p className="p3">{residentName}</p>
                </Style.CardRow>

                <Style.CardRow>
                  <p className="p3">Local da Ocorrência</p>
                  <ListTag
                    label={place.label}
                    backgroundColor={theme.color.gray4}
                    color="#ffffff"
                    fontWeight={500}
                    padding="2px 4px"
                    fontSize="12px"
                  />
                </Style.CardRow>

                <Style.CardRow>
                  <p className="p3">Tipo da manutenção</p>
                  <TagsArray data={types.map(({ type }) => type.label)} />
                </Style.CardRow>

                <Style.CardRow>
                  <p className="p3">Data de abertura</p>
                  <p className="p3">{dateFormatter(createdAt)}</p>
                </Style.CardRow>
              </Style.Card>
            ))}
        </Style.Wrapper>

        {!loading && tickets.length === 0 && (
          <NoDataFound label="Nehum chamado cadastrado" height="70dvh" />
        )}
      </Style.Container>
    </>
  );
};
