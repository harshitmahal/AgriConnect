import React, { useState } from 'react';
import { UserContext } from './UserContext'; // Assuming UserContext.js

function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Or fetch user data from an API

  // Example function for logging in
  const login = (userData) => {
    setUser(userData);
  };

  // Example function for logging out
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;