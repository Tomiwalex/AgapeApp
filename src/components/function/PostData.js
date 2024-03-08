import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { CustomAlert } from "../custom-ui/CustomAlert";

export const PostData = ({ url, data }) => {
  const { alert } = CustomAlert();
  const { setAppLoading } = useAppContext();

  const postData = async () => {
    try {
      setAppLoading(true);
      // console.log(url, "jcgfjdfbdj", data);
      const response = await axios.post(url, data);
      alert(false, response.data.message, "Success");
      console.log("submitted");
    } catch (error) {
      alert(
        true,
        `Something went wrong. Please try again later. ${error.message}`
      );
    } finally {
      setAppLoading(false);
    }
  };

  return { postData };
};
