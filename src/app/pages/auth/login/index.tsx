import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import {
  LoginContainer,
  LoginBox,
  LoginTitle,
  LoginForm,
  LoginInput,
  LoginButton,
  ErrorMessage,
  MfaMessage,
  EmailHighlight
} from './login.styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const { signIn, verifyMfa, requiresMfa, isLoading, isAuthenticated, tempEmail } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsTransitioning(true);

    try {
      const loginSuccess = await signIn(email, password);
      console.log('Login success:', loginSuccess);
      
      if (loginSuccess && requiresMfa) {
        setIsTransitioning(false);
      } else if (loginSuccess) {
        // Se não precisar de MFA, mantém o loading até o redirecionamento
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Credenciais inválidas');
      setIsTransitioning(false);
    }
  };

  const handleMfaSubmit = async () => {
    setError('');
    setIsTransitioning(true);

    try {
      await verifyMfa(email, mfaCode);
      // Mantém o loading até o redirecionamento
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    } catch (mfaError) {
      console.error('Erro MFA:', mfaError);
      setError('Código MFA inválido');
      setIsTransitioning(false);
    }
  };

  return (
    <LoginContainer>
      {(isTransitioning || isLoading) && <Loading />}
      <LoginBox>
        <LoginTitle>{requiresMfa ? 'Verificação em duas etapas' : 'Login'}</LoginTitle>
        {requiresMfa && (
          <MfaMessage>
            Digite o código enviado para <EmailHighlight>{tempEmail}</EmailHighlight>
          </MfaMessage>
        )}
        <LoginForm onSubmit={(e) => {
          e.preventDefault();
          if (requiresMfa) {
            handleMfaSubmit();
          } else {
            handleSubmit(e);
          }
        }}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {!requiresMfa ? (
            <>
              <LoginInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isTransitioning}
              />
              <LoginInput
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isTransitioning}
              />
            </>
          ) : (
            <LoginInput
              type="text"
              placeholder="Código de verificação"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              disabled={isLoading || isTransitioning}
            />
          )}
          
          <LoginButton type="submit" disabled={isLoading || isTransitioning}>
            {isLoading || isTransitioning ? 'Carregando...' : requiresMfa ? 'Verificar' : 'Entrar'}
          </LoginButton>
        </LoginForm>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;