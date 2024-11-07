import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IResponse } from '@customTypes/IResponse';
import type { ITicketActivities } from '@customTypes/ITicketActivities';

interface IResponseGetTicketHistoryActivities extends IResponse {
  data: {
    ticketActivities: ITicketActivities[];
  };
}

export async function getTicketHistoryActivities(ticketId: string) {
  const uri = `/ticketHistoryActivities/${ticketId}`;

  try {
    const response: IResponseGetTicketHistoryActivities = await Api.get(uri);

    const { ticketActivities } = response.data;

    return { ticketActivities };
  } catch (error: any) {
    handleToastify(error.response);
    return { ticketActivities: [] };
  }
}
