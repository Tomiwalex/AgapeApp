import { Text } from "react-native";
import { colors } from "../../components/metrics/colors";
import AuthHeader from "../../components/ui/AuthHeader";
import { styles } from "../../components/metrics/styles";
import axios from "axios";
import { CustomAlert } from "../../components/custom-ui/CustomAlert";

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { alert } = CustomAlert();

  const [inputError, setInputError] = React.useState({
    mailError: false,
  });

  // function to check if the email is valid
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setInputError({ ...inputError, mailError: false });
    } else {
      setInputError({ ...inputError, mailError: true });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const resp = await axios.put(
        "https://api.agapechristianministries.com/api/users/reset_password_link",
        { email: email }
      );

      console.log(resp.data);
    } catch (error) {
      if (error.response) {
        alert(true, error?.response?.data.message);
      } else if (error.request) {
        alert(true, "Something went wrong. Please try again later.");
      } else {
        alert(true, "Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[{ backgroundColor: colors.lightBlue }]}
      className="flex-1 justify-center items-center"
    >
      <View
        className="p-6 py-14 rounded-[39px] w-[90%] max-w-[394px]"
        style={{ backgroundColor: colors.mediumBlue }}
      >
        {/* Header */}
        <AuthHeader />

        <Text
          style={styles.textsemibold}
          className="text-white text-lg my-6 mt-10 ml-2"
        >
          Enter your mail
        </Text>

        <View>
          {/* mail */}
          <TextInput
            value={email}
            onChangeText={(e) => {
              setEmail(e);
              isEmailValid(e);
            }}
            className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white "
            style={[
              styles.textbold,
              { borderColor: inputError.mailError ? "red" : "white" },
            ]}
            placeholder="Email"
            placeholderTextColor={"#fff"}
            cursorColor={colors.gold}
            keyboardType="email-address"
          />

          {/* error message for mail */}
          {inputError.mailError ? (
            <Text
              style={styles.textmedium}
              className="text-red-500 text-xs ml-2 mt-1"
            >
              *Input a valid mail!
            </Text>
          ) : null}

          <TouchableOpacity
            style={{
              opacity: !email || inputError.mailError || loading ? 0.5 : 1,
              backgroundColor: colors.gold,
            }}
            disabled={!email || inputError.mailError || loading ? true : false}
            activeOpacity={0.7}
            className="p-4 mt-10 rounded-[17px] items-center"
            onPress={handleSubmit}
          >
            <Text
              className="text-center text-base"
              style={[styles.textbold, { color: colors.deepBlue }]}
            >
              {loading ? (
                <ActivityIndicator color={"white"} size={"small"} />
              ) : (
                "Next"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
