import { Box } from '@chakra-ui/react';
import './App.css';

import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { UserProvider } from './Context';

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
