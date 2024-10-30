// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useParams } from 'react-router-dom';

// SERVICES
import { getCategoriesByBuildingNanoId } from '@services/apis/getCategoriesByBuildingNanoId';
import { createOccasionalMaintenance } from '@services/apis/createOccasionalMaintenance';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';

// GLOBAL TYPES
import type { ICategory } from '@customTypes/ICategory';

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
  syndicNanoId,
  checklistTitle,
  handleGetSyndicKanban,
  handleMaintenanceHistoryIdChange,
  handleModalCreateOccasionalMaintenance,
  handleModalMaintenanceDetails,
  handleModalSendMaintenanceReport,
}: IModalCreateOccasionalMaintenance) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [occasionalMaintenanceData, setOccasionalMaintenanceData] =
    useState<IOccasionalMaintenanceData>({
      buildingId: buildingNanoId,

      element: '',
      activity: checklistTitle || '',
      responsible: '',
      executionDate: '',
      inProgress: false,

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
    });

    if (response?.ServerMessage?.statusCode === 200) {
      if (!response?.maintenance?.id) return;

      handleMaintenanceHistoryIdChange(response.maintenance.id);

      await handleGetSyndicKanban();

      if (occasionalMaintenanceType === 'finished') {
        handleModalMaintenanceDetails(true);
      } else {
        handleModalSendMaintenanceReport(true);
      }

      handleModalCreateOccasionalMaintenance(false);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
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
              occasionalMaintenanceData={occasionalMaintenanceData}
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
