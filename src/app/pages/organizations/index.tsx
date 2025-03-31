import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { FiEdit, FiEye } from "react-icons/fi";
import Tooltip from '../../components/tooltip';
import {
  Container,
  Header,
  Title,
  AddButton,
  UserList,
  UserItem,
  ActionButtons,
  EditButton,
  DeleteButton,
  DeleteModal,
  DeleteModalContent,
  DeleteModalButtons,
  CancelButton,
  ConfirmButton
} from './styles';
import Loading from '../../components/Loading';
import styled from 'styled-components';


// Botão azul para OK na modal de sucesso
const BlueButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #1D9BF0;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #1A8CD8;
  }
`;

const CustomDeleteModal = styled(DeleteModal)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999 !important;
`;

interface Organization {
  id: number;
  name: string;
  _id: string;
  nameOrganization: string;
  cnpjTaxId: string;
  email: string;
}

const Organizations: React.FC = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRef = useRef(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState('');
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);
  const [deletionCompleted, setDeletionCompleted] = useState(false);

  useEffect(() => {
    // Verifica se deve mostrar a modal de sucesso
    const shouldShowSuccessModal = localStorage.getItem('@App:showOrgSuccessModal');
    const action = localStorage.getItem('@App:orgSuccessAction');
    
    if (shouldShowSuccessModal === 'true') {
      setShowSuccessModal(true);
      setSuccessAction(action || '');
      
      // Limpar o localStorage
      localStorage.removeItem('@App:showOrgSuccessModal');
      localStorage.removeItem('@App:orgSuccessAction');
    }
  }, []);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (fetchRef.current) return; // Evita chamadas duplicadas
      fetchRef.current = true;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get('/api/organization', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Organizations loaded:', response.data);
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error loading organizations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleAdd = () => {
    navigate('/organizations/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/organizations/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // Se já completou uma exclusão anteriormente, reseta o estado primeiro
    if (deletionCompleted) {
      setDeletionCompleted(false);
      setShowSuccessModal(false);
    }
    
    setOrganizationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!organizationToDelete) return;
    
    setShowDeleteModal(false);
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('@App:token');
      await api.delete(`/api/organization/${organizationToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Atualiza a lista removendo a organização excluída
      setOrganizations(organizations.filter(org => org._id !== organizationToDelete));
      
      // Mostrar a modal de sucesso diretamente ao invés de usar localStorage
      setSuccessAction('deleted');
      setShowSuccessModal(true);
      setDeletionCompleted(true);
      
    } catch (error) {
      console.error('Error deleting organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/organizations/details/${id}`);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <Container>
      <Header>
        <Title>Organizations</Title>
        <Tooltip text="Add new organization">
          <AddButton onClick={handleAdd}>
            Add
          </AddButton>
        </Tooltip>
      </Header>

      <UserList>
        {isLoading ? (
          <Loading />
        ) : (
          organizations.map(organization => (
            <UserItem key={organization.id}>
              <div style={{ display: 'grid', gridTemplateColumns: '25% 35% 20%', width: '70%' }}>
                <strong>{organization.nameOrganization}</strong>
                <span>{organization.email}</span>
                <span>{organization.cnpjTaxId}</span>
              </div>
              <ActionButtons>
                <Tooltip text="View details">
                  <EditButton onClick={() => handleViewDetails(organization._id)}>
                    {FiEye({ className: "icon", size: 20 })}
                  </EditButton>
                </Tooltip>
                <Tooltip text="Edit organization">
                  <EditButton onClick={() => handleEdit(organization._id)}>
                    {FiEdit({ className: "icon", size: 20 })}
                  </EditButton>
                </Tooltip>
                <Tooltip text="Delete organization">
                  <DeleteButton onClick={() => handleDelete(organization._id)}>
                    {HiTrash({ className: "icon", size: 20 })}
                  </DeleteButton>
                </Tooltip>
              </ActionButtons>
            </UserItem>
          ))
        )}
      </UserList>

      {showDeleteModal && !deletionCompleted && (
        <CustomDeleteModal>
          <DeleteModalContent>
            <h3>Delete Confirmation</h3>
            <p>Are you sure you want to delete this organization?<br /> This action cannot be undone!</p>
            <DeleteModalButtons>
              <CancelButton onClick={() => setShowDeleteModal(false)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={confirmDelete}>
                Delete
              </ConfirmButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </CustomDeleteModal>
      )}

      {showSuccessModal && (
        <CustomDeleteModal>
          <DeleteModalContent>
            <h3>Success</h3>
            <p>Organization has been successfully {successAction}!</p>
            <DeleteModalButtons>
              <BlueButton onClick={handleSuccessModalClose}>
                OK
              </BlueButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </CustomDeleteModal>
      )}
    </Container>
  );
};

export default Organizations; 