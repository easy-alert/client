/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';

// FUNCTIONS
import { requestMainContactInformations } from './functions';

// TYPES
import { IInformations } from './types';

export const Home = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({
    annexes: [],
    mainContact: { contactNumber: '', email: '', name: '', role: '' },
    buildingName: '',
  });

  useEffect(() => {
    requestMainContactInformations({
      buildingId,
      setLoading,
      setInformations,
    });
  }, []);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{informations.buildingName}</h2>}

      <Style.Card>oi</Style.Card>
    </Style.Container>
  );
};
