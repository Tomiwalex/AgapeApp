import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { styles } from "../../components/metrics/styles";
import { colors } from "../../components/metrics/colors";
import Animated, { FadeIn } from "react-native-reanimated";
import AuthHeader from "../../components/ui/AuthHeader";
import { Ionicons } from "@expo/vector-icons";
import googleIcon from "../../../assets/icons/google-icon.png";
import { useNavigation } from "@react-navigation/native";
import useGetLogin from "../../hooks/useGetLogin";
import { message } from "../../hooks/messageProps";
import { useAppContext } from "../../context/AppContext";

const SigninScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    emailOrUsername: "",
    password: "",
  });

  // function to run the login process
  const { error, fetchDetails, reset, loading } = useGetLogin({ userInfo });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={[{ backgroundColor: colors.lightBlue }]}
        className="flex-1 justify-center items-center"
      >
        <View
          // entering={FadeIn}
          className="p-6 py-14 rounded-[39px] w-[90%] max-w-[394px]"
          style={{ backgroundColor: colors.mediumBlue }}
        >
          {/* Header */}
          <AuthHeader />

          {/* Welcome text */}
          <View className="   mt-5 text-xl ml-2  w-[131px]">
            <Text
              style={styles.textsemibold}
              className="text-white text-lg top-[7] "
            >
              Welcome Back {""}
              {/* User's name should be inserted above if logged in */}
            </Text>
          </View>

          {/* The sign in form */}
          <View className="mt-7">
            {/* Mail or username input */}
            <TextInput
              className="text-xs  border-[1px] rounded-[17px] p-3 text-white"
              value={userInfo.emailOrUsername}
              onChangeText={(e) => {
                setUserInfo({ ...userInfo, emailOrUsername: e });
                reset();
              }}
              style={[
                styles.textbold,
                {
                  borderColor:
                    error == message.USER_DOES_NOT_EXIST ? "red" : "white",
                },
              ]}
              placeholder="email or username"
              placeholderTextColor={"#A8A8A8"}
              cursorColor={colors.gold}
              autoFocus={true}
            />

            {/* Password input */}
            <View
              style={{
                borderColor:
                  error == message.INVALID_PASSWORD ? "red" : "white",
              }}
              className="p-3  border-[1px] rounded-[17px] mt-7 flex-row"
            >
              <TextInput
                style={[styles.textbold]}
                secureTextEntry={isPasswordShown ? false : true}
                className="text-xm text-white flex-1 mr-1"
                value={userInfo.password}
                onChangeText={(e) => {
                  setUserInfo({ ...userInfo, password: e });
                  reset();
                }}
                cursorColor={colors.gold}
              />

              <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? (
                  <Ionicons name="eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="white" />
                )}
              </Pressable>
            </View>

            {/* forgot password button */}
            <TouchableOpacity
              className="block mb-7"
              onPress={() => navigation.navigate("Forgotpassword")}
            >
              <Text
                style={styles.textmedium}
                className="mt-2 text-right text-white text-xs underline"
              >
                Forgot password
              </Text>
            </TouchableOpacity>

            {/* Sign in button */}
            <TouchableOpacity
              disabled={
                !userInfo.emailOrUsername || !userInfo.password
                  ? true
                  : false || loading
              }
              style={{
                opacity:
                  !userInfo.emailOrUsername || !userInfo.password || loading
                    ? 0.5
                    : 1,
                backgroundColor: colors.gold,
              }}
              onPress={fetchDetails}
              activeOpacity={0.7}
              className="rounded-[17px] block flex-row gap-2 items-center justify-center pb-4 pt-2"
            >
              <Text
                className="text-center text-base"
                style={[styles.textbold, { color: colors.deepBlue }]}
              >
                Sign in
              </Text>
              {loading && <ActivityIndicator color={colors.deepBlue} />}
            </TouchableOpacity>

            {/* sign in with google */}
            {/* <TouchableOpacity
              onPress={() => null}
              activeOpacity={0.7}
              className="mt-7 border-[1px] border-white rounded-[17px] p-4 flex-row justify-center"
            >
              <Image source={googleIcon} className="w-6 h-6" />
              <Text
                className="text-center text-base text-white ml-2"
                style={[styles.textbold]}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity> */}

            {/* Sign up option */}
            <Text
              style={styles.textmedium}
              className="text-white text-xs mt-3 text-center"
            >
              Don’t have an account?{" "}
              <TouchableOpacity onPress={() => navigation.replace("Signup")}>
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="underline top-1 text-xs "
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SigninScreen;
