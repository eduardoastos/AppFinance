import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarContainer, SidebarItem, SidebarIcon, SidebarText } from './sidebar.styles';
import * as Hi from 'react-icons/hi';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mapeamento de rotas
  const routes = {
    dashboard: '/',
    users: '/users',
    organizations: '/organizations',
    compliance: '/compliance',
    rules: '/rules'
  };

  // Função para determinar qual item está ativo baseado na rota atual
  const getActiveItem = (path: string) => {
    const currentPath = location.pathname;
    
    // Caso especial para o dashboard
    if (path === 'dashboard') {
      return currentPath === '/';
    }

    // Para outras rotas, verifica se o pathname começa com a rota do item
    return currentPath.startsWith(routes[path as keyof typeof routes]);
  };

  return (
    <SidebarContainer>
      <SidebarItem 
        $active={getActiveItem('dashboard')} 
        onClick={() => navigate(routes.dashboard)}
      >
        <SidebarIcon>
          {Hi.HiHome({size: 20})}
        </SidebarIcon>
        <SidebarText>Dashboard</SidebarText>
      </SidebarItem>
      
      <SidebarItem 
        $active={getActiveItem('users')} 
        onClick={() => navigate(routes.users)}
      >
        <SidebarIcon>
          {Hi.HiUsers({size: 20})}
        </SidebarIcon>
        <SidebarText>Users</SidebarText>
      </SidebarItem>
      
      <SidebarItem 
        $active={getActiveItem('organizations')} 
        onClick={() => navigate(routes.organizations)}
      >
        <SidebarIcon>
          {Hi.HiOfficeBuilding({size: 20})}
        </SidebarIcon>
        <SidebarText>Organizations</SidebarText>
      </SidebarItem>
      
      <SidebarItem 
        $active={getActiveItem('compliance')} 
        onClick={() => navigate(routes.compliance)}
      >
        <SidebarIcon>
          {Hi.HiShieldCheck({size: 20})}
        </SidebarIcon>
        <SidebarText>Compliance</SidebarText>
      </SidebarItem>
      
      <SidebarItem 
        $active={getActiveItem('rules')} 
        onClick={() => navigate(routes.rules)}
      >
        <SidebarIcon>
          {Hi.HiBell({size: 20})}
        </SidebarIcon>
        <SidebarText>Rules</SidebarText>
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;