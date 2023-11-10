// #region imports
// COMPONENTS
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// FUNCTIONS
import {
  changeShowContactStatus,
  requestBuildingDetails,
  requestDeleteFile,
  requestDeleteFolder,
  requestFolderDetails,
  requestResendEmailConfirmation,
  requestResendPhoneConfirmation,
} from './functions';

// STYLES
import * as Style from './styles';

// TYPES
import { Folder, IBuildingDetail, INotificationConfiguration, File } from './types';
import { icon } from '../../assets/icons';
import { Button } from '../../components/Buttons/Button';
import { Image } from '../../components/Image';
import { IconButton } from '../../components/Buttons/IconButton';
import { PopoverButton } from '../../components/Buttons/PopoverButton';
import { FolderComponent, FileComponent } from '../../components/FileSystem';
import { ImagePreview } from '../../components/ImagePreview';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { theme } from '../../styles/theme';
import { capitalizeFirstLetter, applyMask } from '../../utils/functions';
import { ModalAddFiles } from './ModalAddFiles';
import { ModalCreateFolder } from './ModalCreateFolder';
import { ModalCreateNotificationConfiguration } from './ModalCreateNotificationConfiguration';
import { ModalEditFile } from './ModalEditFile';
import { ModalEditFolder } from './ModalEditFolder';
import { ModalEditNotificationConfiguration } from './ModalEditNotificationConfiguration';
import { ModalManageBanners } from './ModalManageBanners';
import { NotificationTable, NotificationTableContent } from './NotificationTable';

// #endregion

export const Settings = () => {
  // #region states
  const { buildingId } = useParams();

  const phoneConfirmUrl = `${window.location.origin}/confirm/phone`;
  const emailConfirmUrl = `${window.location.origin}/confirm/email`;

  const [building, setBuilding] = useState<IBuildingDetail>();

  const [loading, setLoading] = useState<boolean>(true);

  const [showContactLoading, setShowContactLoading] = useState<boolean>(false);

  const [modalCreateNotificationConfigurationOpen, setModalCreateNotificationConfigurationOpen] =
    useState<boolean>(false);

  const [modalEditNotificationConfigurationOpen, setModalEditNotificationConfigurationOpen] =
    useState<boolean>(false);

  const [modalAddFilesOpen, setModalAddFilesOpen] = useState<boolean>(false);

  const [modalManageBannersOpen, setModalManageBannersOpen] = useState<boolean>(false);

  const [modalCreateFolderOpen, setModalCreateFolderOpen] = useState<boolean>(false);

  const [modalEditFolderOpen, setModalEditFolderOpen] = useState<boolean>(false);

  const [modalEditFileOpen, setModalEditFileOpen] = useState<boolean>(false);

  const [folderId, setFolderId] = useState<string | null>(null);

  const [rootFolder, setRootFolder] = useState<Folder>({ id: '', name: '' });

  const [folderToEdit, setFolderToEdit] = useState<Folder>();

  const [fileToEdit, setFileToEdit] = useState<File>();

  const [breadcrumb, setBreadcrumb] = useState<Folder[]>([{ id: '', name: 'Início' }]);

  const [selectedNotificationRow, setSelectedNotificationRow] =
    useState<INotificationConfiguration>();
  // #endregion

  // #region useeffects
  useEffect(() => {
    requestBuildingDetails({
      buildingId: buildingId!,
      setLoading,
      setBuilding,
      setRootFolder,
    });
  }, []);

  useEffect(() => {
    if (folderId) {
      requestFolderDetails({
        folderId,
        setBuilding,
        setBreadcrumb,
        rootFolder,
      });
    }
  }, [folderId]);
  // #endregion

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalCreateNotificationConfigurationOpen && building && (
        <ModalCreateNotificationConfiguration
          setModal={setModalCreateNotificationConfigurationOpen}
          buildingId={building.id}
          emailConfirmUrl={emailConfirmUrl}
          phoneConfirmUrl={phoneConfirmUrl}
          requestBuildingDetailsCall={async () => {
            requestBuildingDetails({
              buildingId: buildingId!,
              setLoading,
              setBuilding,
              setRootFolder,
            });
          }}
        />
      )}

      {modalEditNotificationConfigurationOpen && selectedNotificationRow && building && (
        <ModalEditNotificationConfiguration
          setModal={setModalEditNotificationConfigurationOpen}
          buildingId={building.id}
          selectedNotificationRow={selectedNotificationRow}
          emailConfirmUrl={emailConfirmUrl}
          phoneConfirmUrl={phoneConfirmUrl}
          requestBuildingDetailsCall={async () => {
            requestBuildingDetails({
              buildingId: buildingId!,
              setLoading,
              setBuilding,
              setRootFolder,
            });
          }}
        />
      )}

      {modalAddFilesOpen && building && rootFolder && (
        <ModalAddFiles
          setModal={setModalAddFilesOpen}
          setBuilding={setBuilding}
          folderId={folderId || building?.Folders.id}
        />
      )}

      {modalCreateFolderOpen && building && rootFolder && (
        <ModalCreateFolder
          setModal={setModalCreateFolderOpen}
          buildingId={building.id}
          setBuilding={setBuilding}
          parentId={folderId || building?.Folders.id}
        />
      )}

      {modalEditFolderOpen && building && folderToEdit && (
        <ModalEditFolder
          setModal={setModalEditFolderOpen}
          setBuilding={setBuilding}
          folder={folderToEdit}
        />
      )}

      {modalEditFileOpen && building && fileToEdit && (
        <ModalEditFile
          setModal={setModalEditFileOpen}
          setBuilding={setBuilding}
          file={fileToEdit}
        />
      )}

      {modalManageBannersOpen && building && (
        <ModalManageBanners
          setModal={setModalManageBannersOpen}
          buildingId={building.id}
          currentBanners={building?.Banners}
          requestBuildingDetailsCall={async () => {
            requestBuildingDetails({
              buildingId: buildingId!,
              setLoading,
              setBuilding,
              setRootFolder,
            });
          }}
        />
      )}

      <Style.Header>
        <h2>Detalhes de edificação</h2>
      </Style.Header>

      <Style.CardWrapper>
        {building?.MaintenancesCount && (
          <Style.FirstCard>
            <Style.CardHeaderLeftSide>
              <h5>Manutenções</h5>
              <Style.MaintenanceCardFooter>
                {/* Não fiz .map pra facilitar a estilização */}
                <Style.MaintenanceCardFooterInfo>
                  <h5 className="completed">{building?.MaintenancesCount[0].count}</h5>
                  <p className="p5">
                    {building?.MaintenancesCount[0].count > 1
                      ? capitalizeFirstLetter(building?.MaintenancesCount[0].pluralLabel)
                      : capitalizeFirstLetter(building?.MaintenancesCount[0].singularLabel)}
                  </p>
                </Style.MaintenanceCardFooterInfo>

                <Style.MaintenanceCardFooterInfo>
                  <h5 className="pending">{building?.MaintenancesCount[1].count}</h5>
                  <p className="p5">
                    {building?.MaintenancesCount[1].count > 1
                      ? capitalizeFirstLetter(building?.MaintenancesCount[1].pluralLabel)
                      : capitalizeFirstLetter(building?.MaintenancesCount[1].singularLabel)}
                  </p>
                </Style.MaintenanceCardFooterInfo>

                <Style.MaintenanceCardFooterInfo>
                  <h5 className="expired">{building?.MaintenancesCount[2].count}</h5>
                  <p className="p5">
                    {building?.MaintenancesCount[2].count > 1
                      ? capitalizeFirstLetter(building?.MaintenancesCount[2].pluralLabel)
                      : capitalizeFirstLetter(building?.MaintenancesCount[2].singularLabel)}
                  </p>
                </Style.MaintenanceCardFooterInfo>
              </Style.MaintenanceCardFooter>
            </Style.CardHeaderLeftSide>
            <Style.ButtonWrapper>
              <Button
                label="Manutenções"
                onClick={() => {
                  if (building.NotificationsConfigurations.length > 0) {
                    window.open(
                      `${import.meta.env.VITE_CLIENT_URL ?? 'http://localhost:3001'}/syndicarea/${
                        building.nanoId
                      }?syndicNanoId=${building.NotificationsConfigurations[0].nanoId}`,
                      '_blank',
                    );
                  } else {
                    window.open(
                      `${import.meta.env.VITE_CLIENT_URL ?? 'http://localhost:3001'}/home/${
                        building.nanoId
                      }`,
                      '_blank',
                    );
                  }
                }}
              />
            </Style.ButtonWrapper>
          </Style.FirstCard>
        )}

        <Style.Card>
          <Style.CardHeader>
            <h5>Responsáveis de manutenção</h5>
            <IconButton
              icon={icon.plusWithBg}
              label="Cadastrar"
              hideLabelOnMedia
              onClick={() => {
                setModalCreateNotificationConfigurationOpen(true);
              }}
            />
          </Style.CardHeader>
          {building && building.NotificationsConfigurations.length > 0 ? (
            <NotificationTable
              colsHeader={[
                { label: 'Nome do responsável' },
                { label: 'E-mail' },
                { label: 'Função' },
                { label: 'WhatsApp' },
                {
                  label: 'Exibir',
                  cssProps: {
                    textAlign: 'center',
                  },
                },
                { label: '' },
              ]}
            >
              {building?.NotificationsConfigurations.map((notificationRow, i: number) => (
                <NotificationTableContent
                  key={notificationRow.id}
                  onClick={() => {
                    //
                  }}
                  colsBody={[
                    {
                      cell: notificationRow.name,
                      cssProps: {
                        width: '20%',
                        borderBottomLeftRadius:
                          i + 1 === building?.NotificationsConfigurations.length
                            ? theme.size.xsm
                            : 0,
                      },
                    },
                    {
                      cell: (
                        <Style.TableDataWrapper>
                          {notificationRow.email ?? '-'}
                          {notificationRow.email &&
                            (notificationRow.emailIsConfirmed ? (
                              <Image img={icon.checkedNoBg} size="16px" />
                            ) : (
                              <PopoverButton
                                label="Reenviar"
                                hiddenIconButtonLabel
                                buttonIcon={icon.yellowAlert}
                                buttonIconSize="16px"
                                actionButtonBgColor={theme.color.primary}
                                type="IconButton"
                                message={{
                                  title: 'Deseja reenviar o e-mail de confirmação?',
                                  content: '',
                                  contentColor: theme.color.danger,
                                }}
                                actionButtonClick={() => {
                                  requestResendEmailConfirmation({
                                    buildingNotificationConfigurationId: notificationRow.id,
                                    link: emailConfirmUrl,
                                  });
                                }}
                              />
                            ))}
                        </Style.TableDataWrapper>
                      ),
                      cssProps: { width: '20%' },
                    },
                    { cell: notificationRow.role, cssProps: { width: '15%' } },
                    {
                      cell: (
                        <Style.TableDataWrapper>
                          {notificationRow.contactNumber
                            ? applyMask({ mask: 'TEL', value: notificationRow.contactNumber }).value
                            : '-'}

                          {notificationRow.isMain &&
                            notificationRow.contactNumber &&
                            (notificationRow.contactNumberIsConfirmed ? (
                              <Image img={icon.checkedNoBg} size="16px" />
                            ) : (
                              <PopoverButton
                                label="Reenviar"
                                hiddenIconButtonLabel
                                buttonIcon={icon.yellowAlert}
                                buttonIconSize="16px"
                                actionButtonBgColor={theme.color.primary}
                                type="IconButton"
                                message={{
                                  title: 'Deseja reenviar a mensagem de confirmação no WhatsApp?',
                                  content: '',
                                  contentColor: theme.color.danger,
                                }}
                                actionButtonClick={() => {
                                  requestResendPhoneConfirmation({
                                    buildingNotificationConfigurationId: notificationRow.id,
                                    link: phoneConfirmUrl,
                                  });
                                }}
                              />
                            ))}
                        </Style.TableDataWrapper>
                      ),
                      cssProps: { width: '10%' },
                    },
                    {
                      cell: (
                        <input
                          disabled={showContactLoading}
                          type="checkbox"
                          checked={notificationRow.showContact}
                          onChange={() => {
                            changeShowContactStatus({
                              showContact: !notificationRow.showContact,
                              buildingNotificationConfigurationId: notificationRow.id,
                              setShowContactLoading,
                            });

                            const prevBuilding = structuredClone(building);

                            prevBuilding.NotificationsConfigurations[i].showContact =
                              !building.NotificationsConfigurations[i].showContact;

                            setBuilding(prevBuilding);
                          }}
                        />
                      ),
                      cssProps: {
                        width: '10%',
                        textAlign: 'center',
                      },
                    },
                    {
                      cell: (
                        <Style.ButtonWrapper>
                          {notificationRow.isMain && (
                            <Style.MainContactTag title="Apenas o contato principal receberá notificações por WhatsApp.">
                              <p className="p5">Contato principal</p>
                            </Style.MainContactTag>
                          )}
                          <IconButton
                            size="16px"
                            icon={icon.edit}
                            label="Editar"
                            onClick={() => {
                              setSelectedNotificationRow(notificationRow);
                              setModalEditNotificationConfigurationOpen(true);
                            }}
                          />
                        </Style.ButtonWrapper>
                      ),
                      cssProps: {
                        width: '10%',
                        borderBottomRightRadius:
                          i + 1 === building?.NotificationsConfigurations.length
                            ? theme.size.xxsm
                            : 0,
                      },
                    },
                  ]}
                />
              ))}
            </NotificationTable>
          ) : (
            <Style.NoDataContainer>
              <h5>Nenhum dado cadastrado.</h5>
            </Style.NoDataContainer>
          )}
        </Style.Card>

        <Style.CardGrid>
          <Style.AnnexCard>
            <Style.AnnexCardTitle>
              <Style.AnnexCardHeader>
                <h5>Anexos</h5>
                <Style.BreadcrumbWrapper>
                  {breadcrumb.map((element, i) => (
                    <React.Fragment key={element.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setFolderId(element.id);
                        }}
                      >
                        {element.name}
                      </button>

                      {i === 0 && breadcrumb.length > 1 && <p className="p3">/</p>}

                      {i > 0 && breadcrumb.length > 1 && i + 1 !== breadcrumb.length && (
                        <p className="p3">{'>'}</p>
                      )}
                    </React.Fragment>
                  ))}
                </Style.BreadcrumbWrapper>
              </Style.AnnexCardHeader>

              <Style.AnnexCardButtons>
                <IconButton
                  icon={icon.plusWithBg}
                  label="Pasta"
                  size="24px"
                  hideLabelOnMedia
                  onClick={() => {
                    setModalCreateFolderOpen(true);
                  }}
                />

                <IconButton
                  icon={icon.addFileV2}
                  label="Arquivos"
                  size="24px"
                  hideLabelOnMedia
                  onClick={() => {
                    setModalAddFilesOpen(true);
                  }}
                />
              </Style.AnnexCardButtons>
            </Style.AnnexCardTitle>
            {building &&
            (building?.Folders?.Files?.length > 0 || building?.Folders?.Folders?.length > 0) ? (
              <Style.TagWrapper>
                {building?.Folders?.Folders?.map((element) => (
                  <FolderComponent
                    key={element.id}
                    name={element.name}
                    onFolderClick={() => {
                      setFolderId(element.id);
                    }}
                    onEditClick={() => {
                      setFolderToEdit(element);
                      setModalEditFolderOpen(true);
                    }}
                    onDeleteClick={() => {
                      requestDeleteFolder({ folderId: element.id, setBuilding });
                    }}
                  />
                ))}
                {building?.Folders?.Files?.map((element) => (
                  <FileComponent
                    key={element.id}
                    name={element.name}
                    url={element.url}
                    onEditClick={() => {
                      setFileToEdit(element);
                      setModalEditFileOpen(true);
                    }}
                    onDeleteClick={() => {
                      requestDeleteFile({
                        folderId: element.id,
                        setBuilding,
                      });
                    }}
                  />
                ))}
              </Style.TagWrapper>
            ) : (
              <Style.NoAnnexes className="bottom">
                <h5>Nenhum anexo cadastrado.</h5>
              </Style.NoAnnexes>
            )}
          </Style.AnnexCard>

          <Style.AnnexCard>
            <Style.CardHeader>
              <h5>Banners</h5>
              <IconButton
                icon={building && building?.Banners.length > 0 ? icon.editWithBg : icon.plusWithBg}
                label={building && building?.Banners.length > 0 ? 'Editar' : 'Cadastrar'}
                size="24px"
                hideLabelOnMedia
                onClick={() => {
                  setModalManageBannersOpen(true);
                }}
              />
            </Style.CardHeader>
            {building && building?.Banners.length > 0 ? (
              <Style.BannerWrapper>
                {building.Banners.map((element, i: number) => (
                  <ImagePreview
                    // eslint-disable-next-line react/no-array-index-key
                    key={element.url + i}
                    width="200px"
                    height="200px"
                    downloadUrl={element.url}
                    src={element.url}
                    imageCustomName={`${element.bannerName} ${element.type}`}
                    imageOriginalName={element.originalName}
                  />
                ))}
              </Style.BannerWrapper>
            ) : (
              <Style.NoBanners className="bottom">
                <h5>Nenhum banner cadastrado.</h5>
              </Style.NoBanners>
            )}
          </Style.AnnexCard>
        </Style.CardGrid>
      </Style.CardWrapper>
    </>
  );
};
