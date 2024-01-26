import React from "react";
import axios from "axios"; // Make sure to import axios
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../components/url/url";
import { Alert } from "react-native";

const useGetSignUp = ({ userInfo }) => {
  const { setAppLoading } = useAppContext();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    try {
      setAppLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        userInfo
      );

      console.log(userInfo);
      const json = await response.json();
      setData(json);
      console.log(response);
      console.log("done....");
    } catch (error) {
      setError(error);
      Alert.alert(error.message);
    } finally {
      setAppLoading(false);
    }
  };

  const signup = () => {
    fetchData();
  };

  return { data, error, signup };
};

export default useGetSignUp;
