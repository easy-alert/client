/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Input } from '../../../components/Inputs/Input';
import * as Style from '../../SyndicArea/ModalSendMaintenanceReport/styles';
import { Button } from '../../../components/Buttons/Button';
import { PopoverButton } from '../../../components/Buttons/PopoverButton';
import { EventTag } from '../../../components/EventTag';
import { InProgressTag } from '../../../components/InProgressTag';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { MaintenanceHistoryActivities } from '../../../components/MaintenanceHistoryActivities';
import { Modal } from '../../../components/Modal';
import { theme } from '../../../styles/theme';
import {
  dateFormatter,
  applyMask,
  catchHandler,
  unMaskBRL,
  uploadManyFiles,
} from '../../../utils/functions';
import { requestMaintenanceDetails } from '../../functions';
import { requestReportProgress } from '../../SyndicArea/ModalSendMaintenanceReport/functions';
import {
  IModalSendMaintenanceReport,
  IMaintenanceReport,
} from '../../SyndicArea/ModalSendMaintenanceReport/types';
import { AnnexesAndImages, IMaintenance } from '../../types';
import { Api } from '../../../services/api';
import { icon } from '../../../assets/icons';
import { IconButton } from '../../../components/Buttons/IconButton';
import { ImagePreview } from '../../../components/ImagePreview';
import { DotLoading } from '../../../components/Loadings/DotLoading';
import { ImageComponent } from '../../../components/ImageComponent';

export const ModalGuestSendMaintenanceReport = ({
  setModal,
  modalAdditionalInformations,
}: IModalSendMaintenanceReport) => {
  const [query] = useSearchParams();
  const location = useLocation();

  const isGuest = location.pathname.includes('guest-maintenance-history');
  const syndicNanoId = query.get('syndicNanoId') || (isGuest ? 'guest' : '');

  const [maintenance, setMaintenance] = useState<IMaintenance>({
    Building: {
      name: '',
    },
    canReport: false,
    daysInAdvance: 0,
    dueDate: '',
    id: '',
    inProgress: false,
    Maintenance: {
      activity: '',
      Category: {
        name: '',
      },
      element: '',
      frequency: 0,
      FrequencyTimeInterval: {
        pluralLabel: '',
        singularLabel: '',
      },
      MaintenanceType: {
        name: '',
      },
      observation: '',
      responsible: '',
      source: '',
    },
    resolutionDate: '',
    notificationDate: '',
    MaintenancesStatus: {
      name: 'pending',
    },
    MaintenanceReport: [{ cost: 0, id: '', observation: '', ReportAnnexes: [], ReportImages: [] }],
  });

  // MODAL ENVIAR RELATO - CONVIDADO
  const [maintenanceReport, setMaintenanceReport] = useState<IMaintenanceReport>({
    cost: 'R$ 0,00',
    observation: '',
  });

  const [modalLoading, setModalLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [files, setFiles] = useState<AnnexesAndImages[]>([]);
  const [onFileQuery, setOnFileQuery] = useState<boolean>(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: onFileQuery,
  });

  const [images, setImages] = useState<AnnexesAndImages[]>([]);
  const [onImageQuery, setOnImageQuery] = useState<boolean>(false);
  const {
    acceptedFiles: acceptedImages,
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'audio/flac': ['.flac'], // Colocado isso pro celular abrir as opções de camera corretamente.
    },
    disabled: onImageQuery,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const uploadAcceptedFiles = async () => {
        setOnFileQuery(true);

        const uploadedFiles = await uploadManyFiles(acceptedFiles);

        const formattedFiles = uploadedFiles.map((file) => ({
          name: file.originalname,
          originalName: file.originalname,
          url: file.Location,
        }));

        setFiles((prevState) => {
          let newState = [...prevState];
          newState = [...newState, ...formattedFiles];
          return newState;
        });
        setOnFileQuery(false);
      };

      uploadAcceptedFiles();
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (acceptedImages.length > 0) {
      const uploadAcceptedImages = async () => {
        setOnImageQuery(true);

        const uploadedImages = await uploadManyFiles(acceptedImages);

        const formattedImages = uploadedImages.map((file) => ({
          name: file.originalname,
          originalName: file.originalname,
          url: file.Location,
        }));

        setImages((prevState) => {
          let newState = [...prevState];
          newState = [...newState, ...formattedImages];
          return newState;
        });
        setOnImageQuery(false);
      };

      uploadAcceptedImages();
    }
  }, [acceptedImages]);

  useEffect(() => {
    requestReportProgress({
      maintenanceHistoryId: modalAdditionalInformations.id,
      setMaintenanceReport,
      setFiles,
      setImages,
    }).then(() => {
      requestMaintenanceDetails({
        maintenanceHistoryId: modalAdditionalInformations.id,
        setMaintenance,
        setModalLoading,
      });
    });
  }, []);

  const requestToggleInProgress = async () => {
    setOnQuery(true);

    await Api.post(`/maintenances/set/in-progress?syndicNanoId=${syndicNanoId}`, {
      maintenanceHistoryId: modalAdditionalInformations.id,
      inProgressChange: !maintenance.inProgress,
    })
      .then(async (res) => {
        await requestMaintenanceDetails({
          maintenanceHistoryId: modalAdditionalInformations.id,
          setMaintenance,
          setModalLoading,
        });
        toast.success(res.data.ServerMessage.message);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  const requestSendReport = async () => {
    setOnQuery(true);

    await Api.post('/maintenances/create/report', {
      origin: 'Convidado',
      maintenanceHistoryId: modalAdditionalInformations.id,
      cost: Number(unMaskBRL(maintenanceReport.cost)),
      observation: maintenanceReport.observation !== '' ? maintenanceReport.observation : null,
      responsibleSyndicId: syndicNanoId,
      ReportAnnexes: files,
      ReportImages: images,
    })
      .then(async (res) => {
        toast.success(res.data.ServerMessage.message);
        await requestMaintenanceDetails({
          maintenanceHistoryId: modalAdditionalInformations.id,
          setMaintenance,
          setModalLoading,
        });
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  const requestSaveReportProgress = async () => {
    setOnQuery(true);

    await Api.post(`/maintenances/create/report/progress?syndicNanoId=${syndicNanoId}`, {
      maintenanceHistoryId: modalAdditionalInformations.id,
      cost: Number(unMaskBRL(maintenanceReport.cost)),
      observation: maintenanceReport.observation !== '' ? maintenanceReport.observation : null,
      ReportAnnexes: files,
      ReportImages: images,
    })
      .then(async (res) => {
        await requestMaintenanceDetails({
          maintenanceHistoryId: modalAdditionalInformations.id,
          setMaintenance,
          setModalLoading,
        });
        toast.success(res.data.ServerMessage.message);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  return (
    <Modal
      title={maintenance.canReport ? 'Enviar relato' : 'Detalhes de manutenção'}
      setModal={setModal}
    >
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
            {maintenance?.Maintenance.MaintenanceType.name === 'occasional' ? (
              <EventTag status="occasional" />
            ) : (
              <EventTag status="common" />
            )}
            {(maintenance?.MaintenancesStatus.name === 'expired' ||
              maintenance?.MaintenancesStatus.name === 'pending') &&
              maintenance.inProgress && <InProgressTag />}
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
                  {!!maintenance.Maintenance.frequency &&
                    `A cada${' '}
                    ${
                      maintenance.Maintenance.frequency > 1
                        ? `${maintenance.Maintenance.frequency} ${maintenance.Maintenance.FrequencyTimeInterval.pluralLabel}`
                        : `${maintenance.Maintenance.frequency} ${maintenance.Maintenance.FrequencyTimeInterval.singularLabel}`
                    }`}
                </p>
              </Style.Row>
            )}

            <Style.Row>
              <h6>Data de notificação</h6>
              <p className="p2">
                {maintenance.notificationDate ? dateFormatter(maintenance.notificationDate) : ''}
              </p>
            </Style.Row>

            {maintenance.Maintenance.MaintenanceType.name !== 'occasional' && (
              <Style.Row>
                <h6>Data de vencimento</h6>
                <p className="p2">
                  {maintenance.dueDate ? dateFormatter(maintenance.dueDate) : ''}
                </p>
              </Style.Row>
            )}

            {!!maintenance.daysInAdvance && (
              <Style.Row>
                <h6>Dias antecipados</h6>
                <p className="p2">{maintenance.daysInAdvance}</p>
              </Style.Row>
            )}

            <MaintenanceHistoryActivities maintenanceHistoryId={maintenance.id} />

            {maintenance.canReport &&
              ['expired', 'pending'].includes(maintenance.MaintenancesStatus.name) && (
                <>
                  <Input
                    label="Custo"
                    placeholder="Ex: R$ 100,00"
                    maxLength={14}
                    value={maintenanceReport.cost}
                    onChange={(e) => {
                      setMaintenanceReport((prevState) => {
                        const newState = { ...prevState };
                        newState.cost = applyMask({ mask: 'BRL', value: e.target.value }).value;
                        return newState;
                      });
                    }}
                  />

                  {/* <TextArea
                    label="Observação do relato"
                    placeholder="Digite aqui"
                    value={maintenanceReport.observation}
                    onChange={(e) => {
                      setMaintenanceReport((prevState) => {
                        const newState = { ...prevState };
                        newState.observation = e.target.value;
                        return newState;
                      });
                    }}
                  />  */}

                  <Style.FileStyleRow disabled={onFileQuery}>
                    <h6>Anexar</h6>
                    <Style.FileRow>
                      <Style.DragAndDropZoneFile {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />

                        <ImageComponent src={icon.addFile} width="40px" height="32px" radius="0" />
                      </Style.DragAndDropZoneFile>

                      {(files.length > 0 || onFileQuery) && (
                        <Style.FileAndImageRow>
                          {files.map((e, i: number) => (
                            <Style.Tag title={e.name} key={i}>
                              <p className="p3">{e.name}</p>
                              <IconButton
                                size="16px"
                                icon={icon.xBlack}
                                onClick={() => {
                                  setFiles((prevState) => {
                                    const newState = [...prevState];
                                    newState.splice(i, 1);
                                    return newState;
                                  });
                                }}
                              />
                            </Style.Tag>
                          ))}
                          {onFileQuery &&
                            acceptedFiles.map((e) => (
                              <Style.FileLoadingTag key={e.name}>
                                <DotLoading />
                              </Style.FileLoadingTag>
                            ))}
                        </Style.FileAndImageRow>
                      )}
                    </Style.FileRow>
                  </Style.FileStyleRow>
                  <Style.FileStyleRow disabled={onImageQuery}>
                    <h6>Imagens</h6>

                    <Style.FileAndImageRow>
                      <Style.DragAndDropZoneImage
                        {...getRootPropsImages({ className: 'dropzone' })}
                      >
                        <input {...getInputPropsImages()} />
                        <ImageComponent src={icon.addImage} width="40px" height="38px" radius="0" />
                      </Style.DragAndDropZoneImage>

                      {images.map((e, i: number) => (
                        <ImagePreview
                          key={e.name + i}
                          width="97px"
                          height="97px"
                          imageCustomName={e.name}
                          src={e.url}
                          onTrashClick={() => {
                            setImages((prevState) => {
                              const newState = [...prevState];
                              newState.splice(i, 1);
                              return newState;
                            });
                          }}
                        />
                      ))}

                      {onImageQuery &&
                        acceptedImages.map((e) => (
                          <Style.ImageLoadingTag key={e.name}>
                            <DotLoading />
                          </Style.ImageLoadingTag>
                        ))}
                    </Style.FileAndImageRow>
                  </Style.FileStyleRow>
                </>
              )}
          </Style.Content>
          {maintenance.canReport &&
          ['expired', 'pending'].includes(maintenance.MaintenancesStatus.name) ? (
            <Style.ButtonContainer>
              {!onQuery && (
                <PopoverButton
                  disabled={onQuery}
                  actionButtonClick={requestToggleInProgress}
                  borderless
                  textColor={theme.color.actionBlue}
                  label={maintenance.inProgress ? 'Parar execução' : 'Iniciar execução'}
                  message={{
                    title: maintenance.inProgress
                      ? 'Tem certeza que deseja alterar a execução?'
                      : 'Iniciar a execução apenas indica que a manutenção está sendo realizada, mas não conclui a manutenção.',
                    content: 'Esta ação é reversível.',
                  }}
                  type="Button"
                />
              )}

              {!onQuery && (
                <PopoverButton
                  disabled={onFileQuery || onImageQuery || onQuery}
                  actionButtonClick={requestSaveReportProgress}
                  textColor={theme.color.actionBlue}
                  borderless
                  label="Salvar progresso"
                  message={{
                    title: 'Tem certeza que deseja salvar o progresso?',
                    content: '',
                  }}
                  type="Button"
                />
              )}
              <PopoverButton
                loading={onQuery}
                actionButtonClick={requestSendReport}
                label="Finalizar manutenção"
                message={{
                  title: 'Tem certeza que deseja enviar o relato?',
                  content: 'Esta ação é irreversível.',
                  contentColor: theme.color.danger,
                }}
                type="Button"
              />
            </Style.ButtonContainer>
          ) : (
            <Button
              label="Fechar"
              center
              onClick={() => {
                setModal(false);
              }}
            />
          )}
        </Style.Container>
      )}
    </Modal>
  );
};
