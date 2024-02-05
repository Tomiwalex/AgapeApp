import React from "react";
import axios from "axios"; // Make sure to import axios
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../components/url/url";
import { CustomAlert } from "../components/custom-ui/CustomAlert";
import { useNavigation } from "@react-navigation/native";

const useGetSignUp = ({ userInfo }) => {
  const { setAppLoading } = useAppContext();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const navigation = useNavigation();

  const { alert } = CustomAlert();

  // function to reset error to null
  const reset = () => {
    setError(null); //set error to null
  };

  const fetchData = async () => {
    try {
      setAppLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/users/register`,
        userInfo
      );

      setData(response.data);
      navigation.replace("Signin");
      alert(false, response.data.message);
    } catch (error) {
      console.log("Error from request:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx. Access the response data for more details.
        console.log("Server response data:", error.response.data);
        // console.log("Status code:", error.response.status);
        alert(true, error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(
          "No response received. The request was made but no response was received."
        );
        alert(
          true,
          "Network error, check your internet connection and try again"
        );
        // console.log("Request config:", error.config);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
        alert(true, "Something went wrong. Please try again later.");
      }

      setError(error);
    } finally {
      setAppLoading(false);
    }
  };

  const signup = () => {
    fetchData();
  };

  return { data, error, signup, reset };
};

export default useGetSignUp;
