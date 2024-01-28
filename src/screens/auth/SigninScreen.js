import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
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
import axios from "axios";

const SigninScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    emailOrUsername: "",
    password: "",
  });

  const { data, error, fetchDetails } = useGetLogin({ userInfo });

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
        <Animated.View
          entering={FadeIn}
          className="p-6 py-14 rounded-[39px] w-[90%] max-w-[394px]"
          style={{ backgroundColor: colors.mediumBlue }}
        >
          {/* Header */}
          <AuthHeader />

          {/* Welcome text */}
          <View className=" border-[#EFDA67] border-b-[3px] inline-block w-[141px] mt-5 ml-2">
            <Text
              style={styles.textsemibold}
              className="text-white text-lg top-[7]"
            >
              Welcome Back {""}
              {/* User's name should be inserted above if logged in */}
            </Text>
          </View>

          {/* The sign in form */}
          <View className="mt-7">
            {/* Mail input */}
            <TextInput
              className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white"
              value={userInfo.emailOrUsername}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, emailOrUsername: e })
              }
              style={styles.textbold}
              placeholder="example@gmail.com"
              placeholderTextColor={"#A8A8A8"}
              cursorColor={colors.gold}
            />

            {/* Password input */}
            <View className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row">
              <TextInput
                style={styles.textbold}
                secureTextEntry={isPasswordShown ? false : true}
                className="text-xm text-white flex-1 mr-1"
                value={userInfo.password}
                onChangeText={(e) => {setUserInfo({ ...userInfo, password: e });console.log(e)}}
                cursorColor={colors.gold}
              />

              <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
                {isPasswordShown ? (
                  <Ionicons name="md-eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="md-eye-off-outline" size={24} color="white" />
                )}
              </Pressable>
            </View>

            {/* Sign in button */}
            <TouchableOpacity
              disabled={
                !userInfo.emailOrUsername || !userInfo.password ? true : false
              }
              style={{
                opacity:
                  !userInfo.emailOrUsername || !userInfo.password ? 0.5 : 1,
                backgroundColor: colors.gold,
              }}
              onPress={fetchDetails}
              activeOpacity={0.7}
              className="p-4 mt-5 rounded-[17px]"
            >
              <Text
                className="text-center text-base"
                style={[styles.textbold, { color: colors.deepBlue }]}
              >
                Sign in
              </Text>
            </TouchableOpacity>

            {/* forgot password button */}
            <TouchableOpacity>
              <Text
                style={styles.textmedium}
                className="mt-5 text-center text-white text-xs underline"
              >
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* sign in with google */}
            <TouchableOpacity
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
            </TouchableOpacity>

            {/* Sign up option */}
            <Text
              style={styles.textmedium}
              className="text-white text-xs mt-3 text-center"
            >
              Don’t have an account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="underline top-1 text-xs "
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default SigninScreen;
