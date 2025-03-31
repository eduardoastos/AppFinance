import { api } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  nameOrganization: string;
}

export interface LoginResponse {
  sendMFACode: boolean;
  message: string;
  email: string;
}

export interface MfaResponse {
  access_token: string;
  userId: string;
  organizationId: string[];
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  },

  async verifyMfa(email: string, code: string): Promise<MfaResponse> {
    const response = await api.post('/api/auth/mfa', {
      email,
      code
    });
    return response.data;
  }
}; 