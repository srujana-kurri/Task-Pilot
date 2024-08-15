import axios from 'axios';
import React, { createContext, useContext, useState, useEffect,useMemo } from 'react';

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const id = sessionStorage.getItem('id') || localStorage.getItem('id');
    if (user === null || user.id !== id) {
      
      axios.get(`http://localhost:4000/show/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
