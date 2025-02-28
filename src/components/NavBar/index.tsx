// REACT
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';

// GLOBAL UTILS
import { handleToastifyMessage } from '@utils/toastifyResponses';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ICONS
import { icon } from '@assets/icons';

// FUNCTIONS
import { requestCompanyLogo } from './functions';

// STYLES
import * as Style from './styles';

// TYPES
import type { ISidebar, SidebarContentProps } from './types';

export const NavBar = ({ children }: ISidebar) => {
  const { buildingId } = useParams() as { buildingId: string };

  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>(false);

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const sidebarContent: SidebarContentProps[] = [
    {
      name: 'QRCode',
      url: `/home/${buildingId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Chamados',
      url: `/tickets/${buildingId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Manutenções',
      url: `/syndicarea/${buildingId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Checklists',
      url: `/checklists/${buildingId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Configurações',
      url: `/settings/${buildingId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Fornecedores',
      url: `/suppliers/${buildingId}${window.location.search}`,
      restricted: true,
    },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      window.open('https://easyalert.com.br/', '_self');
    } else if (buildingId) {
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
              {sidebarContent.map((element) => {
                if (!syndicNanoId && element.restricted) {
                  return null;
                }

                if (syndicNanoId && element.restrictedForSyndic) {
                  return null;
                }

                return (
                  <Link
                    key={element.url}
                    to={
                      element.disabled
                        ? window.location.pathname + window.location.search
                        : element.url
                    }
                    onClick={() => {
                      if (element.disabled) {
                        handleToastifyMessage({ message: 'Em breve', type: 'success' });
                      }

                      setShowNavbarMenu(false);
                    }}
                  >
                    <Style.NavbarButtonMobile
                      style={{ color: element.disabled ? theme.color.gray4 : theme.color.black }}
                      selected={
                        window.location.pathname.split('/')[1] === element.url.split('/')[1]
                      }
                      showRedDot={element.disabled}
                    >
                      <span>{element.name}</span>
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
          {sidebarContent.map((element) => {
            if (!syndicNanoId && element.restricted) {
              return null;
            }

            if (syndicNanoId && element.restrictedForSyndic) {
              return null;
            }

            return (
              <Link
                className="p3"
                to={
                  element.disabled ? window.location.pathname + window.location.search : element.url
                }
                key={element.url}
                title={element.disabled ? 'Em breve' : ''}
                onClick={() => {
                  if (element.disabled) {
                    handleToastifyMessage({ message: 'Em breve', type: 'success' });
                  }
                }}
              >
                <Style.NavbarButtonWeb
                  style={{ color: element.disabled ? theme.color.gray4 : theme.color.black }}
                  selected={window.location.pathname.split('/')[1] === element.url.split('/')[1]}
                  showRedDot={element.disabled}
                >
                  <span>{element.name}</span>
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
