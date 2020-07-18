import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import api from '../services/apiClient';

interface SignInCredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: IUser;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
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

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
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
