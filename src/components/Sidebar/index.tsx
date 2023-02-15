/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// LIBS
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// COMPONENTS
import { IconButton } from '../Buttons/IconButton';

// TYPES
import { ISidebar, SidebarContentProps } from './utils/types';

export const Sidebar = ({ children }: ISidebar) => {
  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>(false);

  const { buildingId } = useParams() as { buildingId: string };

  const navigate = useNavigate();

  const SidebarContent: SidebarContentProps[] = [
    { name: 'Plano de manutenções', url: `/maintenancesplan/${buildingId}` },
    { name: 'Informações', url: `/informations/${buildingId}` },
    { name: 'Área do síndico', url: `/syndicarea/${buildingId}` },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/maintenancesplan');
    }
  }, []);

  return (
    <Style.Background>
      <Style.Navbar>
        <Style.HamburguerWrapper>
          <IconButton
            size="32px"
            icon={showNavbarMenu ? icon.xWhite : icon.list}
            onClick={() => {
              setShowNavbarMenu(!showNavbarMenu);
            }}
          />
          {showNavbarMenu && (
            <Style.MobileContent>
              {SidebarContent.map((element) => (
                <Link
                  key={element.url}
                  to={element.url}
                  onClick={() => {
                    setShowNavbarMenu(false);
                  }}
                >
                  <Style.NavbarButtonMobile
                    selected={window.location.pathname.startsWith(element.url)}
                  >
                    {element.name}
                  </Style.NavbarButtonMobile>
                </Link>
              ))}
            </Style.MobileContent>
          )}
        </Style.HamburguerWrapper>

        <img
          src={icon.logoFullWhite}
          alt="Logo EasyAlert"
          onClick={() => {
            window.open('https://easyalert.com.br/', '_blank');
          }}
          style={{ cursor: 'pointer' }}
        />

        <Style.WebContent>
          {SidebarContent.map((element) => (
            <Link className="p3" to={element.url} key={element.url}>
              <Style.NavbarButtonWeb selected={window.location.pathname.startsWith(element.url)}>
                {element.name}
              </Style.NavbarButtonWeb>
            </Link>
          ))}
        </Style.WebContent>
      </Style.Navbar>
      <Style.AppContent>{children}</Style.AppContent>
    </Style.Background>
  );
};
