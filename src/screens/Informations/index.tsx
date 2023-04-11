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
import { theme } from '../../styles/theme';

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
                { label: 'E-mail' },
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
                { label: 'E-mail' },
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

          {!loading && informations.NotificationsConfigurations.length === 0 && (
            <h6 style={{ color: theme.color.gray4 }}>Nenhum responsável cadastrado.</h6>
          )}
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
