import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 350px;
  position: fixed;
  height: 100%;
  border-radius: 5px;
  background-color: ${({theme}) => theme.sidebar};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 120px 1rem 1rem 2rem;
`;

interface SidebarItemProps {
  $active?: boolean;
}

export const SidebarItem = styled.div<SidebarItemProps>`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  background-color: ${props => props.$active ? ({theme}) => theme.sidebarItemActive : 'transparent'};
  border-radius: 12px;
  margin: 0 10px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$active ? '#c5e3ff' : '#e0e0e0'};
  }
`;

export const SidebarIcon = styled.div`
  font-size: 20px;
  margin-right: 12px;
  color: ${({theme}) => theme.textSidebar};
  display: flex;
  align-items: center;
`;

export const SidebarText = styled.div`
  font-size: 16px;
    color: ${({theme}) => theme.textSidebar};
  font-weight: 500;
`;
