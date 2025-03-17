// REACT
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// SERVICES
import { getBuildingContacts } from '@services/apis/getBuildingContacts';

// GLOBAL COMPONENTS
import { Skeleton } from '@components/Skeleton';

// GLOBAL FUNCTIONS
import { applyMask } from '@utils/functions';

// GLOBAL THEME
import { theme } from '@styles/theme';

// GLOBAL TYPES
import type { IUser } from '@customTypes/IUser';

// COMPONENTS
import { ContactTable, ContactTableContent } from './ContactTable';

// STYLES
import * as Style from './styles';

interface IBuildingContacts {
  User: IUser;
}

export const BuildingContacts = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [buildingName, setBuildingName] = useState<string>('');
  const [buildingContacts, setBuildingContacts] = useState<IBuildingContacts[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleGetBuildingContacts = async () => {
    setLoading(true);

    try {
      const responseData = await getBuildingContacts({ buildingId });

      setBuildingContacts(responseData?.buildingContacts);
      setBuildingName(responseData?.buildingName);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBuildingContacts();
  }, [buildingId]);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{buildingName}</h2>}

      <Style.Card>
        <h4>Dados dos colaboradores</h4>

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

          {!loading && buildingContacts.length > 0 && (
            <ContactTable
              colsHeader={[
                { label: 'Nome' },
                { label: 'E-mail' },
                { label: 'Função' },
                { label: 'WhatsApp' },
              ]}
            >
              {buildingContacts.map(({ User }) => (
                <ContactTableContent
                  key={User?.id}
                  colsBody={[
                    { cell: User?.name },
                    { cell: User?.email ?? '-' },
                    { cell: User?.role },
                    {
                      cell: User?.phoneNumber
                        ? applyMask({ mask: 'TEL', value: User?.phoneNumber }).value
                        : '-',
                    },
                  ]}
                />
              ))}
            </ContactTable>
          )}

          {!loading &&
            buildingContacts.length > 0 &&
            buildingContacts.map(({ User }) => (
              <Style.MediaWrapper key={User?.id}>
                <Style.MediaCard>
                  <Style.MediaCardRow>
                    <h6>{User?.name}</h6>
                    <p className="p3">{User?.role}</p>
                  </Style.MediaCardRow>

                  <Style.MediaCardRow>
                    <p className="p2">{User?.email || '-'}</p>
                    <p className="p2">
                      {User?.phoneNumber
                        ? applyMask({ mask: 'TEL', value: User?.phoneNumber }).value
                        : '-'}
                    </p>
                  </Style.MediaCardRow>
                </Style.MediaCard>
                <Style.Line />
              </Style.MediaWrapper>
            ))}

          {!loading && buildingContacts.length === 0 && (
            <h6 style={{ color: theme.color.gray4 }}>Nenhum colaborador cadastrado.</h6>
          )}
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
