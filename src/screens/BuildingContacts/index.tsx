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
import type { IUserBuildingsPermission } from '@customTypes/IUserBuildingsPermission';

// COMPONENTS
import { ContactTable, ContactTableContent } from './ContactTable';

// STYLES
import * as Style from './styles';

interface IBuildingInformation {
  name: string;
  UserBuildingsPermissions: IUserBuildingsPermission[];
}

export const BuildingContacts = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [buildingInformation, setBuildingInformation] = useState<IBuildingInformation>({
    name: '',
    UserBuildingsPermissions: [],
  });

  const handleGetBuildingContacts = async () => {
    setLoading(true);

    try {
      const responseData = await getBuildingContacts({ buildingId });

      setBuildingInformation(responseData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBuildingContacts();
  }, [buildingId]);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{buildingInformation?.name}</h2>}

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

          {!loading && buildingInformation?.UserBuildingsPermissions?.length > 0 && (
            <ContactTable
              colsHeader={[
                { label: 'Nome' },
                { label: 'E-mail' },
                { label: 'Função' },
                { label: 'WhatsApp' },
              ]}
            >
              {buildingInformation?.UserBuildingsPermissions?.map(({ User }) => (
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
            buildingInformation?.UserBuildingsPermissions?.length > 0 &&
            buildingInformation?.UserBuildingsPermissions?.map(({ User }) => (
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

          {!loading && buildingInformation?.UserBuildingsPermissions?.length === 0 && (
            <h6 style={{ color: theme.color.gray4 }}>Nenhum colaborador cadastrado.</h6>
          )}
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
