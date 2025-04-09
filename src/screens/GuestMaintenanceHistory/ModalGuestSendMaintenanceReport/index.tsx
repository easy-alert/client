/* eslint-disable react/no-array-index-key */
// REACT
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

// SERVICES
import { getMaintenanceHistoryById } from '@services/apis/getMaintenanceHistoryById';

// GLOBAL COMPONENTS
import { Input } from '@components/Inputs/Input';
import { Button } from '@components/Buttons/Button';
import { PopoverButton } from '@components/Buttons/PopoverButton';
import { EventTag } from '@components/EventTag';
import { InProgressTag } from '@components/InProgressTag';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { MaintenanceHistoryActivities } from '@components/MaintenanceHistoryActivities';
import { Modal } from '@components/Modal';
import { IconButton } from '@components/Buttons/IconButton';
import { ImagePreview } from '@components/ImagePreview';
import { DotLoading } from '@components/Loadings/DotLoading';
import { ImageComponent } from '@components/ImageComponent';
import { ListTag } from '@components/ListTag';

// GLOBAL UTILS
import { applyMask, dateFormatter, uploadManyFiles } from '@utils/functions';

// GLOBAL ICONS
import { icon } from '@assets/icons';

// GLOBAL THEME
import { theme } from '@styles/theme';

// UTILS
import {
  requestReportProgress,
  requestSaveReportProgress,
  requestSendReport,
  requestToggleInProgress,
} from '../functions';

// STYLES
import * as Style from './styles';

// TYPES
import type { IModalSendMaintenanceReport, IMaintenanceReport } from './types';
import type { AnnexesAndImages, IMaintenance } from '../../types';

export const ModalGuestSendMaintenanceReport = ({
  maintenanceHistoryId,
  userId,
}: IModalSendMaintenanceReport) => {
  const [maintenanceDetails, setMaintenanceDetails] = useState<IMaintenance>({
    Building: {
      name: '',
      guestCanCompleteMaintenance: false,
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
      instructions: [],
    },
    resolutionDate: '',
    notificationDate: '',
    MaintenancesStatus: {
      name: 'pending',
    },
    MaintenanceReport: [{ cost: 0, id: '', observation: '', ReportAnnexes: [], ReportImages: [] }],
    MaintenanceReportProgress: [
      { cost: 0, id: '', observation: '', ReportAnnexesProgress: [], ReportImagesProgress: [] },
    ],
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

  // #region api function
  const handleGetMaintenanceDetails = async () => {
    const responseData = await getMaintenanceHistoryById({
      maintenanceHistoryId,
    });

    setMaintenanceDetails(responseData);
  };

  const handleGetReportProgress = async () => {
    const responseData = await requestReportProgress({
      maintenanceHistoryId,
    });

    if (responseData.progress) {
      setMaintenanceReport({
        cost: applyMask({ mask: 'BRL', value: String(responseData.progress.cost) }).value,
        observation: responseData.progress.observation || '',
      });
      setFiles(responseData.progress.ReportAnnexesProgress);
      setImages(responseData.progress.ReportImagesProgress);
    }
  };

  const handleChangeMaintenanceProgress = async () => {
    setOnQuery(true);

    try {
      await requestToggleInProgress({
        syndicNanoId: '',
        userId: userId ?? '',
        maintenanceHistoryId,
        inProgressChange: !maintenanceDetails.inProgress,
      });
    } finally {
      setOnQuery(false);
    }
  };

  const handleSaveMaintenance = async () => {
    setOnQuery(true);

    try {
      await requestSaveReportProgress({
        syndicNanoId: '',
        userId: userId ?? '',
        maintenanceHistoryId,
        maintenanceReport,
        files,
        images,
      });
    } finally {
      setOnQuery(false);
    }
  };

  const handleSendReportMaintenance = async () => {
    setOnQuery(true);

    try {
      await requestSendReport({
        syndicNanoId: '',
        userId: userId ?? '',
        maintenanceHistoryId,
        maintenanceReport,
        files,
        images,
      });
    } finally {
      setOnQuery(false);
    }
  };

  // #endregion

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
    setModalLoading(true);

    try {
      handleGetReportProgress();
      handleGetMaintenanceDetails();
    } finally {
      setTimeout(() => {
        setModalLoading(false);
      }, 500);
    }
  }, []);

  return (
    <Modal
      bodyWidth="475px"
      title={maintenanceDetails.canReport ? 'Enviar relato' : 'Detalhes de manutenção'}
      setModal={() => ''}
    >
      {modalLoading ? (
        <Style.LoadingContainer>
          <DotSpinLoading />
        </Style.LoadingContainer>
      ) : (
        <Style.Container>
          <h3>{maintenanceDetails?.Building.name}</h3>
          <Style.StatusTagWrapper>
            {maintenanceDetails.MaintenancesStatus.name === 'overdue' && (
              <EventTag status="completed" />
            )}
            <EventTag status={maintenanceDetails?.MaintenancesStatus.name} />
            {maintenanceDetails?.Maintenance.MaintenanceType.name === 'occasional' ? (
              <EventTag status="occasional" />
            ) : (
              <EventTag status="common" />
            )}
            {(maintenanceDetails?.MaintenancesStatus.name === 'expired' ||
              maintenanceDetails?.MaintenancesStatus.name === 'pending') &&
              maintenanceDetails.inProgress && <InProgressTag />}
          </Style.StatusTagWrapper>
          <Style.Content>
            <Style.Row>
              <h6>Categoria</h6>
              <p className="p2">{maintenanceDetails.Maintenance.Category.name}</p>
            </Style.Row>
            <Style.Row>
              <h6>Elemento</h6>
              <p className="p2">{maintenanceDetails.Maintenance.element}</p>
            </Style.Row>
            <Style.Row>
              <h6>Atividade</h6>
              <p className="p2">{maintenanceDetails.Maintenance.activity}</p>
            </Style.Row>
            <Style.Row>
              <h6>Responsável</h6>
              <p className="p2">{maintenanceDetails.Maintenance.responsible}</p>
            </Style.Row>

            <Style.Row>
              <h6>Fonte</h6>
              <p className="p2">{maintenanceDetails.Maintenance.source}</p>
            </Style.Row>

            <Style.Row>
              <h6>Observação da manutenção</h6>
              <p className="p2">{maintenanceDetails.Maintenance.observation ?? '-'}</p>
            </Style.Row>

            <Style.Row>
              <h6>Instruções</h6>
              <Style.FileAndImageRow>
                {maintenanceDetails.Maintenance.instructions.length > 0
                  ? maintenanceDetails.Maintenance.instructions.map(({ url, name }) => (
                      <ListTag padding="4px 12px" downloadUrl={url} key={url} label={name} />
                    ))
                  : '-'}
              </Style.FileAndImageRow>
            </Style.Row>

            {maintenanceDetails.Maintenance.MaintenanceType.name !== 'occasional' && (
              <Style.Row>
                <h6>Periodicidade</h6>
                <p className="p2">
                  {!!maintenanceDetails.Maintenance.frequency &&
                    `A cada${' '}
                    ${
                      maintenanceDetails.Maintenance.frequency > 1
                        ? `${maintenanceDetails.Maintenance.frequency} ${maintenanceDetails.Maintenance.FrequencyTimeInterval.pluralLabel}`
                        : `${maintenanceDetails.Maintenance.frequency} ${maintenanceDetails.Maintenance.FrequencyTimeInterval.singularLabel}`
                    }`}
                </p>
              </Style.Row>
            )}

            <Style.Row>
              <h6>Data de notificação</h6>
              <p className="p2">
                {maintenanceDetails.notificationDate
                  ? dateFormatter(maintenanceDetails.notificationDate)
                  : ''}
              </p>
            </Style.Row>

            {maintenanceDetails.Maintenance.MaintenanceType.name !== 'occasional' && (
              <Style.Row>
                <h6>Data de vencimento</h6>
                <p className="p2">
                  {maintenanceDetails.dueDate ? dateFormatter(maintenanceDetails.dueDate) : ''}
                </p>
              </Style.Row>
            )}

            {!!maintenanceDetails.daysInAdvance && (
              <Style.Row>
                <h6>Dias antecipados</h6>
                <p className="p2">{maintenanceDetails.daysInAdvance}</p>
              </Style.Row>
            )}

            {maintenanceDetails.additionalInfo && (
              <Style.Row>
                <h6>Info. Adicional</h6>
                <p className="p2">{maintenanceDetails.additionalInfo}</p>
              </Style.Row>
            )}

            <MaintenanceHistoryActivities maintenanceHistoryId={maintenanceDetails.id} />

            {['completed', 'overdue'].includes(maintenanceDetails.MaintenancesStatus.name) && (
              <>
                <Style.FileStyleRow>
                  <h6>Anexos</h6>

                  <Style.FileAndImageRow>
                    {maintenanceDetails.MaintenanceReport[0].ReportAnnexes.length > 0 ? (
                      maintenanceDetails.MaintenanceReport[0].ReportAnnexes.map(
                        (annex, i: number) => (
                          <Style.Tag key={annex.name + i}>
                            <a
                              title={annex.originalName}
                              href={annex.url}
                              download
                              target="_blank"
                              rel="noreferrer"
                            >
                              <p className="p3">{annex.name}</p>
                              <ImageComponent size="16px" src={icon.download} />
                            </a>
                          </Style.Tag>
                        ),
                      )
                    ) : (
                      <p className="p2">Nenhum anexo enviado.</p>
                    )}
                  </Style.FileAndImageRow>
                </Style.FileStyleRow>

                <Style.FileStyleRow>
                  <h6>Imagens</h6>
                  <Style.FileAndImageRow>
                    {maintenanceDetails.MaintenanceReport[0].ReportImages.length > 0 ? (
                      maintenanceDetails.MaintenanceReport[0].ReportImages.map(
                        (image, i: number) => (
                          <ImagePreview
                            key={image.name + i}
                            src={image.url}
                            downloadUrl={image.url}
                            imageCustomName={image.name}
                            width="97px"
                            height="97px"
                          />
                        ),
                      )
                    ) : (
                      <p className="p2">Nenhuma imagem enviada.</p>
                    )}
                  </Style.FileAndImageRow>
                </Style.FileStyleRow>
              </>
            )}

            {maintenanceDetails.canReport &&
              ['expired', 'pending'].includes(maintenanceDetails.MaintenancesStatus.name) && (
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
          {maintenanceDetails.canReport &&
          ['expired', 'pending'].includes(maintenanceDetails.MaintenancesStatus.name) ? (
            <Style.ButtonContainer>
              {!onQuery && (
                <PopoverButton
                  disabled={onQuery}
                  actionButtonClick={() => handleChangeMaintenanceProgress()}
                  borderless
                  textColor={theme.color.actionBlue}
                  label={maintenanceDetails.inProgress ? 'Parar execução' : 'Iniciar execução'}
                  message={{
                    title: maintenanceDetails.inProgress
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
                  actionButtonClick={() => handleSaveMaintenance()}
                  textColor={theme.color.actionBlue}
                  borderless
                  label="Salvar"
                  message={{
                    title: 'Tem certeza que deseja salvar o progresso?',
                    content: '',
                  }}
                  type="Button"
                />
              )}

              {maintenanceDetails.Building.guestCanCompleteMaintenance && (
                <PopoverButton
                  loading={onQuery}
                  actionButtonClick={() => handleSendReportMaintenance()}
                  label="Finalizar manutenção"
                  message={{
                    title: 'Tem certeza que deseja enviar o relato?',
                    content: 'Esta ação é irreversível.',
                    contentColor: theme.color.danger,
                  }}
                  type="Button"
                />
              )}
            </Style.ButtonContainer>
          ) : (
            <Button label="Fechar" center onClick={() => ''} />
          )}
        </Style.Container>
      )}
    </Modal>
  );
};
