// REACT
import { useState } from 'react';

// COMPONENTS
import { EventTag } from '@components/EventTag';
import { TicketHistoryActivities } from '@components/TicketHistoryActivities';
import { ImagePreview } from '@components/ImagePreview';
import { Button } from '@components/Buttons/Button';
import { TicketShareButton } from '@components/TicketShareButton';
import { TicketShowResidentButton } from '@components/TicketShowResidentButton';
import { Input } from '@components/Inputs/Input';
import { IconButton } from '@components/Buttons/IconButton';
import Typography from '@components/Typography';
import SignaturePad from '@components/SignaturePad';

// GLOBAL THEMES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL UTILS
import { applyMask } from '@utils/functions';
import { formatDateString } from '@utils/dateFunctions';

// GLOBAL TYPES
import type { ITicket } from '@customTypes/ITicket';

// STYLES
import * as Style from '../styles';

interface ITicketDetails {
  ticket: ITicket;
  syndicNanoId?: string;
  signatureLoading: boolean;
  handleSetView: (viewState: 'details' | 'dismiss') => void;
  handleUpdateOneTicket: (updatedTicket: ITicket, refresh?: boolean, closeModal?: boolean) => void;
  handleUploadSignature: (signature: string) => void;
}

function TicketDetails({
  ticket,
  syndicNanoId,
  signatureLoading,
  handleSetView,
  handleUpdateOneTicket,
  handleUploadSignature,
}: ITicketDetails) {
  const [collaborator, setCollaborator] = useState<string>('');
  const [openSignaturePad, setOpenSignaturePad] = useState<boolean>(false);

  const disableComment = ticket?.statusName !== 'awaitingToFinish' || !syndicNanoId;

  const ticketDetailsRows = {
    leftColumn: [
      {
        label: 'Edificação',
        value: ticket?.building?.name,
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
        label: 'CPF do morador',
        value: applyMask({ value: ticket?.residentCPF || '', mask: 'CPF' }).value,
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
      {
        label: 'Data de abertura',
        value: ticket?.createdAt ? formatDateString(ticket.createdAt, 'dd/MM/yyyy - HH:mm') : '',
      },
    ],
  };

  const ticketDetailsDismissedRows = [
    {
      label: 'Indeferido por',
      value: ticket.dismissedBy?.name,
    },
    {
      label: 'Data de indeferimento',
      value: ticket?.dismissedAt ? formatDateString(ticket?.dismissedAt, 'dd/MM/yyyy - HH:mm') : '',
    },
    {
      label: 'Justificativa',
      value: ticket?.dismissReasons?.label,
    },
    { label: 'Observação', value: ticket?.dismissObservation },
  ];

  const handleToggleShowToResident = () => {
    handleUpdateOneTicket({ id: ticket.id, showToResident: !ticket.showToResident });
  };

  return (
    <Style.TicketDetailsContainer>
      {syndicNanoId && <TicketShareButton ticketId={ticket.id} />}

      {syndicNanoId && (
        <TicketShowResidentButton
          showToResident={ticket.showToResident}
          handleToggleShowToResident={handleToggleShowToResident}
        />
      )}

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

                  <Style.TicketDetailsTypesContainer>
                    {Array.isArray(types) &&
                      types.map(({ type: ticketType }) => (
                        <EventTag
                          key={ticketType.id}
                          label={ticketType.label}
                          color={ticketType.color}
                          bgColor={ticketType.backgroundColor}
                        />
                      ))}
                  </Style.TicketDetailsTypesContainer>
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
          {ticket?.images?.map((image) => (
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

      <TicketHistoryActivities ticketId={ticket.id} disableComment={disableComment} />

      {ticket.statusName !== 'open' && syndicNanoId && (
        <Style.TicketFinalSolutionContainer>
          <Typography variant="h3" marginBottom="sm">
            Colaborador
          </Typography>

          <Style.TicketFinalSolutionContent>
            {!ticket?.collaborator ? (
              <>
                <Input
                  label=""
                  typeDatePlaceholderValue="Finalizar solução"
                  value={collaborator}
                  onChange={(e) => setCollaborator(e.target.value)}
                />

                <Button
                  label="Salvar"
                  bgColor="transparent"
                  textColor="finished"
                  onClick={() =>
                    handleUpdateOneTicket({ id: ticket.id, collaborator }, false, false)
                  }
                />
              </>
            ) : (
              <Style.TicketDetailsRowValue>{ticket.collaborator}</Style.TicketDetailsRowValue>
            )}
          </Style.TicketFinalSolutionContent>
        </Style.TicketFinalSolutionContainer>
      )}

      {ticket.statusName !== 'open' && (
        <Style.TicketSignatureContainer>
          <Style.TicketSignatureHeader>
            <Typography variant="h3">
              Assinatura:{' '}
              <Typography variant="span" fontSize="sm" style={{ textDecoration: 'underline' }}>
                {ticket.residentName}
              </Typography>
            </Typography>

            {!ticket?.signature && (
              <IconButton
                icon={icon.signing}
                onClick={() => setOpenSignaturePad(!openSignaturePad)}
              />
            )}
          </Style.TicketSignatureHeader>

          {!ticket?.signature ? (
            openSignaturePad && (
              <SignaturePad
                loading={signatureLoading}
                onSave={(signature: string) => {
                  handleUploadSignature(signature);
                }}
              />
            )
          ) : (
            <ImagePreview
              src={ticket.signature}
              downloadUrl={ticket.signature}
              imageCustomName="assinatura"
              width="128px"
              height="128px"
            />
          )}
        </Style.TicketSignatureContainer>
      )}

      {ticket?.statusName === 'dismissed' && (
        <Style.TicketDetailsColumnContent>
          <Style.TicketDetailsTitle>Detalhes do indeferimento</Style.TicketDetailsTitle>

          <Style.TicketDetailsDismissedContainer>
            <Style.TicketDetailsDismissedContent>
              {ticketDetailsDismissedRows.map(({ label, value }) => (
                <Style.TicketDetailsColumnContent key={label}>
                  <Style.TicketDetailsRowLabel>{label}</Style.TicketDetailsRowLabel>
                  <Style.TicketDetailsRowValue>{value}</Style.TicketDetailsRowValue>
                </Style.TicketDetailsColumnContent>
              ))}
            </Style.TicketDetailsDismissedContent>
          </Style.TicketDetailsDismissedContainer>
        </Style.TicketDetailsColumnContent>
      )}

      <Style.ButtonsContainer>
        {syndicNanoId ? (
          <>
            {ticket.statusName === 'open' && (
              <Button
                label="Executar"
                bgColor={theme.background.awaitingToFinish}
                onClick={() =>
                  handleUpdateOneTicket({
                    id: ticket.id,
                    statusName: 'awaitingToFinish',
                    dismissedById: syndicNanoId,
                  })
                }
              />
            )}

            {ticket.statusName === 'awaitingToFinish' && (
              <>
                <Button
                  label="Voltar para Aberto"
                  bgColor="white"
                  textColor={theme.color.actionBlue}
                  onClick={() =>
                    handleUpdateOneTicket({
                      id: ticket.id,
                      statusName: 'open',
                      dismissedById: syndicNanoId,
                    })
                  }
                />

                <Button
                  label="Finalizar"
                  bgColor={theme.background.finished}
                  onClick={() =>
                    handleUpdateOneTicket({
                      id: ticket.id,
                      statusName: 'finished',
                      dismissedById: syndicNanoId,
                    })
                  }
                />
              </>
            )}

            {(ticket.statusName === 'open' || ticket.statusName === 'awaitingToFinish') && (
              <Button
                label="Reprovar"
                bgColor={theme.background.dismissed}
                onClick={() => handleSetView('dismiss')}
              />
            )}
          </>
        ) : (
          <Button
            label="Fechar"
            bgColor={theme.color.primary}
            // onClick={() =>              }
          />
        )}
      </Style.ButtonsContainer>
    </Style.TicketDetailsContainer>
  );
}

export default TicketDetails;
