import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthContext.Provider value={{ name: 'Delfio' }}>
      <Signin />
    </AuthContext.Provider>
  </>
);

export default App;
