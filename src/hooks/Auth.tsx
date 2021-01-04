/* eslint-disable camelcase */
import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import api from '../services/apiClient';

type SignInCredentials = {
    email: string;
    password: string;
}

interface IAuthContext {
    user: IUser;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

type IUser = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

type IRequestData = {
    user: IUser;
    token: string;
}

type IAuthState = {
  token: string;
  user: IUser;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<IRequestData>('/users/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth só pode ser usado no contexto do AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
