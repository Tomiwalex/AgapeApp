import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GivingTab from "./stack/GivingTab";

const GivingStacks = () => {
  const GivingStack = createNativeStackNavigator();

  return (
    <GivingStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <GivingStack.Screen name="LocationScreen" component={GivingTab} />
    </GivingStack.Navigator>
  );
};

export default GivingStacks;
