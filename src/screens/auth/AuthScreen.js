import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { styles } from "../../components/metrics/styles";
import { colors } from "../../components/metrics/colors";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../components/ui/AuthHeader";
import Touchable from "../../components/custom-ui/Touchable";

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[{ backgroundColor: colors.lightBlue }]}
      className="flex-1 justify-center items-center "
    >
      <StatusBar backgroundColor={colors.mediumBlue} barStyle="light-content" />
      <View
        className="p-6 py-14 rounded-[39px] w-[90%] max-w-[394px]"
        style={{ backgroundColor: colors.mediumBlue }}
      >
        {/* Header */}
        <AuthHeader />

        {/* Body */}
        <View className="mt-5 ml-2">
          <View className=" border-[#EFDA67] border-b-[3px] inline-block w-[171px]">
            <Text
              style={styles.textsemibold}
              className="text-white text-lg top-[7]"
            >
              Welcome to Church
            </Text>
          </View>

          <Text
            style={styles.textmedium}
            className="text-white text-xs mt-3 max-w-[231px] mb-5"
          >
            Experience faith, fellowship, and inspiration at your fingertips
          </Text>
        </View>

        {/* Buttons */}
        {/* SIGN IN */}
        <Touchable
          radius={17}
          onPress={() => navigation.navigate("Signin")}
          activeOpacity={0.7}
          style={{ backgroundColor: colors.gold }}
          className="p-4  rounded-[17px]"
        >
          <Text
            className="text-center text-base"
            style={[styles.textbold, { color: colors.deepBlue }]}
          >
            Sign in
          </Text>
        </Touchable>

        {/* Sign up button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          activeOpacity={0.7}
          className="mt-5 border-[1px] hover:border-none focus:border-none border-white rounded-[17px] p-4 "
        >
          <Text
            className="text-center text-base text-white"
            style={[styles.textbold]}
          >
            Sign up
          </Text>
        </TouchableOpacity>

        {/* Continue as guest button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          activeOpacity={0.7}
          className="mt-5 border-[1px] hover:border-none focus:border-none border-white rounded-[17px] p-4 "
        >
          <Text
            className="text-center text-base text-white"
            style={[styles.textbold]}
          >
            Continue as guest
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;
