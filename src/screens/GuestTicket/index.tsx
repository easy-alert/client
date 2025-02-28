import { useParams } from 'react-router-dom';

import ModalTicketDetails from '@components/ModalTicketDetails';

export const GuestTicket = () => {
  const { ticketId } = useParams() as { ticketId: string };

  return (
    <ModalTicketDetails
      ticketId={ticketId}
      syndicNanoId=""
      handleTicketDetailsModal={() => ''}
      handleRefresh={() => ''}
    />
  );
};
