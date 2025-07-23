// REACT
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// LIBS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// SERVICES
import { getHomeInformation } from '@services/apis/getHomeInformation';

// GLOBAL COMPONENTS
import { Skeleton } from '@components/Skeleton';
import { ImageComponent } from '@components/ImageComponent';
import { ModalCreateTicket } from '@components/ModalCreateTicket';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// SCREENS
import { IsBlockedUser } from '@screens/IsBlockedUser';

// STYLES
import * as Style from './styles';

// TYPES
import type { IInformations } from './types';

import 'swiper/css';
import 'swiper/css/pagination';

export const Home = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [createTicketModal, setCreateTicketModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userBlocked, setUserBlocked] = useState(false);

  const [informations, setInformations] = useState<IInformations>({
    Banners: [],
    name: '',
    Company: {
      canAccessTickets: false,
      ticketInfo: '',
      ticketType: 'platform',
    },
  });

  const handleCreateTicketModal = (modalState: boolean) => {
    setCreateTicketModal(modalState);
  };

  const handleGetHomeInformation = async () => {
    setLoading(true);
    try {
      const responseData = await getHomeInformation({ buildingId });
      setInformations(responseData);
      if (responseData?.isBlocked || responseData?.Company?.isBlocked) {
        setUserBlocked(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetHomeInformation();
  }, []);

  if (userBlocked) {
    return <IsBlockedUser />;
  }

  return (
    <>
      {createTicketModal && (
        <ModalCreateTicket
          buildingId={buildingId}
          buildingName={informations.name}
          handleCreateTicketModal={handleCreateTicketModal}
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

          <Style.ButtonGrid>
            {buildingId !== '463544ab-d0a5-4c56-a312-515110f11019' && (
              <Link to={`/maintenance-plan/${buildingId}${window.location.search}`}>
                <button type="button">Plano de manutenção</button>
              </Link>
            )}

            <Link to={`/contacts/${buildingId}${window.location.search}`}>
              <button type="button">Colaboradores</button>
            </Link>

            <Link to={`/documents/${buildingId}${window.location.search}`}>
              <button type="button">Documentos</button>
            </Link>

            {informations.Company.ticketType === 'platform' &&
              informations.Company.canAccessTickets && (
                <button type="button" onClick={() => handleCreateTicketModal(true)}>
                  Abrir chamado
                </button>
              )}

            {informations.Company.ticketType === 'link' && informations.Company.ticketInfo && (
              <a target="_blank" rel="noopener noreferrer" href={informations.Company.ticketInfo}>
                Abrir chamado
              </a>
            )}

            {informations.Company.ticketType === 'whatsapp' && informations.Company.ticketInfo && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://api.whatsapp.com/send?phone=${informations.Company.ticketInfo}`}
              >
                Abrir chamado
              </a>
            )}

            {informations.Company.ticketType === 'email' && informations.Company.ticketInfo && (
              <a href={`mailto:${informations.Company.ticketInfo}`}>Abrir chamado</a>
            )}
          </Style.ButtonGrid>
        </Style.Wrapper>

        <Style.ImageDiv>
          <button
            type="button"
            onClick={() => {
              window.open('https://easyalert.com.br/', '_blank');
            }}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src={icon.logoTextBlack} alt="Easy Alert Logo" />
          </button>
        </Style.ImageDiv>
      </Style.Container>
    </>
  );
};
