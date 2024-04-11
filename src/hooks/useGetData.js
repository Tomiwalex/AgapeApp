import React, { useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useAppContext } from "../context/AppContext";
import { CustomAlert } from "../components/custom-ui/CustomAlert";
import useGetLoginToken from "./useGetLoginToken";

const useGetData = ({ url, data, setData, setLoading }) => {
  const { setAppLoading } = useAppContext();
  const [error, setError] = React.useState(null);
  const { alert } = CustomAlert();
  const { token } = useGetLoginToken();

  const fetchData = async () => {
    try {
      setLoading ? setLoading(true) : setAppLoading(true);
      const response = await axios.get(url, {
        headers: {
          "x-auth-token": token || "",
        },
      });

      console.log("response: ", response.data.message);
      setData((prev) => {
        return { ...prev, ...response.data };
      }); // setData(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        if (error.response.data.message === "No item match your search") {
          return;
        }
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

      // console.log(error.message);
    } finally {
      if (setLoading) {
        setLoading(false);
      } else {
        setAppLoading(false);
      }
    }
  };

  const fetchDetails = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, fetchDetails, fetchData };
};

export default useGetData;
