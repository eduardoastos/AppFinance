import styled from 'styled-components';

export const HeaderContainer = styled.header`
    z-index: 1;
    background-color: ${({theme}) => theme.primary};
    height: 100px;
    min-height: 80px;
    border-bottom: 5px solid #373737;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    width: 100%;
`;

export const ThemeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

export const ThemeButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: ${({theme}) => theme.buttonMode};
    color: ${({theme}) => theme.text};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    svg {
        transition: transform 0.3s ease;
    }

    &:hover svg {
        transform: rotate(12deg);
    }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({theme}) => theme.buttonMode};
  border-radius: 8px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
  }
  
  .user-email {
    font-size: 12px;
    color: ${({theme}) => theme.text};
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({theme}) => theme.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

