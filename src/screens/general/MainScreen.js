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

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const { isAppLoading } = useAppContext();

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
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* The loading screen */}
      {isAppLoading && <LoadingScreen />}
    </View>
  );
};

export default MainScreen;
