// AppContext.js
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAppLoading, setAppLoading] = useState(false);
  const [isTabBarVisible, setTabBarVisible] = useState(false);

  const contextValue = {
    isAppLoading,
    setAppLoading,
    isTabBarVisible,
    setTabBarVisible,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
