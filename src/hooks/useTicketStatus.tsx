import { useState, useEffect, useCallback } from 'react';

import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { ITicketStatus } from '@customTypes/ITicket';

export const useTicketStatus = ({ statusName }: { statusName: string }) => {
  const [ticketStatus, setTicketStatus] = useState<ITicketStatus[]>([]);

  const getTicketStatus = useCallback(async () => {
    const uri = `/tickets/status/${statusName}`;

    try {
      const response = await Api.get(uri);

      setTicketStatus(response.data);
    } catch (error: any) {
      handleToastify(error.response.data.ServerMessage.message);
    }
  }, []);

  useEffect(() => {
    getTicketStatus();
  }, []);

  return { ticketStatus };
};
