import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/auth/login';
import Layout from '../layout';
import HomePage from '../page';
import Users from '../pages/users/index';
import Organizations from '../pages/organizations/index';
import Compliance from '../pages/compliance/index';
import Rules from '../pages/rules/index';
import NewUser from '../pages/users/new';
import UserForm from '../pages/users/new';
import UserDetails from '../pages/users/details';

import MfaVerification from '../pages/auth/mfa/index';
import OrganizationForm from '../pages/organizations/new';
import OrganizationDetails from '../pages/organizations/details';
import { FiEdit, FiEye } from "react-icons/fi";

// Componente que verifica autenticação
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};


const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona usuários autenticados para home se tentarem acessar login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />
        
        {/* Rotas protegidas */}
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        
        <Route path="/users" element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        
        <Route path="/organizations" element={
          <PrivateRoute>
            <Organizations />
          </PrivateRoute>
        } />
        
        <Route path="/compliance" element={
          <PrivateRoute>
            <Compliance />
          </PrivateRoute>
        } />

        <Route path="/rules" element={
          <PrivateRoute>
            <Rules />
          </PrivateRoute>
        } />
        
        <Route path="/users/new" element={
          <PrivateRoute>
            <UserForm />
          </PrivateRoute>
        } />
        
        <Route path="/users/edit/:id" element={
          <PrivateRoute>
            <UserForm />
          </PrivateRoute>
        } />

        <Route path="/organizations/new" element={
          <PrivateRoute>
            <OrganizationForm />
          </PrivateRoute>
        } />

        <Route path="/organizations/edit/:id" element={
          <PrivateRoute>
            <OrganizationForm />
          </PrivateRoute>
        } />  
        
        <Route path="/organizations/details/:id" element={
          <PrivateRoute>
            <OrganizationDetails />
          </PrivateRoute>
        } />
        
        <Route path="/users/details/:id" element={
          <PrivateRoute>
            <UserDetails />
          </PrivateRoute>
        } />
        
        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;