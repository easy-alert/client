import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IResponse } from '@customTypes/IResponse';
import type { ITicket } from '@customTypes/ITicket';
import { ITicketFilter } from '@screens/Tickets';

interface IGetTickets {
  buildingNanoId: string;
  filter: ITicketFilter;
  page?: number;
  take?: number;
}

interface IResponseGetTicketsByBuildingNanoId extends IResponse {
  data: {
    buildingName: string;
    tickets: ITicket[];
    filterOptions: {
      years: string[];
      months: string[];
    };
  };
}

export const getTicketsByBuildingNanoId = async ({
  buildingNanoId,
  filter,
  page,
  take,
}: IGetTickets) => {
  const uri = `/tickets/buildings/${buildingNanoId}?year=${filter.year}&month=${filter.month}&status=${filter.status}&placeId=${filter.placeId}&typeId=${filter.serviceTypeId}&page=${page}&take=${take}`;

  try {
    const response: IResponseGetTicketsByBuildingNanoId = await Api.get(uri);

    const { buildingName, tickets, filterOptions } = response.data;

    return { buildingName, tickets, filterOptions };
  } catch (error: any) {
    handleToastify(error);
    return { buildingName: '', tickets: [], filterOptions: { years: [], months: [] } };
  }
};
