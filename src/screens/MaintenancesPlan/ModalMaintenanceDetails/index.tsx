/* eslint-disable react/no-array-index-key */

// COMPONENTS
import { useEffect, useState } from 'react';
import { EventTag } from '../../../components/EventTag';
import { Button } from '../../../components/Buttons/Button';
import { Modal } from '../../../components/Modal';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { Image } from '../../../components/Image';

// STYLES
import * as Style from './styles';
import { icon } from '../../../assets/icons';

// TYPES
import { IModalMaintenanceDetails } from './types';
import { IMaintenance } from '../../types';

// FUNCTIONS
import { requestMaintenanceDetails } from '../../functions';
import { applyMask, dateFormatter } from '../../../utils/functions';
import { ImagePreview } from '../../../components/ImagePreview';
import { InProgressTag } from '../../../components/InProgressTag';

export const ModalMaintenanceDetails = ({
  setModal,
  modalAdditionalInformations,
}: IModalMaintenanceDetails) => {
  const [modalLoading, setModalLoading] = useState<boolean>(true);

  const [maintenance, setMaintenance] = useState<IMaintenance>({} as IMaintenance);

  useEffect(() => {
    requestMaintenanceDetails({
      maintenanceHistoryId: modalAdditionalInformations.id,
      setMaintenance,
      setModalLoading,
    });
  }, []);

  return (
    <Modal title="Detalhes de manutenção" setModal={setModal}>
      {modalLoading ? (
        <Style.LoadingContainer>
          <DotSpinLoading />
        </Style.LoadingContainer>
      ) : (
        <Style.Container>
          <h3>{maintenance?.Building.name}</h3>
          <Style.StatusTagWrapper>
            {maintenance.MaintenancesStatus.name === 'overdue' && <EventTag status="completed" />}
            <EventTag status={maintenance?.MaintenancesStatus.name} />
            {maintenance?.Maintenance.MaintenanceType.name === 'occasional' && (
              <EventTag status="occasional" />
            )}
            {(maintenance?.MaintenancesStatus.name === 'expired' ||
              maintenance?.MaintenancesStatus.name === 'pending') &&
              maintenance.inProgress &&
              !modalAdditionalInformations.isFuture && <InProgressTag />}
          </Style.StatusTagWrapper>
          <Style.Content>
            <Style.Row>
              <h6>Categoria</h6>
              <p className="p2">{maintenance.Maintenance.Category.name}</p>
            </Style.Row>

            <Style.Row>
              <h6>Elemento</h6>
              <p className="p2">{maintenance.Maintenance.element}</p>
            </Style.Row>

            <Style.Row>
              <h6>Atividade</h6>
              <p className="p2">{maintenance.Maintenance.activity}</p>
            </Style.Row>

            <Style.Row>
              <h6>Responsável</h6>
              <p className="p2">{maintenance.Maintenance.responsible}</p>
            </Style.Row>

            <Style.Row>
              <h6>Fonte</h6>
              <p className="p2">{maintenance.Maintenance.source}</p>
            </Style.Row>

            <Style.Row>
              <h6>Observação da manutenção</h6>
              <p className="p2">{maintenance.Maintenance.observation ?? '-'}</p>
            </Style.Row>

            {maintenance.Maintenance.MaintenanceType.name !== 'occasional' && (
              <Style.Row>
                <h6>Periodicidade</h6>
                <p className="p2">
                  A cada{' '}
                  {maintenance.Maintenance.frequency > 1
                    ? `${maintenance.Maintenance.frequency} ${maintenance.Maintenance.FrequencyTimeInterval.pluralLabel}`
                    : `${maintenance.Maintenance.frequency} ${maintenance.Maintenance.FrequencyTimeInterval.singularLabel}`}
                </p>
              </Style.Row>
            )}

            {modalAdditionalInformations.isFuture ? (
              <>
                <Style.Row>
                  <h6>Data de notificação prevista</h6>
                  <p className="p2">
                    {dateFormatter(modalAdditionalInformations.expectedNotificationDate)}
                  </p>
                </Style.Row>

                <Style.Row>
                  <h6>Data de vencimento prevista</h6>
                  <p className="p2">{dateFormatter(modalAdditionalInformations.expectedDueDate)}</p>
                </Style.Row>
              </>
            ) : (
              <>
                <Style.Row>
                  <h6>Data de notificação</h6>
                  <p className="p2">{dateFormatter(maintenance.notificationDate)}</p>
                </Style.Row>

                <Style.Row>
                  <h6>Data de vencimento</h6>
                  <p className="p2">{dateFormatter(maintenance.dueDate)}</p>
                </Style.Row>
              </>
            )}

            {maintenance.resolutionDate && (
              <Style.Row>
                <h6>Data de conclusão</h6>
                <p className="p2">{dateFormatter(maintenance.resolutionDate)}</p>
              </Style.Row>
            )}

            {!!maintenance.daysInAdvance && (
              <Style.Row>
                <h6>Dias antecipados</h6>
                <p className="p2">{maintenance.daysInAdvance}</p>
              </Style.Row>
            )}

            {maintenance.MaintenanceReport.length > 0 && (
              <>
                <Style.Row>
                  <h6>Custo</h6>
                  <p className="p2">
                    {
                      applyMask({
                        mask: 'BRL',
                        value: String(maintenance.MaintenanceReport[0].cost),
                      }).value
                    }
                  </p>
                </Style.Row>

                <Style.Row>
                  <h6>Observação do relato</h6>
                  <p className="p2">{maintenance.MaintenanceReport[0].observation ?? '-'}</p>
                </Style.Row>

                <Style.Row>
                  <h6>Anexos</h6>
                  <Style.FileAndImageRow>
                    {maintenance.MaintenanceReport[0].ReportAnnexes.length > 0 ? (
                      maintenance.MaintenanceReport[0].ReportAnnexes.map((annex, i: number) => (
                        <Style.Tag key={annex.name + i}>
                          <a
                            title={annex.originalName}
                            href={annex.url}
                            download
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p className="p3">{annex.name}</p>
                            <Image size="16px" img={icon.download} />
                          </a>
                        </Style.Tag>
                      ))
                    ) : (
                      <p className="p2">Nenhum anexo enviado.</p>
                    )}
                  </Style.FileAndImageRow>
                </Style.Row>

                <Style.Row>
                  <h6>Imagens</h6>
                  <Style.FileAndImageRow>
                    {maintenance.MaintenanceReport[0].ReportImages.length > 0 ? (
                      maintenance.MaintenanceReport[0].ReportImages.map((image, i: number) => (
                        <ImagePreview
                          key={image.name + i}
                          src={image.url}
                          downloadUrl={image.url}
                          imageCustomName={image.name}
                          width="132px"
                          height="136px"
                        />
                      ))
                    ) : (
                      <p className="p2">Nenhuma imagem enviada.</p>
                    )}
                  </Style.FileAndImageRow>
                </Style.Row>
              </>
            )}
          </Style.Content>

          <Button
            label="Fechar"
            center
            onClick={() => {
              setModal(false);
            }}
          />
        </Style.Container>
      )}
    </Modal>
  );
};
