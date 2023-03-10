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

export const Informations = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({
    mainContact: { contactNumber: '', email: '', name: '', role: '' },
    buildingName: '',
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
      {loading ? <Skeleton height="24px" width="248px" /> : <h2>{informations.buildingName}</h2>}

      <Style.Card>
        <h4>Dados do responsável</h4>
        <Style.RowWrapper>
          {informations.mainContact ? (
            <>
              <Style.Row>
                <h6>Nome</h6>
                {loading ? (
                  <Skeleton height="14px" width="180px" />
                ) : (
                  <p className="p4">{informations.mainContact.name}</p>
                )}
              </Style.Row>
              <Style.Line />
              <Style.Row>
                <h6>E-mail</h6>
                {loading ? (
                  <Skeleton height="14px" width="200px" />
                ) : (
                  <p className="p4">{informations.mainContact.email ?? '-'}</p>
                )}
              </Style.Row>
              <Style.Line />

              <Style.Row>
                <h6>WhatsApp</h6>
                {loading ? (
                  <Skeleton height="14px" width="100px" />
                ) : (
                  <p className="p4">
                    {informations.mainContact.contactNumber
                      ? applyMask({ mask: 'TEL', value: informations.mainContact.contactNumber })
                          .value
                      : '-'}
                  </p>
                )}
              </Style.Row>

              <Style.Line />
              <Style.Row>
                <h6>Função</h6>
                {loading ? (
                  <Skeleton height="14px" width="120px" />
                ) : (
                  <p className="p4">{informations.mainContact.role}</p>
                )}
              </Style.Row>
            </>
          ) : (
            <p className="p1" style={{ opacity: 0.7 }}>
              Responsável não cadastrado.
            </p>
          )}
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
