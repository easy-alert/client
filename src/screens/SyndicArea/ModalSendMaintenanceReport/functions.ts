import { toast } from 'react-toastify';
import { Api } from '../../../services/api';
import { applyMask, catchHandler, unMaskBRL } from '../../../utils/functions';
import { requestSyndicKanban } from '../functions';
import {
  IRequestReportProgress,
  IRequestSaveReportProgress,
  IRequestSendReport,
  IRequestToggleInProgress,
} from './types';

export const requestSendReport = async ({
  maintenanceReport,
  setModal,
  maintenanceHistoryId,
  files,
  images,
  setOnQuery,
  filter,
  setBuildingName,
  setFilterOptions,
  setKanban,
  setLoading,
  syndicNanoId,
}: IRequestSendReport) => {
  setOnQuery(true);

  await Api.post('/maintenances/create/report', {
    origin: 'Client',
    maintenanceHistoryId,
    cost: Number(unMaskBRL(maintenanceReport.cost)),
    observation: maintenanceReport.observation !== '' ? maintenanceReport.observation : null,
    ReportAnnexes: files,
    ReportImages: images,
    responsibleSyndicId: syndicNanoId,
  })
    .then((res) => {
      toast.success(res.data.ServerMessage.message);
      requestSyndicKanban({
        setLoading,
        syndicNanoId,
        setFilterOptions,
        filter,
        setOnQuery,
        setKanban,
        setBuildingName,
      });
      setModal(false);
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setOnQuery(false);
    });
};

export const requestToggleInProgress = async ({
  setModal,
  maintenanceHistoryId,
  setOnQuery,
  filter,
  setBuildingName,
  setFilterOptions,
  setKanban,
  setLoading,
  syndicNanoId,
  inProgressChange,
}: IRequestToggleInProgress) => {
  setOnQuery(true);

  await Api.post(`/maintenances/set/in-progress?syndicNanoId=${syndicNanoId}`, {
    maintenanceHistoryId,
    inProgressChange,
  })
    .then((res) => {
      toast.success(res.data.ServerMessage.message);
      requestSyndicKanban({
        setLoading,
        syndicNanoId,
        setFilterOptions,
        filter,
        setOnQuery,
        setKanban,
        setBuildingName,
      });
      setModal(false);
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setOnQuery(false);
    });
};

export const requestReportProgress = async ({
  maintenanceHistoryId,
  setFiles,
  setImages,
  setMaintenanceReport,
}: IRequestReportProgress) => {
  await Api.get(`/maintenances/list/report/progress/${maintenanceHistoryId}`)
    .then((res) => {
      if (res.data.progress) {
        setMaintenanceReport({
          cost: applyMask({ mask: 'BRL', value: String(res.data.progress.cost) }).value,
          observation: res.data.progress.observation || '',
        });
        setFiles(res.data.progress.ReportAnnexesProgress);
        setImages(res.data.progress.ReportImagesProgress);
      }
    })
    .catch((err) => {
      catchHandler(err);
    });
};

export const requestSaveReportProgress = async ({
  maintenanceReport,
  setModal,
  maintenanceHistoryId,
  files,
  images,
  setOnQuery,
  filter,
  setBuildingName,
  setFilterOptions,
  setKanban,
  setLoading,
  syndicNanoId,
}: IRequestSaveReportProgress) => {
  setOnQuery(true);

  await Api.post(`/maintenances/create/report/progress?syndicNanoId=${syndicNanoId}`, {
    maintenanceHistoryId,
    cost: Number(unMaskBRL(maintenanceReport.cost)),
    observation: maintenanceReport.observation !== '' ? maintenanceReport.observation : null,
    ReportAnnexes: files,
    ReportImages: images,
  })
    .then((res) => {
      toast.success(res.data.ServerMessage.message);
      requestSyndicKanban({
        setLoading,
        syndicNanoId,
        setFilterOptions,
        filter,
        setOnQuery,
        setKanban,
        setBuildingName,
      });
      setModal(false);
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setOnQuery(false);
    });
};
