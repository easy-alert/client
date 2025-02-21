// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useSearchParams } from 'react-router-dom';

// GLOBAL COMPONENTS
import { InProgressTag } from '@components/InProgressTag';
import { EventTag } from '@components/EventTag';

// UTILS
import { dateFormatter, applyMask } from '@utils/functions';

// COMPONENTS
import { TModalNames } from '@screens/SyndicArea';
import { ModalMaintenanceDetails } from '../../../MaintenancesPlan/ModalMaintenanceDetails';
import { ModalSendMaintenanceReport } from '../../../SyndicArea/ModalSendMaintenanceReport';
import { ReportDataTable, ReportDataTableContent } from '../ReportDataTable';

// STYLES
import * as Style from './styles';

// TYPES
import type { ISupplierMaintenanceHistory } from './types';

export const SupplierMaintenanceHistory = ({
  maintenancesHistory,
  getMaintenanceHistory,
}: ISupplierMaintenanceHistory) => {
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [modalMaintenanceDetails, setModalMaintenanceDetails] = useState<boolean>(false);

  const [maintenanceHistoryId, setMaintenanceHistoryId] = useState<string>('');
  const [modalSendMaintenanceReportOpen, setModalSendMaintenanceReportOpen] =
    useState<boolean>(false);

  const handleModals = (modal: TModalNames, modalState: boolean) => {
    switch (modal) {
      case 'modalMaintenanceDetails':
        setModalMaintenanceDetails(modalState);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getMaintenanceHistory();
  }, [modalSendMaintenanceReportOpen]);

  return (
    <>
      {modalMaintenanceDetails && maintenanceHistoryId && (
        <ModalMaintenanceDetails
          setModal={setModalMaintenanceDetails}
          modalAdditionalInformations={{
            expectedDueDate: '',
            expectedNotificationDate: '',
            id: maintenanceHistoryId,
            isFuture: false,
          }}
        />
      )}

      {modalSendMaintenanceReportOpen && maintenanceHistoryId && (
        <ModalSendMaintenanceReport
          syndicNanoId={syndicNanoId}
          userId=""
          maintenanceHistoryId={maintenanceHistoryId}
          handleModals={handleModals}
          handleRefresh={() => ''}
        />
      )}

      {maintenancesHistory.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h2 style={{ marginBottom: '12px' }}>Histórico de manutenções</h2>
          <ReportDataTable
            colsHeader={[
              { label: 'Status' },
              { label: 'Edificação' },
              { label: 'Categoria' },
              { label: 'Elemento' },
              { label: 'Atividade' },
              { label: 'Responsável' },
              { label: 'Data de notificação' },
              { label: 'Data de vencimento' },
              { label: 'Valor' },
            ]}
          >
            {maintenancesHistory?.map((maintenanceHistory) => (
              <ReportDataTableContent
                key={maintenanceHistory.id}
                colsBody={[
                  {
                    cell: (
                      <Style.TagContainer>
                        {maintenanceHistory.status === 'overdue' && <EventTag status="completed" />}
                        <EventTag status={maintenanceHistory.status} />
                        {maintenanceHistory.type === 'occasional' ? (
                          <EventTag status="occasional" />
                        ) : (
                          <EventTag status="common" />
                        )}
                        {(maintenanceHistory.status === 'expired' ||
                          maintenanceHistory.status === 'pending') &&
                          maintenanceHistory.inProgress && <InProgressTag />}
                      </Style.TagContainer>
                    ),
                  },

                  { cell: maintenanceHistory.buildingName },
                  { cell: maintenanceHistory.categoryName },
                  { cell: maintenanceHistory.element },
                  { cell: maintenanceHistory.activity },
                  { cell: maintenanceHistory.responsible ?? 'Sem responsável cadastrado' },
                  { cell: dateFormatter(maintenanceHistory.notificationDate) },
                  {
                    cell:
                      maintenanceHistory.type === 'common'
                        ? dateFormatter(maintenanceHistory.dueDate)
                        : '-',
                  },
                  {
                    cell:
                      maintenanceHistory.cost !== null
                        ? applyMask({ mask: 'BRL', value: String(maintenanceHistory.cost) }).value
                        : '-',
                  },
                ]}
                onClick={() => {
                  setMaintenanceHistoryId(maintenanceHistory.maintenanceHistoryId);

                  if (
                    (maintenanceHistory.status === 'completed' ||
                      maintenanceHistory.status === 'overdue' ||
                      maintenanceHistory.isFuture) &&
                    maintenanceHistory.id
                  ) {
                    setModalMaintenanceDetails(true);
                  } else if (!maintenanceHistory.isFuture && maintenanceHistory.id) {
                    setModalSendMaintenanceReportOpen(true);
                  }
                }}
              />
            ))}
          </ReportDataTable>
        </div>
      )}
    </>
  );
};
