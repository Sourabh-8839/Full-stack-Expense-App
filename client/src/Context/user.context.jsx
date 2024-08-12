import { createContext, useContext, useState } from 'react';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const intialState = JSON.parse(localStorage.getItem('user'));

  const [account, setAccount] = useState(intialState);

  return (
    <userContext.Provider value={{ account, setAccount }}>
      {children}
    </userContext.Provider>
  );
};

export const useData = () => {
  return useContext(userContext);
};
