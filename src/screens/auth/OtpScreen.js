import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { colors } from "../../components/metrics/colors";
import AuthHeader from "../../components/ui/AuthHeader";
import { styles } from "../../components/metrics/styles";
import axios from "axios";
import { CustomAlert } from "../../components/custom-ui/CustomAlert";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const OtpScreen = ({ route }) => {
  const [loading, setLoading] = React.useState(false);
  const [otpError, setOtpError] = React.useState(false);
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [isPassword2Shown, setIsPassword2Shown] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    otp: "",
    email: route.params.mail,
    newPassword: "",
    verifyPassword: "",
  });
  const { alert } = CustomAlert();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const resp = await axios.put(
        "https://api.agapechristianministries.com/api/users/reset_password",
        { ...userInfo }
      );

      console.log(resp.data);
      alert(
        false,
        "Your password has been changed successfully",
        "Password Changed"
      );
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
          className="text-white text-lg my-3 mt-10 ml-2 mb-2"
        >
          Ckeck your mail
        </Text>

        <Text
          style={styles.textregular}
          className="mb-5 text-white text-sm ml-2"
        >
          An otp has been sent to {route.params?.mail}
        </Text>

        <View>
          {/* mail */}
          <TextInput
            value={userInfo.otp}
            onChangeText={(e) => setUserInfo({ ...userInfo, otp: e })}
            className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white "
            style={[
              styles.textbold,
              { borderColor: otpError ? "red" : "white" },
            ]}
            placeholder="Enter otp"
            placeholderTextColor={"#A8A8A8"}
            cursorColor={colors.gold}
          />

          {/* error message for mail */}
          {otpError ? (
            <Text
              style={styles.textmedium}
              className="text-red-500 text-xs ml-2 mt-1"
            >
              Incorrect otp
            </Text>
          ) : null}

          {/* Password input */}
          <View className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row">
            <TextInput
              value={userInfo.newPassword}
              onChangeText={(e) => setUserInfo({ ...userInfo, newPassword: e })}
              style={styles.textbold}
              secureTextEntry={isPasswordShown ? false : true}
              className="text-xs text-white flex-1 mr-1"
              cursorColor={colors.gold}
              placeholder="New Password"
              placeholderTextColor={"#A8A8A8"}
            />

            <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
              {isPasswordShown ? (
                <Ionicons name="md-eye-outline" size={24} color="white" />
              ) : (
                <Ionicons name="md-eye-off-outline" size={24} color="white" />
              )}
            </Pressable>
          </View>

          {/* confirm password input */}
          <View
            style={{
              borderColor:
                userInfo.newPassword !== userInfo.verifyPassword
                  ? "red"
                  : "white",
            }}
            className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row"
          >
            <TextInput
              value={userInfo.verifyPassword}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, verifyPassword: e })
              }
              style={styles.textbold}
              secureTextEntry={isPassword2Shown ? false : true}
              className="text-xs text-white flex-1 mr-1"
              cursorColor={colors.gold}
              placeholder="Confirm Password"
              placeholderTextColor={"#A8A8A8"}
            />

            <Pressable onPress={() => setIsPassword2Shown(!isPassword2Shown)}>
              {isPassword2Shown ? (
                <Ionicons name="md-eye-outline" size={24} color="white" />
              ) : (
                <Ionicons name="md-eye-off-outline" size={24} color="white" />
              )}
            </Pressable>
          </View>

          {/* error message when passwords don't match */}
          {userInfo.newPassword !== userInfo.verifyPassword && (
            <Text
              style={styles.textmedium}
              className="text-red-500 text-xs mt-1 ml-2"
            >
              *Passwords don't match!
            </Text>
          )}

          <TouchableOpacity
            style={{
              opacity:
                userInfo.otp === "" ||
                userInfo.newPassword === "" ||
                userInfo.verifyPassword !== userInfo.verifyPassword ||
                loading
                  ? 0.5
                  : 1,
              backgroundColor: colors.gold,
            }}
            disabled={
              userInfo.otp === "" ||
              userInfo.newPassword === "" ||
              userInfo.verifyPassword !== userInfo.verifyPassword ||
              loading
                ? true
                : false
            }
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

export default OtpScreen;
