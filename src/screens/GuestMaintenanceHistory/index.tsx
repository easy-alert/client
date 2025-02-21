import { useParams } from 'react-router-dom';
import { ModalGuestSendMaintenanceReport } from './ModalGuestSendMaintenanceReport';

export const GuestMaintenanceHistory = () => {
  const { maintenanceHistoryId } = useParams() as { maintenanceHistoryId: string };

  return (
    <ModalGuestSendMaintenanceReport
      maintenanceHistoryId={maintenanceHistoryId}
      userId=""
      syndicNanoId=""
      handleModals={() => ''}
      handleRefresh={() => ''}
    />
  );
};
