// LIBS
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

// TYPES
import { ISidebar, SidebarContentProps } from './utils/types';

export const Sidebar = ({ children }: ISidebar) => {
  const navigate = useNavigate();

  const SidebarContent: SidebarContentProps[] = [
    { name: 'Plano de manutenções', url: '/maintenancesplan' },
    { name: 'Informações', url: '/informations' },
    { name: 'Área do síndico', url: '/buildingmanager' },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/maintenancesplan');
    }
  }, []);

  return (
    <Style.Background>
      <Style.Navbar>
        <img src={icon.logoFullWhite} alt="Logo EasyAlert" />
        {SidebarContent.map((element) => (
          <Link className="p3" to={element.url} key={element.url}>
            <Style.NavbarButton selected={window.location.pathname.startsWith(element.url)}>
              {element.name}
            </Style.NavbarButton>
          </Link>
        ))}
      </Style.Navbar>
      <Style.AppContent>{children}</Style.AppContent>
    </Style.Background>
  );
};
