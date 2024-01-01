import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./HomeTab";
import LocationTab from "./LocationTab";
import GivingTab from "./GivingTab";
import HomeNavbar, {
  GivingNavbar,
  LocationNavbar,
} from "../../components/ui/Navbar";

const DasboardScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          alignItems: "center",
          height: 64,
          width: "85%",
          marginHorizontal: "7.5%",
          marginBottom: 10,
          borderRadius: 21,
          backgroundColor: "#14338366",
          shadowColor: "transparent",
          elevation: 0,
          position: "absolute",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <HomeNavbar focused={focused} />;
          },
        }}
        name="Home"
        component={HomeTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <LocationNavbar focused={focused} />;
          },
        }}
        name="Location"
        component={LocationTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <GivingNavbar focused={focused} />;
          },
        }}
        name="Giving"
        component={GivingTab}
      />
    </Tab.Navigator>
  );
};

export default DasboardScreen;
