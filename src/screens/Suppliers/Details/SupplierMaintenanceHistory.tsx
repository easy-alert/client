import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { InProgressTag } from '../../../components/InProgressTag';
import { dateFormatter, applyMask, catchHandler } from '../../../utils/functions';
import { Api } from '../../../services/api';
import { EventTag } from '../../../components/EventTag';
import { ModalMaintenanceDetails } from '../../MaintenancesPlan/ModalMaintenanceDetails';
import { ModalSendMaintenanceReport } from '../../SyndicArea/ModalSendMaintenanceReport';
import { theme } from '../../../styles/theme';
import { ReportDataTable, ReportDataTableContent } from './ReportDataTable';

interface IMaintenanceReportData {
  id: string;
  activity: string;
  buildingName: string;
  categoryName: string;
  cost: number | null;
  element: string;
  source: string;
  maintenanceHistoryId: string;
  notificationDate: string;
  resolutionDate: string | null;
  dueDate: string;
  responsible: string | null;
  status: 'completed' | 'expired' | 'pending' | 'overdue';
  type: 'common' | 'occasional' | null;
  inProgress: boolean;
  maintenanceObservation: string | null;
  reportObservation: string | null;
  expectedDueDate?: string;
  expectedNotificationDate?: string;
  isFuture?: boolean;

  images: {
    url: string;
  }[];

  annexes: {
    url: string;
    name: string;
  }[];
}

const TagContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  gap: ${theme.size.xxsm};
  flex-direction: column;
`;

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
                      <TagContainer>
                        {maintenance.status === 'overdue' && <EventTag status="completed" />}
                        <EventTag status={maintenance.status} />
                        {maintenance.type === 'occasional' ? (
                          <EventTag status="occasional" />
                        ) : (
                          <EventTag status="common" />
                        )}
                        {(maintenance.status === 'expired' || maintenance.status === 'pending') &&
                          maintenance.inProgress && <InProgressTag />}
                      </TagContainer>
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
