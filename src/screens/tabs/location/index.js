import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationTab from "./stack/LocationTab";
import LocationDetails from "./stack/LocationDetails";

const LocationStacks = () => {
  const LocationStack = createNativeStackNavigator();

  return (
    <LocationStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <LocationStack.Screen name="LocationScreen" component={LocationTab} />
      <LocationStack.Screen
        name="LocationDetails"
        component={LocationDetails}
      />
    </LocationStack.Navigator>
  );
};

export default LocationStacks;
