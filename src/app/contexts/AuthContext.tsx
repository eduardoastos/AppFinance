import React, { createContext, useContext, useState, useCallback } from 'react';
import { authService, MfaResponse } from '../services/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

// Primeiro, vamos verificar a resposta real da API
type ApiMfaResponse = {
  access_token: string;
  userId: string;
  organizationId: string[];
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requiresMfa: boolean;
  tempEmail: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  verifyMfa: (email: string, code: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Verifica se já existe um usuário no localStorage
    const storedUser = localStorage.getItem('@App:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [tempEmail, setTempEmail] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      if (response.sendMFACode) {
        setRequiresMfa(true);
        setTempEmail(response.email);
        return true; // Login inicial bem-sucedido, aguardando MFA
      }

      // Se chegou aqui, algo deu errado
      return false;

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyMfa = useCallback(async (email: string, code: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.verifyMfa(email, code);
      console.log('Resposta MFA:', response);

      if (response && response.access_token) {
        const user = {
          id: response.userId,
          email: email,
          name: email.split('@')[0]
        };

        // Primeiro limpar os estados antigos
        setRequiresMfa(false);
        setTempEmail(null);

        // Depois atualizar o usuário e token
        localStorage.setItem('@App:token', response.access_token);
        localStorage.setItem('@App:user', JSON.stringify(user));
        setUser(user);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro na verificação MFA:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');
    setUser(null);
    setRequiresMfa(false);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAuthenticated: !!user,
        isLoading,
        requiresMfa,
        tempEmail,
        signIn,
        verifyMfa,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};