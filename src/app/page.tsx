import React from 'react';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    background-color: ${({theme}) => theme.primary};
    height: 10%;
    min-height: 80px;
    border-bottom: 4px solid ${({theme}) => theme.border};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    width: 100%;
`;

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Dashboard</h1>
    </div>
  );
};

export default HomePage;