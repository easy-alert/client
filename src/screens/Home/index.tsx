/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Skeleton } from '../../components/Skeleton';
import 'swiper/css';
import 'swiper/css/pagination';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// FUNCTIONS
import { requestBuildingAccess, requestHomeInformations } from './functions';

// TYPES
import { IInformations } from './types';
import { ModalCreateTicket } from '../Tickets/ModalCreateTicket';
import { ImageComponent } from '../../components/ImageComponent';

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
      canAccessTickets: false,
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

          {informations.Banners.length > 0 && (
            <Style.Carrousel>
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }} // Autoplay ativado com delay de 3 segundos
                pagination // Bolinhas de navegação
                modules={[Navigation, Pagination, Autoplay]} // Módulos necessários
              >
                {informations.Banners.map((banner) => (
                  <SwiperSlide key={banner.id}>
                    <a href={banner.redirectUrl} target="_blank" rel="noopener noreferrer">
                      <ImageComponent src={banner.url} />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Style.Carrousel>
          )}

          <Style.ButtonGrid canAccessTickets={informations.Company.canAccessTickets}>
            <Link to={`/maintenancesplan/${buildingNanoId}${window.location.search}`}>
              <button type="button">Plano de manutenção</button>
            </Link>

            <Link to={`/informations/${buildingNanoId}${window.location.search}`}>
              <button type="button">Colaboradores</button>
            </Link>

            <Link to={`/annex/${buildingNanoId}${window.location.search}`}>
              <button type="button">Documentos</button>
            </Link>

            {informations.Company.canAccessTickets && (
              <button
                type="button"
                onClick={() => {
                  setModalCreateTicketOpen(true);
                }}
              >
                Abrir chamado
              </button>
            )}
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
