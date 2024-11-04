import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IResponse } from '@customTypes/IResponse';
import type { ITicket, ITicketStatus } from '@customTypes/ITicket';

interface IGetTickets {
  buildingNanoId: string;
  statusName?: string;
  initialCreatedAt?: string;
  finalCreatedAt?: string;
  page?: number;
  take?: number;
}

interface IResponseGetTicketsByBuildingNanoId extends IResponse {
  data: {
    buildingName: string;
    status: ITicketStatus[];
    tickets: ITicket[];
    ticketsCount: number;
  };
}

export const getTicketsByBuildingNanoId = async ({
  buildingNanoId,
  statusName = '',
  initialCreatedAt = '',
  finalCreatedAt = '',
  page = 0,
  take = 15,
}: IGetTickets) => {
  const uri = `/tickets/buildings/${buildingNanoId}?statusName=${statusName}&initialCreatedAt=${initialCreatedAt}&finalCreatedAt=${finalCreatedAt}&page=${page}&take=${take}`;

  try {
    const response: IResponseGetTicketsByBuildingNanoId = await Api.get(uri);

    const { buildingName, status, tickets, ticketsCount } = response.data;

    return { buildingName, status, tickets, ticketsCount };
  } catch (error: any) {
    handleToastify(error);
    return { buildingName: '', status: [], tickets: [], ticketsCount: 0 };
  }
};
