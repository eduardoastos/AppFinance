import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import Tooltip from '../../../components/tooltip';
import {
  Container,
  FormContainer,
  Header,
  BackButton,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  Select,
  InputRow,
  SubmitButton
} from './styles';
import {
  DeleteModal as ConfirmModal,
  DeleteModalContent as ConfirmModalContent,
  DeleteModalButtons as ConfirmModalButtons,
  CancelButton
} from '../styles';
import styled, { keyframes } from 'styled-components';

// Animação para entrada da modal
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Botão verde para confirmar adição/edição
const GreenConfirmButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #167c1b;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #1fc727;
  }
`;

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

// Modal animada
const AnimatedModal = styled(ConfirmModal)`
  .modal-content {
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

// Modal de conteúdo animada
const AnimatedModalContent = styled(ConfirmModalContent)`
  animation: ${fadeIn} 0.3s ease-out;
`;

interface UserFormData {
  email: string;
  name: string;
  password: string;
  profile: string;
  organization: string;
  phone: string;
  role: string;
}

interface Organization {
  _id: string;
  nameOrganization: string;
}

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se estiver editando
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    password: '',
    profile: '',
    organization: '',
    phone: '',
    role: ''
  });

  // Carregar lista de organizações
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get('/api/organization', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error loading organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Se houver ID, busca os dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return; // Se não tiver ID, é modo de criação
      
      setIsLoading(true);
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get(`/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('User data loaded:', response.data);
        
        // Alimenta o formulário com os dados do usuário
        setFormData({
          email: response.data.email || '',
          name: response.data.name || '',
          password: '', // Não preencher senha na edição
          profile: response.data.profile || '',
          organization: response.data.nameOrganization || '',
          phone: response.data.phone || '',
          role: response.data.role || ''
        });
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('@App:token');
      const userData = {
        name: formData.name,
        email: formData.email,
        profile: formData.profile,
        nameOrganization: formData.organization,
        phone: formData.phone,
        role: formData.role
      };

      // Adicionar senha apenas se foi fornecida (em caso de edição pode não ser)
      if (formData.password) {
        Object.assign(userData, { password: formData.password });
      }

      if (id) {
        // Atualizar usuário existente
        await api.patch(`/api/users/${id}`, userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Criar novo usuário
        await api.post('/api/users', userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Guarda informação no localStorage para mostrar a modal na lista
      localStorage.setItem('@App:showSuccessModal', 'true');
      localStorage.setItem('@App:successAction', id ? 'updated' : 'added');
      
      // Navega para a listagem
      navigate('/users');
      
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <FormContainer>
        <Title>{id ? 'Edit User' : 'New User'}</Title>
        <Form onSubmit={handleSubmit}>
        <InputGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>E-mail</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={id ? undefined : handleChange}
              placeholder="********"
              required={!id} // Senha só é obrigatória na criação
              disabled={Boolean(id) || isLoading}
            />
          </InputGroup>

          <InputRow>
            <InputGroup>
              <Label>Profile</Label>
              <Select
                name="profile"
                value={formData.profile}
                onChange={handleChange as any}
                required
                disabled={isLoading}
              >
                <option value="">Select a profile</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Organization</Label>
              <Select
                name="organization"
                value={formData.organization}
                onChange={handleChange as any}
                required
                disabled={isLoading}
              >
                <option value="">Select an organization</option>
                {organizations.map(org => (
                  <option key={org._id} value={org.nameOrganization}>
                    {org.nameOrganization}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </InputRow>

          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(xx) xxxxx-xxxx"
              required
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>Role (optional)</Label>
            <Input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Analyst"
              disabled={isLoading}
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : id ? 'Update' : 'Add'}
          </SubmitButton>
        </Form>
      </FormContainer>

      {showConfirmModal && (
        <AnimatedModal>
          <AnimatedModalContent>
            <h3>{id ? 'Update Confirmation' : 'Add Confirmation'}</h3>
            <p>Are you sure you want to {id ? 'update' : 'add'} this user?</p>
            <ConfirmModalButtons>
              <CancelButton onClick={() => setShowConfirmModal(false)}>
                Cancel
              </CancelButton>
              <GreenConfirmButton onClick={confirmSubmit}>
                {id ? 'Update' : 'Add'}
              </GreenConfirmButton>
            </ConfirmModalButtons>
          </AnimatedModalContent>
        </AnimatedModal>
      )}
    </Container>
  );
};

export default UserForm; 