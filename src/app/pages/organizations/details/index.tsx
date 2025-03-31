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
  SectionTitle,
  OrganizationImage
} from './styles';
import Tooltip from '../../../components/tooltip';

interface Organization {
  _id: string;
  nameOrganization: string;
  cnpjTaxId: string;
  email: string;
  logoUrl: string;
  nameContact: string;
  phoneContact: string;
  planos: any[];
}

const OrganizationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRef = useRef(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (fetchRef.current) return;
      fetchRef.current = true;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get(`/api/organization/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrganization(response.data);
      } catch (error) {
        console.error('Error loading organization:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleBack = () => {
    navigate('/organizations');
  };

  return (
    <Container>
        <Header>
          <Tooltip text="Back to organizations list">
            <BackButton onClick={handleBack}>
              {FiArrowLeft({ className: "icon", size: 30 })}
            </BackButton>
          </Tooltip>
        </Header>

      {isLoading ? (
        <div>Loading...</div>
      ) : organization ? (
        <DivDetailCard>
          <Title>Organization Details</Title>

          <DetailCard>
            <OrganizationImage 
              // src={organization.logoUrl || '/BG Sinergy.png'} 
              src={'/BG Sinergy.png'} 
              alt={organization.nameOrganization} 
            />
            
            <DetailSection>
              <DetailItem>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{organization.nameOrganization}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>CNPJ / Tax ID</DetailLabel>
                <DetailValue>{organization.cnpjTaxId}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{organization.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Contact Name</DetailLabel>
                <DetailValue>{organization.nameContact}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{organization.phoneContact}</DetailValue>
              </DetailItem>
            </DetailSection>
            
          </DetailCard>
        </DivDetailCard>
      ) : (
        <div>Organization not found</div>
      )}
    </Container>
  );
};

export default OrganizationDetails; 