import { useParams } from 'react-router-dom';

import ModalTicketDetails from '@screens/Tickets/ModalTicketDetails';

export const GuestTicket = () => {
  const { ticketId } = useParams() as { ticketId: string };

  return (
    <ModalTicketDetails
      ticketId={ticketId}
      syndicNanoId=""
      type="guest"
      showButtons={false}
      handleTicketDetailsModal={() => ''}
      handleRefresh={() => ''}
    />
  );
};
