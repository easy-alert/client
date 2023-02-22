/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '../../components/Image';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// FUNCTIONS
import { requestMainContactInformations } from './functions';

// TYPES
import { IInformations } from './types';
import { applyMask } from '../../utils/functions';

export const Informations = () => {
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
      <h2>{informations.buildingName}</h2>

      <Style.Card>
        <h2>Dados do responsável</h2>
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
              <Style.Line />
            </>
          ) : (
            <p className="p1" style={{ opacity: 0.7 }}>
              Responsável não cadastrado.
            </p>
          )}

          <Style.Row>
            <h6>Anexos</h6>
            {loading ? (
              <Style.AnnexesRow>
                <Skeleton height="24px" width="100px" />
                <Skeleton height="24px" width="100px" />
                <Skeleton height="24px" width="100px" />
                <Skeleton height="24px" width="100px" />
              </Style.AnnexesRow>
            ) : informations.annexes.length > 0 ? (
              <Style.AnnexesRow>
                {informations.annexes.map((annex) => (
                  <Style.Tag key={annex.url}>
                    <a
                      title={annex.originalName}
                      href={annex.url}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="p3">{annex.name}</p>
                      <Image size="16px" img={icon.download} />
                    </a>
                  </Style.Tag>
                ))}
              </Style.AnnexesRow>
            ) : (
              <p className="p4" style={{ opacity: 0.7 }}>
                Nenhum anexo cadastrado.
              </p>
            )}
          </Style.Row>
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
