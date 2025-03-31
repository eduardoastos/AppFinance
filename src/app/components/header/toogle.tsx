import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleContainer = styled.div<{isOn: boolean}>`
  width: 70px;
  height: 34px;
  background-color: ${props => props.isOn ? '#30303d' : '#30303d'};
  border-radius: 34px;
  padding: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: ${props => props.isOn ? 'flex-start' : 'flex-end'};
`;

const ToggleButton = styled.div<{isOn: boolean}>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({theme}) => theme.buttonMode};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ThemeToggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <ToggleContainer isOn={isOn} onClick={onToggle}>
      <ToggleButton isOn={isOn}>
        {isOn ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="white"
            />
            <path
              d="M12 3C16.97 3 21 7.03 21 12 21 12.2 21 12.39 20.98 12.58 20.19 11.12 18.18 10.23 16 10.23 12.65 10.23 9.95 12.93 9.95 16.27 9.95 17.86 10.58 19.29 11.6 20.31 9.85 19.95 8.21 19.15 6.92 18 5.28 16.57 4.24 14.55 4.04 12.3 4.01 12.2 4 12.1 4 12 4 7.03 8.03 3 13 3Z"
              fill="white"
            />
            <path
              d="M15 13L16.5 15L19 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" fill="white" />
            <path 
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round" 
            />
          </svg>
        )}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;