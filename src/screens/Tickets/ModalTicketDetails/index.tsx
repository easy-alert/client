// REACT
import { useEffect, useState } from 'react';

// LIBS
// CONTEXTS
// HOOKS
// SERVICES
import { getTicketById } from '@services/apis/getTicketById';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { ImagePreview } from '@components/ImagePreview';
import { EventTag } from '@components/EventTag';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// GLOBAL STYLES
// GLOBAL ASSETS
// GLOBAL TYPES
import { ITicket } from '@customTypes/ITicket';

// COMPONENTS
// UTILS
// STYLES
import { Button } from '@components/Buttons/Button';
import { TicketHistoryActivities } from '@components/TicketHistoryActivities';
import * as Style from './styles';

// TYPES

interface IModalTicketDetails {
  ticketId: string;
  handleTicketDetailsModal: (modalState: boolean) => void;
}

function ModalTicketDetails({ ticketId, handleTicketDetailsModal }: IModalTicketDetails) {
  const [ticket, setTicket] = useState<ITicket>();

  const [loading, setLoading] = useState<boolean>(true);

  const handleGetTicketById = async () => {
    setLoading(true);

    try {
      const ticketData = await getTicketById(ticketId);
      console.log('🚀 ~ handleGetTicketById ~ ticketData:', ticketData);

      setTicket(ticketData);
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setLoading(false);
    }
  };

  const ticketDetailsRows = {
    leftColumn: [
      {
        label: 'Edificação',
        value: ticket?.building.name,
      },
      {
        label: 'Nome do morador',
        value: ticket?.residentName,
      },
      {
        label: 'Apartamento do morador',
        value: ticket?.residentApartment,
      },
      {
        label: 'E-mail do morador',
        value: ticket?.residentEmail,
      },
    ],
    rightColumn: [
      {
        label: 'Descrição',
        value: ticket?.description,
      },
      {
        label: 'Local da ocorrência',
        place: ticket?.place,
      },
      {
        label: 'Tipo da manutenção',
        types: ticket?.types,
      },
    ],
  };

  useEffect(() => {
    handleGetTicketById();
  }, [ticketId]);

  if (!ticket) return null;

  return (
    <Modal
      title={`Detalhes do chamado #${ticket?.ticketNumber}`}
      bodyWidth="475px"
      setModal={handleTicketDetailsModal}
    >
      <Style.TicketDetailsContainer>
        <Style.TicketDetailsColumnContainer>
          <Style.TicketDetailsLeftColumn>
            {ticketDetailsRows.leftColumn.map(({ label, value }) => (
              <Style.TicketDetailsColumnContent key={label}>
                <Style.TicketDetailsRowLabel>{label}</Style.TicketDetailsRowLabel>
                <Style.TicketDetailsRowValue>{value}</Style.TicketDetailsRowValue>
              </Style.TicketDetailsColumnContent>
            ))}
          </Style.TicketDetailsLeftColumn>

          <Style.TicketDetailsRightColumn>
            {ticketDetailsRows.rightColumn.map(({ label, value, place, types }) => {
              if (label === 'Local da ocorrência') {
                return (
                  <Style.TicketDetailsColumnContent key={label}>
                    <Style.TicketDetailsRowLabel>{label}</Style.TicketDetailsRowLabel>
                    <EventTag label={place?.label} />
                  </Style.TicketDetailsColumnContent>
                );
              }

              if (label === 'Tipo da manutenção') {
                return (
                  <Style.TicketDetailsColumnContent key={label}>
                    <Style.TicketDetailsRowLabel>{label}</Style.TicketDetailsRowLabel>
                    {Array.isArray(types) &&
                      types.map(({ type }) => (
                        <EventTag
                          key={type.id}
                          label={type.label}
                          color={type.color}
                          bgColor={type.backgroundColor}
                        />
                      ))}
                  </Style.TicketDetailsColumnContent>
                );
              }

              return (
                <Style.TicketDetailsColumnContent key={label}>
                  <Style.TicketDetailsRowLabel>{label}</Style.TicketDetailsRowLabel>
                  <Style.TicketDetailsRowValue>
                    {!Array.isArray(value) && value}
                  </Style.TicketDetailsRowValue>
                </Style.TicketDetailsColumnContent>
              );
            })}
          </Style.TicketDetailsRightColumn>
        </Style.TicketDetailsColumnContainer>

        <Style.TicketDetailsImagesContainer>
          <Style.TicketDetailsRowLabel>Imagens</Style.TicketDetailsRowLabel>

          <Style.TicketDetailsImagesContent>
            {ticket?.images.map((image) => (
              <ImagePreview
                key={image.id}
                src={image.url}
                downloadUrl={image.url}
                imageCustomName={image.name}
                width="128px"
                height="128px"
              />
            ))}
          </Style.TicketDetailsImagesContent>
        </Style.TicketDetailsImagesContainer>

        <TicketHistoryActivities ticketId={ticket.id} />

        <Style.ButtonsContainer>
          <Button label="Voltar para Aberto" />
          <Button label="Reprovar" />
          <Button label="Executar" />
          <Button label="Finalizar" />
        </Style.ButtonsContainer>
      </Style.TicketDetailsContainer>
    </Modal>
  );
}

export default ModalTicketDetails;
