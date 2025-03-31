import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 24px
`;

export const Header = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  margin-left: 1rem;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  .icon {
    color: ${({ theme }) => theme.arrowBack};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

export const DivDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const DetailCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 2rem;
  width: 50%;
`;

export const UserImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 2rem;
  display: block;
  margin: 0 auto 2rem;
  border-radius: 8px;
`;

export const DetailSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 0.5rem;
  
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgroundAlt};
    border-radius: 4px;
  }
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  min-width: 120px;
`;

export const DetailValue = styled.span`
  flex: 1;
`; 