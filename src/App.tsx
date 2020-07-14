import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthContext, AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <Signin />
    </AuthProvider>
  </>
);

export default App;
