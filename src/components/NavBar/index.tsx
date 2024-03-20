// LIBS
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

// STYLES
import { toast } from 'react-toastify';
import * as Style from './styles';
import { icon } from '../../assets/icons';

// COMPONENTS
import { IconButton } from '../Buttons/IconButton';

// TYPES
import { ISidebar, SidebarContentProps } from './types';

// FUNCTIONS
import { requestCompanyLogo } from './functions';
import { theme } from '../../styles/theme';

export const NavBar = ({ children }: ISidebar) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>(false);

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const SidebarContent: SidebarContentProps[] = [
    {
      name: 'QRCode',
      url: `/home/${buildingNanoId}${window.location.search}`,
      restricted: false,
    },
    {
      name: 'Chamados',
      url: `/soon`,
      restricted: false,
      disabled: true,
    },

    {
      name: 'Manutenções',
      url: `/syndicarea/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Checklists',
      url: `/checklists/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Configurações',
      url: `/settings/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },

    {
      name: 'Fornecedores',
      url: `/suppliers/${buildingNanoId}${window.location.search}`,
      restricted: true,
    },

    // {
    //   name: 'Videoaulas',
    //   url: `/videos/${buildingNanoId}${window.location.search}`,
    //   restricted: false,
    // },
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
                    to={
                      element.disabled
                        ? window.location.pathname + window.location.search
                        : element.url
                    }
                    onClick={() => {
                      if (element.disabled) {
                        toast.success('Em breve', { toastId: element.url });
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
          {SidebarContent.map((element) => {
            if (!syndicNanoId && element.restricted) {
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
                    toast.success('Em breve', { toastId: element.url });
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
