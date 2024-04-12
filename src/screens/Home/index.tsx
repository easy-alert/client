/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// FUNCTIONS
import { requestBuildingAccess, requestHomeInformations } from './functions';

// TYPES
import { IInformations } from './types';
import { ModalCreateTicket } from '../Tickets/ModalCreateTicket';

export const Home = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';
  const [modalCreateTicketOpen, setModalCreateTicketOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({
    Banners: [],
    name: '',
    Company: {
      supportLink: '',
    },
  });

  useEffect(() => {
    requestHomeInformations({
      buildingNanoId,
      setLoading,
      setInformations,
    });

    if (!syndicNanoId) requestBuildingAccess(buildingNanoId);
  }, []);
  return (
    <>
      {modalCreateTicketOpen && (
        <ModalCreateTicket
          setModal={setModalCreateTicketOpen}
          buildingNanoId={buildingNanoId}
          buildingName={informations.name}
        />
      )}
      <Style.Container>
        <Style.Wrapper>
          {loading ? <Skeleton height="24px" width="248px" /> : <h2>{informations.name}</h2>}
          {informations.Banners.map(
            (banner) =>
              banner.type === 'Web' && (
                <Style.WebBanner
                  redirectUrl={banner.redirectUrl}
                  key={banner.id}
                  src={banner.url}
                  alt="Web banner"
                  onClick={() => {
                    if (banner.redirectUrl) {
                      window.open(banner.redirectUrl, '_blank');
                    }
                  }}
                />
              ),
          )}

          {informations.Banners.map(
            (banner) =>
              banner.type === 'Mobile' && (
                <Style.MobileBanner
                  key={banner.id}
                  src={banner.url}
                  alt="Mobile banner"
                  onClick={() => {
                    if (banner.redirectUrl) {
                      window.open(banner.redirectUrl, '_blank');
                    }
                  }}
                />
              ),
          )}

          <Style.ButtonGrid>
            <Link to={`/maintenancesplan/${buildingNanoId}${window.location.search}`}>
              <button type="button">Plano de manutenção</button>
            </Link>

            <Link to={`/informations/${buildingNanoId}${window.location.search}`}>
              <button type="button">Informações</button>
            </Link>

            <Link to={`/annex/${buildingNanoId}${window.location.search}`}>
              <button type="button">Anexos</button>
            </Link>

            <button
              type="button"
              onClick={() => {
                setModalCreateTicketOpen(true);
              }}
            >
              Abrir chamado
            </button>
          </Style.ButtonGrid>
        </Style.Wrapper>
        <Style.ImageDiv>
          <img
            src={icon.logoTextBlack}
            alt=""
            onClick={() => {
              window.open('https://easyalert.com.br/', '_blank');
            }}
          />
        </Style.ImageDiv>
      </Style.Container>
    </>
  );
};
