// src/app/pages/auth/login/login.styles.ts
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  transition: all 0.3s ease;
`;

export const LoginBox = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LoginTitle = styled.h1`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoginInput = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: ${({ theme }) => theme.inputLogin};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text}80;
  }
`;

export const LoginButton = styled.button`
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
  background-color: #0066ff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0052cc;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const ErrorMessage = styled.div`
  color: #ff3333;
  background-color: #ffebeb;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

// Novos componentes estilizados
export const MfaMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
`;

export const EmailHighlight = styled.span`
  font-weight: 700;
`;