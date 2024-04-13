import React from "react";
import axios from "axios"; // Make sure to import axios
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../components/url/url";
import { CustomAlert } from "../components/custom-ui/CustomAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import JWT from "expo-jwt";
import useGetLoginToken from "./useGetLoginToken";

export async function storeMail() {
  const token = await AsyncStorage.getItem("Token");
  try {
    console.log(token);
    const decodedToken = JWT.decode(token, null, {
      json: true,
    });
    await AsyncStorage.setItem("UserMail", decodedToken.email);
    console.log("user's mail stored successfully");
  } catch (error) {
    console.log("Error storing user's mail:", error.message);
  }
}

const useGetLogin = ({ userInfo }) => {
  const { setAppLoading } = useAppContext();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const { alert } = CustomAlert();
  const navigation = useNavigation();
  const { token: loginToken } = useGetLoginToken();

  // function to reset error to null
  const reset = () => {
    setError(null); //set error to null
  };

  const storeLoginToken = async (token) => {
    try {
      await AsyncStorage.setItem("Token", token); //set token in async storage
      console.log("token stored successfully");
    } catch (error) {
      console.error("Error storing login token:", error);
    }
  };

  const fetchData = async () => {
    try {
      setAppLoading(true);
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        emailOrUsername: userInfo.emailOrUsername,
        password: userInfo.password,
      });

      console.log(response.data.token, response.data.message, "response");
      setData(response.data);
      storeLoginToken(response.data.token);
      //store token in async storage
      navigation.replace("Dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        alert(true, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(
          "No response received. The request was made but no response was received."
        );
        console.log("Request config:", error.config);
        alert(true, "Something went wrong. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        alert(true, "Something went wrong. Please try again later.");
      }
    } finally {
      storeMail();
      setAppLoading(false);
    }
  };

  const fetchDetails = () => {
    fetchData();
  };

  return { data, error, fetchDetails, reset };
};

export default useGetLogin;
