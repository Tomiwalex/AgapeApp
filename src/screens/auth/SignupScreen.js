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
import { useNavigation } from "@react-navigation/native";
import googleIcon from "../../../assets/icons/google-icon.png";
import { Feather } from "@expo/vector-icons";
import { useAppContext } from "../../context/AppContext";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [isPassword2Shown, setIsPassword2Shown] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const { setAppLoading } = useAppContext();

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
        <Animated.View
          entering={FadeIn}
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
                className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white basis-[49%]"
                style={styles.textbold}
                placeholder="First Name"
                placeholderTextColor={"#fff"}
                cursorColor={colors.gold}
              />

              {/* Last name */}
              <TextInput
                className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white basis-[49%]"
                style={styles.textbold}
                placeholder="Last Name"
                placeholderTextColor={"#fff"}
                cursorColor={colors.gold}
              />
            </View>

            {/* mail */}
            <TextInput
              className="text-xs border-white border-[1px] rounded-[17px] p-3 text-white mt-7"
              style={styles.textbold}
              placeholder="Email"
              placeholderTextColor={"#fff"}
              cursorColor={colors.gold}
            />

            {/* Password input */}
            <View className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row">
              <TextInput
                style={styles.textbold}
                secureTextEntry={isPasswordShown ? false : true}
                className="text-xs text-white flex-1 mr-1"
                cursorColor={colors.gold}
                placeholder="Password"
                placeholderTextColor={"white"}
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
            <View className="p-3 border-white border-[1px] rounded-[17px] mt-7 flex-row">
              <TextInput
                style={styles.textbold}
                secureTextEntry={isPassword2Shown ? false : true}
                className="text-xs text-white flex-1 mr-1"
                cursorColor={colors.gold}
                placeholder="Confirm Password"
                placeholderTextColor={"white"}
              />

              <Pressable onPress={() => setIsPassword2Shown(!isPassword2Shown)}>
                {isPassword2Shown ? (
                  <Ionicons name="md-eye-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="md-eye-off-outline" size={24} color="white" />
                )}
              </Pressable>
            </View>
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
            onPress={() => {
              navigation.navigate("Dashboard");
            }}
            activeOpacity={0.7}
            style={{ backgroundColor: colors.gold }}
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
          <TouchableOpacity
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
          </TouchableOpacity>

          {/* Sign in option */}
          <Text
            style={styles.textmedium}
            className="text-white text-xs mt-3 text-center"
          >
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text
                style={[styles.textmedium, { color: colors.gold }]}
                className="underline top-1 text-xs "
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
