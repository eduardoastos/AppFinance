import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Container,
  Header,
  Title,
  BackButton,
  DivDetailCard,
  DetailCard,
  DetailItem,
  DetailLabel,
  DetailValue,
  DetailSection,
  UserImage,
  SectionTitle
} from './styles';
import Tooltip from '../../../components/tooltip';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  status?: string;
  permissions?: string[];
  department?: string;
  phone?: string;
  address?: string;
  nameOrganization?: string;
  profile?: string;
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRef = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (fetchRef.current) return;
      fetchRef.current = true;

      setIsLoading(true);
      try {
        console.log('Fetching user details for ID:', id);
        const token = localStorage.getItem('@App:token');
        if (!token) {
          console.error('No auth token found');
          return;
        }

        const response = await api.get(`/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User data received:', response.data);
        setUser(response.data);
      } catch (error: any) {
        console.error('Error loading user:', error);
        // If there's no auth, redirect to login
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/users');
  };

  return (
    <Container>
      <Header>
        <Tooltip text="Back to users list">
          <BackButton onClick={handleBack}>
            {FiArrowLeft({ className: "icon", size: 30 })}
          </BackButton>
        </Tooltip>
      </Header>

      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <DivDetailCard>
          <Title>User Details</Title>

          <DetailCard>
            <UserImage 
              src={'/BG Sinergy.png'} 
              alt={user.name} 
            />
            
            <DetailSection>
              <DetailItem>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{user.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{user.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Organization</DetailLabel>
                <DetailValue>{user.nameOrganization || 'Not specified'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Role</DetailLabel>
                <DetailValue>{user.role}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{user.phone || 'Not specified'}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Profile</DetailLabel>
                <DetailValue>{user.profile || 'Not specified'}</DetailValue>
              </DetailItem>
              
            </DetailSection>
            
            {user.permissions && user.permissions.length > 0 && (
              <DetailSection>
                <SectionTitle>Permissions</SectionTitle>
                {user.permissions.map((permission, index) => (
                  <DetailItem key={index}>
                    <DetailValue>{permission}</DetailValue>
                  </DetailItem>
                ))}
              </DetailSection>
            )}
          </DetailCard>
        </DivDetailCard>
      ) : (
        <div>User not found</div>
      )}
    </Container>
  );
};

export default UserDetails; 