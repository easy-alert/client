/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';
import { ImagePreview } from '../../components/ImagePreview';

// STYLES
import * as Style from './styles';

// FUNCTIONS
import { checkFileType, requestAnnexInformations } from './functions';

// TYPES
import { IInformations } from './types';

export const Annexes = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({ Annexes: [], name: '' });

  useEffect(() => {
    requestAnnexInformations({
      buildingNanoId,
      setLoading,
      setInformations,
    });
  }, []);

  return (
    <Style.Container>
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{informations.name}</h2>}
      <Style.Card>
        <h4>Anexos</h4>

        {loading && (
          <Style.CardRow>
            <Skeleton height="198px" width="198px" />
            <Skeleton height="198px" width="198px" />
            <Skeleton height="198px" width="198px" />
            <Skeleton height="198px" width="198px" />
            <Skeleton height="198px" width="198px" />
            <Skeleton height="198px" width="198px" />
          </Style.CardRow>
        )}

        {!loading && informations.Annexes?.length > 0 && (
          <Style.CardRow>
            {informations.Annexes.map((annex) => (
              <ImagePreview
                key={annex.url}
                height="198px"
                width="198px"
                src={checkFileType(annex)}
                imageCustomName={annex.name}
                imageOriginalName={annex.originalName}
                downloadUrl={annex.url}
              />
            ))}
          </Style.CardRow>
        )}

        {!loading && informations.Annexes.length === 0 && <h6>Nenhum anexo cadastrado.</h6>}
      </Style.Card>
    </Style.Container>
  );
};
