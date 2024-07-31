import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../../components/metrics/styles";
import { colors } from "../../components/metrics/colors";
import Animated, { FadeIn } from "react-native-reanimated";
import AuthHeader from "../../components/ui/AuthHeader";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import googleIcon from "../../../assets/icons/google-icon.png";
import { Feather } from "@expo/vector-icons";
import useGetSignUp from "../../hooks/useGetSignUp";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [isPassword2Shown, setIsPassword2Shown] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [inputError, setInputError] = React.useState({
    mailError: false,
    verifyPasswordError:
      userInfo.password !== userInfo.verifyPassword ? true : false,
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

  // reseting all the states when the component is unmounted
  useEffect(() => {
    return () => {
      setUserInfo({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
      });
    };
  }, []);

  const { data, error, signup } = useGetSignUp({ userInfo });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      contentContainerStyle={{
        backgroundColor: colors.lightBlue,
        paddingVertical: 30,
      }}
    >
      <View
        style={[styles.container]}
        className="flex-1 justify-center items-center"
      >
        <View
          className="p-6 py-14 rounded-[39px] w-[90%] max-w-[394px]"
          style={{ backgroundColor: colors.mediumBlue }}
        >
          {/* Header */}
          <AuthHeader />

          {/* the sign up form */}
          <View className="mt-7">
            {/* the name input */}
            <View className="flex-row justify-between">
              {/* Frst name */}
              <TextInput
                value={userInfo.firstName}
                onChangeText={(e) => setUserInfo({ ...userInfo, firstName: e })}
                className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white basis-[49%]"
                style={styles.textbold}
                placeholder="First Name"
                placeholderTextColor={"#fff"}
                cursorColor={colors.gold}
                autoFocus={true}
              />

              {/* Last name */}
              <TextInput
                value={userInfo.lastName}
                onChangeText={(e) => setUserInfo({ ...userInfo, lastName: e })}
                className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white basis-[49%]"
                style={styles.textbold}
                placeholder="Last Name"
                placeholderTextColor={"#fff"}
                cursorColor={colors.gold}
              />
            </View>

            {/* username */}
            <TextInput
              value={userInfo.username}
              onChangeText={(e) => setUserInfo({ ...userInfo, username: e })}
              className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white mt-7"
              style={styles.textbold}
              placeholder="Username"
              placeholderTextColor={"#fff"}
              cursorColor={colors.gold}
              keyboardType="email-address"
            />

            {/* mail */}
            <TextInput
              value={userInfo.email}
              onChangeText={(e) => {
                setUserInfo({ ...userInfo, email: e });
                isEmailValid(e);
              }}
              className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white mt-7"
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

            {/* Password input */}
            <View className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row">
              <TextInput
                value={userInfo.password}
                onChangeText={(e) => setUserInfo({ ...userInfo, password: e })}
                style={styles.textbold}
                secureTextEntry={isPasswordShown ? false : true}
                className="text-xs text-white flex-1 mr-1"
                cursorColor={colors.gold}
                placeholder="Password"
                placeholderTextColor={"white"}
              />

              <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? (
                  <Ionicons name="eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="white" />
                )}
              </Pressable>
            </View>

            {/* confirm password input */}
            <View
              style={{
                borderColor:
                  userInfo.password !== userInfo.verifyPassword
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
                placeholderTextColor={"white"}
              />

              <Pressable onPress={() => setIsPassword2Shown(!isPassword2Shown)}>
                {isPassword2Shown ? (
                  <Ionicons name="eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="eye-off-outline" size={24} color="white" />
                )}
              </Pressable>
            </View>

            {/* error message when passwords don't match */}
            {userInfo.password !== userInfo.verifyPassword && (
              <Text
                style={styles.textmedium}
                className="text-red-500 text-xs mt-1 ml-2"
              >
                *Passwords don't match!
              </Text>
            )}
          </View>

          {/* agree to privacy policy */}
          <View className="my-8 flex-row items-center justify-center">
            {/* checkbox */}
            <Pressable
              onPress={() => setIsChecked(!isChecked)}
              className="w-5 h-5 border-[1px] rounded mr-2 border-[#EFDA67]"
            >
              {isChecked && (
                <Feather name="check" size={18} color={colors.gold} />
              )}
            </Pressable>
            <Text
              style={styles.textmedium}
              className="text-white text-xs text-center"
            >
              I Agree with{" "}
              <TouchableOpacity onPress={() => null}>
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="underline top-1 mx-[2px] text-xs "
                >
                  Privacy
                </Text>
              </TouchableOpacity>
              and{" "}
              <TouchableOpacity onPress={() => null}>
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="underline top-1 text-xs "
                >
                  Policy
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          {/* sign up button */}
          <TouchableOpacity
            onPress={signup}
            activeOpacity={0.7}
            disabled={
              userInfo.firstName !== "" &&
              inputError.mailError === false &&
              userInfo.password == userInfo.verifyPassword &&
              userInfo.lastName !== "" &&
              userInfo.email !== "" &&
              userInfo.password !== "" &&
              userInfo.username !== "" &&
              userInfo.verifyPassword !== "" &&
              isChecked
                ? false
                : true
            }
            style={{
              backgroundColor: colors.gold,
              opacity:
                userInfo.firstName !== "" &&
                inputError.mailError === false &&
                userInfo.password == userInfo.verifyPassword &&
                userInfo.lastName !== "" &&
                userInfo.email !== "" &&
                userInfo.password !== "" &&
                userInfo.username !== "" &&
                userInfo.verifyPassword !== "" &&
                isChecked
                  ? 1
                  : 0.7,
            }}
            className="p-4 rounded-[17px]"
          >
            <Text
              className="text-center text-base"
              style={[styles.textbold, { color: colors.deepBlue }]}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          {/* sign up with google button */}
          {/* <TouchableOpacity
            onPress={() => null}
            activeOpacity={0.7}
            className="mt-7 border-[1px] border-white rounded-[17px] p-4 flex-row justify-center "
          >
            <Image source={googleIcon} className="w-6 h-6" />
            <Text
              className="text-center text-base text-white ml-2"
              style={[styles.textbold]}
            >
              Sign in with Google
            </Text>
          </TouchableOpacity> */}

          {/* Sign in option */}
          <Text
            style={styles.textmedium}
            className="text-white text-xs mt-3 text-center"
          >
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.replace("Signin")}>
              <Text
                style={[styles.textmedium, { color: colors.gold }]}
                className="underline top-1 text-xs "
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
