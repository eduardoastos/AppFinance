import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Tooltip from '../tooltip';
import { 
  HeaderContainer, 
  ThemeContainer, 
  ThemeButton, 
  UserContainer, 
  UserInfo,
  LogoutButton 
} from './header.styles';

interface HeaderProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, onThemeChange }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    const newTheme = currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    onThemeChange(newTheme);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };
  
  return (
    <HeaderContainer>
      <ThemeContainer>
        <Tooltip text={currentTheme === 'lightTheme' ? 'Switch to dark mode' : 'Switch to light mode'}>
          <ThemeButton onClick={toggleTheme}>
            {currentTheme === 'lightTheme' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </ThemeButton>
        </Tooltip>

        <UserContainer>
          <UserInfo>
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </UserInfo>
          <Tooltip text="Logout">
            <LogoutButton onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </LogoutButton>
          </Tooltip>
        </UserContainer>
      </ThemeContainer>
    </HeaderContainer>
  );
};

export default Header;
