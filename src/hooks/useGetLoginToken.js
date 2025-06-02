import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetLoginToken = () => {
  const [token, setToken] = React.useState(null);

  const fetchToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("Token");
      setToken(() => storedToken || null);
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchToken();
  }, []);

  return { token };
};

export default useGetLoginToken;
