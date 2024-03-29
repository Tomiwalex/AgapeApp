import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GivingTab from "./stack/GivingTab";
import WebviewPage from "../../../components/custom-ui/Webview";

const GivingStacks = () => {
  const GivingStack = createNativeStackNavigator();

  return (
    <GivingStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <GivingStack.Screen name="LocationScreen" component={GivingTab} />
      <GivingStack.Screen name="Webview" component={WebviewPage} />
    </GivingStack.Navigator>
  );
};

export default GivingStacks;
