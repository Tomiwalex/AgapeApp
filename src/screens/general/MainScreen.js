import { View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../auth/AuthScreen";
import SigninScreen from "../auth/SigninScreen";
import SignupScreen from "../auth/SignupScreen";
import LoadingScreen from "../loading/LoadingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "../../context/AppContext";
import { colors } from "../../components/metrics/colors";
import DashboardScreen from "../tabs/TabHome";
import { CustomAlert } from "../../components/custom-ui/CustomAlert";

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const { isAppLoading, isAlertVisible, alertDetails } = useAppContext();
  const { CustomAlertPopup } = CustomAlert();

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Auth"
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
            name="Dashboard"
            component={DashboardScreen}
            options={{
              statusBarColor: "#0e0e0e",
              animation: "fade",
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
};

export default MainScreen;
