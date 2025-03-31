import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  InputRow,
  SubmitButton
} from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Tooltip from '../../../components/tooltip';
import { api } from '../../../services/api';
import Loading from '../../../components/Loading';
import {
  DeleteModal,
  DeleteModalContent,
  DeleteModalButtons,
  CancelButton,
  ConfirmButton,
} from '../styles';
import { styled } from 'styled-components';

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

interface UserFormData {
  name: string;
  email: string;
  cnpj: string;
  contact_name: string;
  phone: string;
  role: string;
}

const OrganizationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se estiver editando
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    cnpj: '',
    contact_name: '',
    phone: '',
    role: ''
  });

  // Se houver ID, busca os dados do usuário
  useEffect(() => {
    const fetchOrganization = async () => {
      if (!id) return; // Se não tiver ID, é modo de criação
      
      try {
        const token = localStorage.getItem('@App:token');
        const response = await api.get(`/api/organization/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Alimenta o formulário com os dados da organização
        setFormData({
          name: response.data.nameOrganization,
          cnpj: response.data.cnpjTaxId,
          email: response.data.email,
          contact_name: response.data.nameContact,
          phone: response.data.phoneContact,
          role: response.data.role || ''
        });
      } catch (error) {
        console.error('Erro ao buscar dados da organização:', error);
      }
    };

    fetchOrganization();
  }, [id]); // Executa quando o ID mudar

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
      const apiData = {
        nameOrganization: formData.name,
        cnpjTaxId: formData.cnpj,
        email: formData.email,
        nameContact: formData.contact_name,
        phoneContact: formData.phone
      };

      if (id) {
        // Atualizar organização existente
        await api.patch(`/api/organization/${id}`, apiData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Criar nova organização
        await api.post('/api/organization', apiData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Guarda informação no localStorage para mostrar a modal na lista
      localStorage.setItem('@App:showOrgSuccessModal', 'true');
      localStorage.setItem('@App:orgSuccessAction', id ? 'updated' : 'added');
      
      // Navega para a listagem
      navigate('/organizations');
      
    } catch (error) {
      console.error('Erro ao salvar organização:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <FormContainer>
        <Title>{id ? 'Edit Organization' : 'New Organization'}</Title>
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
            <Label>CNPJ / Tax ID</Label>
            <Input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0001-00"
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>Contact Name</Label>
            <Input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              placeholder="Contact name"
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              disabled={isLoading}
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : id ? 'Update' : 'Add'}
          </SubmitButton>
        </Form>
      </FormContainer>

      {showConfirmModal && (
        <DeleteModal>
          <DeleteModalContent>
            <h3>{id ? 'Update Confirmation' : 'Add Confirmation'}</h3>
            <p>Are you sure you want to {id ? 'update' : 'add'} this organization?</p>
            <DeleteModalButtons>
              <CancelButton onClick={() => setShowConfirmModal(false)}>
                Cancel
              </CancelButton>
              <GreenConfirmButton onClick={confirmSubmit}>
                {id ? 'Update' : 'Add'}
              </GreenConfirmButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </DeleteModal>
      )}
    </Container>
  );
};

export default OrganizationForm; 