import React, { createContext, useCallback } from 'react';
import api from '../services/apiClient';

interface SignInCredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Delfio', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
