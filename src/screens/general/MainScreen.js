import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../auth/AuthScreen";
import SignupScreen from "../auth/SignupScreen";
import SigninScreen from "../auth/SigninScreen";
import LoadingScreen from "../loading/LoadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../components/metrics/colors";
import DashboardScreen from "../tabs/TabHome";
import { CustomAlertPopup } from "../../components/custom-ui/CustomAlert";
import useGetLoginToken from "../../hooks/useGetLoginToken";
import ForgotPasswordScreen from "../auth/ForgotPasswordScreen";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OtpScreen from "../auth/OtpScreen";
import OnboardingScreen from "./OnboardingScreen";

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const { isAppLoading, isAlertVisible, alertDetails } = useAppContext();
  const { token } = useGetLoginToken();
  const [isUserSignedin, setIsUserSignedin] = React.useState(null);
  const [isUserFirstLaunch, setUserFirstLaunch] = React.useState(null);
  SplashScreen.preventAutoHideAsync();

  const handleUserFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("FirstLaunch");

      if (value === null) {
        setUserFirstLaunch(true);
        await AsyncStorage.setItem("FirstLaunch", "false");
      } else if (value === "false") {
        setUserFirstLaunch(false);
      }
      console.log(value);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const handleSignedIn = async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        if (token) {
          setIsUserSignedin(true);
        } else {
          setIsUserSignedin(false);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    handleUserFirstLaunch();
    handleSignedIn();
  }, []);

  if (isUserSignedin !== null) {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false, animation: "slide_from_left" }}
          >
            {isUserFirstLaunch && (
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{
                  statusBarTranslucent: true,
                }}
              />
            )}

            {isUserSignedin === false && (
              <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{
                  statusBarColor: colors.lightBlue,
                }}
              />
            )}

            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                statusBarColor: "#0a0a0c",
                animation: "slide_from_left",
              }}
            />

            <Stack.Screen
              name="Auth2"
              component={AuthScreen}
              options={{
                statusBarColor: colors.lightBlue,
              }}
            />

            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{
                statusBarColor: colors.lightBlue,
                animation: "slide_from_left",
                animationTypeForReplace: "pop",
              }}
            />

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                statusBarColor: colors.lightBlue,
              }}
            />
            <Stack.Screen
              name="Forgotpassword"
              component={ForgotPasswordScreen}
              options={{
                statusBarColor: colors.lightBlue,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={OtpScreen}
              options={{
                statusBarColor: colors.lightBlue,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>

        {/* The loading screen */}
        {isAppLoading && <LoadingScreen />}

        {/* the alert pop up */}
        {isAlertVisible && <CustomAlertPopup details={alertDetails} />}
      </View>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default MainScreen;
