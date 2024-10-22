// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useParams, useSearchParams } from 'react-router-dom';

// SERVICES
import { Api } from '@services/api';

// GLOBAL COMPONENTS
import { InProgressTag } from '@components/InProgressTag';
import { EventTag } from '@components/EventTag';

// UTILS
import { dateFormatter, applyMask, catchHandler } from '@utils/functions';

// COMPONENTS
import { ModalMaintenanceDetails } from '../../../MaintenancesPlan/ModalMaintenanceDetails';
import { ModalSendMaintenanceReport } from '../../../SyndicArea/ModalSendMaintenanceReport';
import { ReportDataTable, ReportDataTableContent } from '../ReportDataTable';

// STYLES
import * as Style from './styles';

// TYPES
import type { IMaintenanceReportData } from './types';

export const SupplierMaintenanceHistory = () => {
  const { supplierId } = useParams() as { supplierId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [modalMaintenanceDetails, setModalMaintenanceDetails] = useState<boolean>(false);

  const [maintenanceHistoryId, setMaintenanceHistoryId] = useState<string>('');
  const [modalSendMaintenanceReportOpen, setModalSendMaintenanceReportOpen] =
    useState<boolean>(false);

  const [maintenances, setMaintenances] = useState<IMaintenanceReportData[]>([]);

  const getMaintenanceHistory = async () => {
    await Api.get(`/suppliers/${supplierId}/maintenance-history`)
      .then((res) => {
        setMaintenances(res.data.maintenances);
      })
      .catch((err) => {
        catchHandler(err);
      });
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
          setModal={setModalSendMaintenanceReportOpen}
          modalAdditionalInformations={{
            expectedDueDate: '',
            expectedNotificationDate: '',
            id: maintenanceHistoryId,
            isFuture: false,
          }}
          syndicNanoId={syndicNanoId}
          filter={{ categoryId: '', months: '', status: '', years: '' }}
          setBuildingName={() => {
            //
          }}
          setFilterOptions={() => {
            //
          }}
          setKanban={() => {
            //
          }}
          setLoading={() => {
            //
          }}
        />
      )}

      {maintenances.length > 0 && (
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
            {maintenances?.map((maintenance) => (
              <ReportDataTableContent
                key={maintenance.id}
                colsBody={[
                  {
                    cell: (
                      <Style.TagContainer>
                        {maintenance.status === 'overdue' && <EventTag status="completed" />}
                        <EventTag status={maintenance.status} />
                        {maintenance.type === 'occasional' ? (
                          <EventTag status="occasional" />
                        ) : (
                          <EventTag status="common" />
                        )}
                        {(maintenance.status === 'expired' || maintenance.status === 'pending') &&
                          maintenance.inProgress && <InProgressTag />}
                      </Style.TagContainer>
                    ),
                  },

                  { cell: maintenance.buildingName },
                  { cell: maintenance.categoryName },
                  { cell: maintenance.element },
                  { cell: maintenance.activity },
                  { cell: maintenance.responsible ?? 'Sem responsável cadastrado' },
                  { cell: dateFormatter(maintenance.notificationDate) },
                  {
                    cell: maintenance.type === 'common' ? dateFormatter(maintenance.dueDate) : '-',
                  },
                  {
                    cell:
                      maintenance.cost !== null
                        ? applyMask({ mask: 'BRL', value: String(maintenance.cost) }).value
                        : '-',
                  },
                ]}
                onClick={() => {
                  setMaintenanceHistoryId(maintenance.maintenanceHistoryId);

                  if (
                    (maintenance.status === 'completed' ||
                      maintenance.status === 'overdue' ||
                      maintenance.isFuture) &&
                    maintenance.id
                  ) {
                    setModalMaintenanceDetails(true);
                  } else if (!maintenance.isFuture && maintenance.id) {
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
