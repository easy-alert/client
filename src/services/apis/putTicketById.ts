import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import { ITicket } from '@customTypes/ITicket';

export async function putTicketById(updatedTicket: ITicket) {
  const uri = `/tickets/${updatedTicket.id}`;

  const body = {
    updatedTicket,
  };

  try {
    const response = await Api.put(uri, body);

    if ('seen' in updatedTicket) return;

    handleToastify(response);
  } catch (error: any) {
    handleToastify(error.response);
  }
}
