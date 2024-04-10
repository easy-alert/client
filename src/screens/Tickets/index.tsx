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

export const Tickets = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [loading, setLoading] = useState<boolean>(true);
  const [buildingName, setBuildingName] = useState<string>('');
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const findManyTickets = async () => {
    setLoading(true);

    await Api.get(`/tickets/buildings/${buildingNanoId}`)
      .then((res) => {
        setTickets(res.data.tickets);
        setBuildingName(res.data.buildingName);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findManyTickets();
  }, []);

  return (
    <Style.Container>
      <Style.Header>
        <h2>Chamados{buildingName ? ` / ${buildingName}` : ''}</h2>
      </Style.Header>

      <Style.Wrapper>
        {loading && [...Array(10).keys()].map((e) => <Skeleton key={e} height="262px" />)}

        {!loading &&
          tickets.length > 0 &&
          tickets.map(({ id, residentName, place, types, createdAt, ticketNumber, status }) => (
            <Style.Card key={id}>
              <Style.CardHeader>
                <h5>{`#${ticketNumber}`}</h5>

                <Style.CardHeaderRightSide>
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
                <p className="p3">{place.label}</p>
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
  );
};
