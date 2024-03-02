// AppContext.js
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAppLoading, setAppLoading] = useState(true);
  const [isTabBarVisible, setTabBarVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    error: false,
    text: "",
    head: "",
  });

  const contextValue = {
    isAppLoading,
    setAppLoading,
    isTabBarVisible,
    setTabBarVisible,
    isAlertVisible,
    setAlertVisible,
    alertDetails,
    setAlertDetails,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
