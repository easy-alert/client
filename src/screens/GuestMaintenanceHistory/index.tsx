import { useParams } from 'react-router-dom';
import { ModalGuestSendMaintenanceReport } from './ModalGuestSendMaintenanceReport';

export const GuestMaintenanceHistory = () => {
  const { maintenanceHistoryId } = useParams() as { maintenanceHistoryId: string };

  return (
    <ModalGuestSendMaintenanceReport
      modalAdditionalInformations={{
        id: maintenanceHistoryId,
        expectedNotificationDate: '',
        expectedDueDate: '',
        isFuture: false,
      }}
      filter={{ categoryId: '', months: '', status: '', years: '' }}
      setBuildingName={() => ''}
      setFilterOptions={() => ''}
      setKanban={() => ''}
      setLoading={() => ''}
      setModal={() => ''}
      syndicNanoId=""
    />
  );
};
