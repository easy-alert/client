// LIBS
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// COMPONENTS
import { IconButton } from '../Buttons/IconButton';

// TYPES
import { ISidebar, SidebarContentProps } from './types';

// FUNCTIONS
import { query } from '../../utils/functions';
import { requestCompanyLogo } from './functions';

export const Sidebar = ({ children }: ISidebar) => {
  const { buildingId } = useParams() as { buildingId: string };

  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>(false);

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const SidebarContent: SidebarContentProps[] = [
    // {
    //   name: 'Home',
    //   url: `/home/${buildingId}${window.location.search}`,
    //   restricted: false,
    // },
    {
      name: 'Plano de manutenções',
      url: `/maintenancesplan/${buildingId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Informações',
      url: `/informations/${buildingId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Área do síndico',
      url: `/syndicarea/${buildingId}${window.location.search}`,
      restricted: true,
    },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      window.open('https://easyalert.com.br/', '_self');
    } else {
      requestCompanyLogo({ setCompanyLogo, buildingId });
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
                if (!query.get('syndicId') && element.restricted) {
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
            if (!query.get('syndicId') && element.restricted) {
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
