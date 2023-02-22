import { toast } from 'react-toastify';
import { Api } from '../../../services/api';
import { catchHandler, unMaskBRL } from '../../../utils/functions';
import { requestSyndicKanban } from '../functions';
import { IRequestSendReport } from './types';

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
  syndicId,
}: IRequestSendReport) => {
  setOnQuery(true);

  await Api.post('/maintenances/create/report', {
    maintenanceHistoryId,
    cost: Number(unMaskBRL(maintenanceReport.cost)),
    observation: maintenanceReport.observation !== '' ? maintenanceReport.observation : null,
    ReportAnnexes: files,
    ReportImages: images,
    responsibleSyndicId: syndicId,
  })
    .then((res) => {
      toast.success(res.data.ServerMessage.message);
      requestSyndicKanban({
        setLoading,
        syndicId,
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
