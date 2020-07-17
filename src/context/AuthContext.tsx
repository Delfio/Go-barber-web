import React, { createContext, useCallback, useState } from 'react';
import api from '../services/apiClient';

interface SignInCredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: IUser;
    signIn(credentials: SignInCredentials): Promise<void>;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: any;
}

interface IRequestData{
    User: IUser;
    token: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<IRequestData>('/sessions', {
      email,
      password,
    });

    const { token, User } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(User));

    setData({ token, user: User });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
