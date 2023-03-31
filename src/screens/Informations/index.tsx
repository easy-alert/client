/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';

// FUNCTIONS
import { requestMainContactInformations } from './functions';
import { applyMask } from '../../utils/functions';

// TYPES
import { IInformations } from './types';
import { ContactTable, ContactTableContent } from './ContactTable';

export const Informations = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({
    NotificationsConfigurations: [],
    name: '',
  });

  useEffect(() => {
    requestMainContactInformations({
      buildingNanoId,
      setLoading,
      setInformations,
    });
  }, []);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{informations.name}</h2>}

      <Style.Card>
        <h4>Dados dos responsáveis</h4>
        <Style.RowWrapper>
          {loading && (
            <ContactTable
              colsHeader={[
                { label: 'Nome' },
                { label: 'Email' },
                { label: 'Função' },
                { label: 'WhatsApp' },
              ]}
            >
              {Array.from(Array(3).keys()).map((e) => (
                <ContactTableContent
                  key={e}
                  colsBody={[
                    { cell: <Skeleton height="16px" /> },
                    { cell: <Skeleton height="16px" /> },
                    { cell: <Skeleton height="16px" /> },
                    { cell: <Skeleton height="16px" /> },
                  ]}
                />
              ))}
            </ContactTable>
          )}

          {!loading && informations.NotificationsConfigurations.length > 0 && (
            <ContactTable
              colsHeader={[
                { label: 'Nome' },
                { label: 'Email' },
                { label: 'Função' },
                { label: 'WhatsApp' },
              ]}
            >
              {informations.NotificationsConfigurations.map((info) => (
                <ContactTableContent
                  key={info.id}
                  colsBody={[
                    { cell: info.name },
                    { cell: info.email ?? '-' },
                    { cell: info.role },
                    {
                      cell: info.contactNumber
                        ? applyMask({ mask: 'TEL', value: info.contactNumber }).value
                        : '-',
                    },
                  ]}
                />
              ))}
            </ContactTable>
          )}

          {!loading && informations.NotificationsConfigurations.length < 0 && (
            <p className="p1" style={{ opacity: 0.7 }}>
              Nenhum responsável cadastrado.
            </p>
          )}
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
