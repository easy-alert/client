import { useState, useEffect, useCallback } from 'react';

import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface ITicketApartment {
  id: string;
  number: string;
}

export const useTicketApartments = ({ buildingNanoId }: { buildingNanoId: string }) => {
  const [ticketApartments, setTicketApartments] = useState<ITicketApartment[]>([]);

  const getTicketApartments = useCallback(async () => {
    const uri = `/tickets/apartments/${buildingNanoId}`;

    try {
      const response = await Api.get(uri);

      setTicketApartments(response.data);
    } catch (error: any) {
      handleToastify(error.response.data.ServerMessage.message);
    }
  }, []);

  useEffect(() => {
    getTicketApartments();
  }, []);

  return { ticketApartments };
};
