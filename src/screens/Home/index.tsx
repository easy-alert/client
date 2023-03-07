/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
// COMPONENTS
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '../../components/Skeleton';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// FUNCTIONS
import { requestHomeInformations } from './functions';

// TYPES
import { IInformations } from './types';

export const Home = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [loading, setLoading] = useState<boolean>(true);

  const [informations, setInformations] = useState<IInformations>({ Banners: [], name: '' });

  useEffect(() => {
    requestHomeInformations({
      buildingId,
      setLoading,
      setInformations,
    });
  }, []);

  return (
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
          <Link to={`/maintenancesplan/${buildingId}${window.location.search}`}>
            <button type="button">Plano de manutenções</button>
          </Link>

          <Link to={`/informations/${buildingId}${window.location.search}`}>
            <button type="button">Informações</button>
          </Link>

          <Link to={`/annex/${buildingId}${window.location.search}`}>
            <button type="button">Anexos</button>
          </Link>
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
  );
};
