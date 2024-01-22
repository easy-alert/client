// LIBS
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// COMPONENTS
import { IconButton } from '../Buttons/IconButton';

// TYPES
import { ISidebar, SidebarContentProps } from './types';

// FUNCTIONS
import { requestCompanyLogo } from './functions';

export const NavBar = ({ children }: ISidebar) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>(false);

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const SidebarContent: SidebarContentProps[] = [
    {
      name: 'Home',
      url: `/home/${buildingNanoId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Plano de manutenção',
      url: `/maintenancesplan/${buildingNanoId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Informações',
      url: `/informations/${buildingNanoId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Anexos',
      url: `/annex/${buildingNanoId}${window.location.search}`,
      restricted: false,
    },
    // {
    //   name: 'Parceiros',
    //   url: `/partners/${buildingNanoId}${window.location.search}`,
    //   restricted: false,
    // },
    // {
    //   name: 'Videoaulas',
    //   url: `/videos/${buildingNanoId}${window.location.search}`,
    //   restricted: false,
    // },
    {
      name: 'Configurações',
      url: `/settings/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },
    {
      name: 'Área do responsável',
      url: `/syndicarea/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      window.open('https://easyalert.com.br/', '_self');
    } else {
      requestCompanyLogo({ setCompanyLogo, buildingNanoId });
    }
  }, []);

  return (
    <Style.Background>
      <Style.Navbar>
        <Style.HamburguerWrapper>
          <IconButton
            size="32px"
            icon={showNavbarMenu ? icon.x : icon.list}
            onClick={() => {
              setShowNavbarMenu(!showNavbarMenu);
            }}
          />
          {showNavbarMenu && (
            <Style.MobileContent>
              {SidebarContent.map((element) => {
                if (!syndicNanoId && element.restricted) {
                  return null;
                }

                return (
                  <Link
                    key={element.url}
                    to={element.url}
                    onClick={() => {
                      setShowNavbarMenu(false);
                    }}
                  >
                    <Style.NavbarButtonMobile
                      selected={
                        window.location.pathname.split('/')[1] === element.url.split('/')[1]
                      }
                    >
                      {element.name}
                    </Style.NavbarButtonMobile>
                  </Link>
                );
              })}
            </Style.MobileContent>
          )}
        </Style.HamburguerWrapper>

        <Style.CompanyLogo>
          <img src={companyLogo ?? icon.logoTextBlack} alt="Logo Empresa" />
        </Style.CompanyLogo>

        <Style.WebContent>
          {SidebarContent.map((element) => {
            if (!syndicNanoId && element.restricted) {
              return null;
            }
            return (
              <Link className="p3" to={element.url} key={element.url}>
                <Style.NavbarButtonWeb
                  selected={window.location.pathname.split('/')[1] === element.url.split('/')[1]}
                >
                  {element.name}
                </Style.NavbarButtonWeb>
              </Link>
            );
          })}
        </Style.WebContent>
      </Style.Navbar>
      <Style.AppContent>{children}</Style.AppContent>
    </Style.Background>
  );
};
