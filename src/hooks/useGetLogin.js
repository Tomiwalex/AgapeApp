import React, { useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../components/url/url";
import { Alert } from "react-native";
import { stringify } from "postcss";

const useGetLogin = ({ userInfo }) => {
  const { setAppLoading } = useAppContext();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    try {
      setAppLoading(true);
      const response = await axios.post(
        `https://api.agapechristianministries.com/api/users/login`,
        {
          emailOrUsername: "kdqsjfeq",
          password: "tomiwa218",
        }
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

  const fetchDetails = () => {
    fetchData();
  };

  return { data, error, fetchDetails };
};

export default useGetLogin;
