import React, { createContext, useState, useContext } from 'react';

// Membuat konteks
const LoginContext = createContext();

// Provider untuk LoginContext
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    var nama = JSON.parse(localStorage.getItem('user'));
    if (nama) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    return nama;
  };

  const login = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, checkLoginStatus, login, logout}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);