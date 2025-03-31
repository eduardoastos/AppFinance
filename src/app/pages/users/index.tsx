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

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  // adicione outros campos conforme necessário
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRef = useRef(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successAction, setSuccessAction] = useState('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [deletionCompleted, setDeletionCompleted] = useState(false);

  useEffect(() => {
    // Verifica se deve mostrar a modal de sucesso
    const shouldShowSuccessModal = localStorage.getItem('@App:showSuccessModal');
    const action = localStorage.getItem('@App:successAction');
    
    if (shouldShowSuccessModal === 'true') {
      setShowSuccessModal(true);
      setSuccessAction(action || '');
      
      // Limpar o localStorage
      localStorage.removeItem('@App:showSuccessModal');
      localStorage.removeItem('@App:successAction');
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (fetchRef.current) return; // Evita chamadas duplicadas
      fetchRef.current = true;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Users loaded:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = () => {
    navigate('/users/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // Se já completou uma exclusão anteriormente, reseta o estado primeiro
    if (deletionCompleted) {
      setDeletionCompleted(false);
      setShowSuccessModal(false);
    }
    
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    setShowDeleteModal(false);
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('@App:token');
      await api.delete(`/api/users/${userToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the list by removing the deleted user
      setUsers(users.filter(user => user._id !== userToDelete));
      
      // Mostrar a modal de sucesso diretamente ao invés de usar localStorage
      setSuccessAction('deleted');
      setShowSuccessModal(true);
      setDeletionCompleted(true);
      
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/users/details/${id}`);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <Container>
      <Header>
        <Title>Users</Title>
        <Tooltip text="Add new user">
          <AddButton onClick={handleAdd}>
            Add
          </AddButton>
        </Tooltip>
      </Header>

      <UserList>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          users.map(user => (
            <UserItem key={user._id}>
              <div style={{ display: 'grid', gridTemplateColumns: '25% 40% 15%', width: '70%' }}>
                <strong>{user.name}</strong>
                {/* <span>{user.email}</span> */}
                <span>{user.profile}</span>
              </div>
              <ActionButtons>
                <Tooltip text="View details">
                  <EditButton onClick={() => handleViewDetails(user._id)}>
                    {FiEye({ className: "icon", size: 20 })}
                  </EditButton>
                </Tooltip>
                <Tooltip text="Edit user">
                  <EditButton onClick={() => handleEdit(user._id)}>
                    {FiEdit({ className: "icon", size: 20 })}
                  </EditButton>
                </Tooltip>
                <Tooltip text="Delete user">
                  <DeleteButton onClick={() => handleDelete(user._id)}>
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
            <p>Are you sure you want to delete this user?<br /> This action cannot be undone!</p>
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
            <p>User has been successfully {successAction}!</p>
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

export default Users; 