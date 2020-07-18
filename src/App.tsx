import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Signin />

    </AppProvider>
  </>
);

export default App;
