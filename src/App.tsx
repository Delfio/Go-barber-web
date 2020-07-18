import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import ToastContainer from './components/ToastCointainer';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <Signin />

      <ToastContainer />
    </AuthProvider>
  </>
);

export default App;
