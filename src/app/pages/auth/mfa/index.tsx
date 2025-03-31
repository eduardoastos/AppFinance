import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styled from 'styled-components';

const MfaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const MfaBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MfaTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const MfaSubtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
`;

const MfaForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MfaInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #000;
  }

  &::placeholder {
    color: #999;
  }
`;

const MfaButton = styled.button`
  padding: 0.75rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff3333;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const MfaVerification: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { verifyMfa, isLoading, tempEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!tempEmail) {
        setError('Email não encontrado. Por favor, faça login novamente.');
        navigate('/login');
        return;
      }

      await verifyMfa(tempEmail, code);
      navigate('/');
    } catch (err) {
      setError('Código inválido. Por favor, tente novamente.');
    }
  };

  return (
    <MfaContainer>
      <MfaBox>
        <MfaTitle>Verificação em Duas Etapas</MfaTitle>
        <MfaSubtitle>
          Digite o código enviado para {tempEmail}
        </MfaSubtitle>
        <MfaForm onSubmit={handleSubmit}>
          <MfaInput
            type="text"
            placeholder="Código MFA"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
            required
            autoFocus
          />
          <MfaButton type="submit" disabled={isLoading || !code}>
            {isLoading ? 'Verificando...' : 'Verificar'}
          </MfaButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </MfaForm>
      </MfaBox>
    </MfaContainer>
  );
};

export default MfaVerification; 