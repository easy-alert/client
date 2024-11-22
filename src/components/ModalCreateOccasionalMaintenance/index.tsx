// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useParams } from 'react-router-dom';

// SERVICES
import { getCategoriesByBuildingNanoId } from '@services/apis/getCategoriesByBuildingNanoId';
import { createOccasionalMaintenance } from '@services/apis/createOccasionalMaintenance';
import { getPriority } from '@services/apis/getPriority';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// GLOBAL TYPES
import type { ICategory } from '@customTypes/ICategory';
import type { IPriority } from '@customTypes/IPriority';

// COMPONENTS
import ModalLoading from './ModalCreateOccasionalMaintenanceViews/ModalLoading';
import ModalFirstView from './ModalCreateOccasionalMaintenanceViews/ModalFirstView';
import ModalSecondView from './ModalCreateOccasionalMaintenanceViews/ModalSecondView';
import ModalThirdView from './ModalCreateOccasionalMaintenanceViews/ModalThirdView';

// TYPES
import type {
  IOccasionalMaintenanceData,
  IModalCreateOccasionalMaintenance,
  IHandleSetOccasionalMaintenanceData,
  IHandleCreateOccasionalMaintenance,
} from './types';

export const ModalCreateOccasionalMaintenance = ({
  syndicNanoId = '',
  checklistActivity,
  ticketsIds,
  handleGetBackgroundData,
  handleMaintenanceHistoryIdChange,
  handleResetTickets,
  handleModalCreateOccasionalMaintenance,
  handleModalMaintenanceDetails,
  handleModalSendMaintenanceReport,
}: IModalCreateOccasionalMaintenance) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [occasionalMaintenanceData, setOccasionalMaintenanceData] =
    useState<IOccasionalMaintenanceData>({
      buildingId: buildingNanoId,

      element: '',
      activity: checklistActivity || '',
      responsible: '',
      executionDate: '',
      inProgress: false,
      priorityName: '',

      categoryData: {
        id: '',
        name: '',
      },

      reportData: {
        cost: 'R$ 0,00',
        observation: '',
        files: [],
        images: [],
      },
    });

  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const [priorityData, setPriorityData] = useState<IPriority[]>([]);

  const [view, setView] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSetView = (viewSate: number) => {
    setView(viewSate);
  };

  const handleOccasionalMaintenanceDataChange = ({
    primaryKey,
    value,
    secondaryKey,
  }: IHandleSetOccasionalMaintenanceData) => {
    if (secondaryKey) {
      setOccasionalMaintenanceData((prevState) => {
        const primaryData =
          typeof prevState[primaryKey] === 'object' && prevState[primaryKey] !== null
            ? prevState[primaryKey]
            : {};

        return {
          ...prevState,
          [primaryKey]: {
            ...primaryData,
            [secondaryKey]: value,
          },
        };
      });

      return;
    }

    setOccasionalMaintenanceData((prevState) => ({
      ...prevState,
      [primaryKey]: value,
    }));
  };

  const handleGetCategoriesByBuildingNanoId = async () => {
    setLoading(true);

    const categories = await getCategoriesByBuildingNanoId({ buildingNanoId });

    setCategoriesData(categories);
    setLoading(false);
  };

  const handleCreateOccasionalMaintenance = async ({
    occasionalMaintenanceType,
    inProgress = false,
  }: IHandleCreateOccasionalMaintenance) => {
    setLoading(true);

    const reportDataBody =
      occasionalMaintenanceType === 'finished'
        ? occasionalMaintenanceData.reportData
        : {
            cost: 'R$ 0,00',
            observation: '',
            files: [],
            images: [],
          };

    const occasionalMaintenanceBody = {
      ...occasionalMaintenanceData,
      reportData: reportDataBody,
      inProgress,
    };

    const response = await createOccasionalMaintenance({
      origin: 'Client',
      syndicNanoId,
      occasionalMaintenanceType,
      occasionalMaintenanceBody,
      ticketsIds,
    });

    if (response?.ServerMessage?.statusCode === 200) {
      if (!response?.maintenance?.id) return;

      if (handleMaintenanceHistoryIdChange) {
        handleMaintenanceHistoryIdChange(response.maintenance.id);
      }

      if (handleResetTickets) {
        handleResetTickets();
      }

      if (handleGetBackgroundData) {
        await handleGetBackgroundData();
      }

      setTimeout(() => {
        if (occasionalMaintenanceType === 'finished' && handleModalMaintenanceDetails) {
          handleModalMaintenanceDetails(true);
        } else if (occasionalMaintenanceType === 'pending' && handleModalSendMaintenanceReport) {
          handleModalSendMaintenanceReport(true);
        }

        handleModalCreateOccasionalMaintenance(false);
        setLoading(false);
      }, 1000);

      return;
    }

    setLoading(false);
  };

  const handleGetPriorityNames = async () => {
    try {
      const responseData = await getPriority();
      setPriorityData(responseData);
    } catch (error: any) {
      handleToastify(error.response.data.ServerMessage);
    }
  };

  useEffect(() => {
    handleGetPriorityNames();
    handleGetCategoriesByBuildingNanoId();
  }, []);

  return (
    <Modal title="Manutenção avulsa" setModal={handleModalCreateOccasionalMaintenance}>
      {loading ? (
        <ModalLoading />
      ) : (
        <>
          {view === 1 && <ModalFirstView handleSetView={handleSetView} />}

          {view === 2 && (
            <ModalSecondView
              categoriesData={categoriesData}
              priorityData={priorityData}
              occasionalMaintenanceData={occasionalMaintenanceData}
              checklistActivity={checklistActivity}
              handleSetView={handleSetView}
              handleOccasionalMaintenanceDataChange={handleOccasionalMaintenanceDataChange}
              handleCreateOccasionalMaintenance={handleCreateOccasionalMaintenance}
            />
          )}

          {view === 3 && (
            <ModalThirdView
              occasionalMaintenanceData={occasionalMaintenanceData}
              handleOccasionalMaintenanceDataChange={handleOccasionalMaintenanceDataChange}
              handleSetView={handleSetView}
              handleCreateOccasionalMaintenance={handleCreateOccasionalMaintenance}
            />
          )}
        </>
      )}
    </Modal>
  );
};
