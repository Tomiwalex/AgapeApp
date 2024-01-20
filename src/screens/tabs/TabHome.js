import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GivingTab from "./giving/GivingTab";
import HomeNavbar, {
  GivingNavbar,
  LocationNavbar,
} from "../../components/ui/Navbar";
import CustomTabBar from "../../components/custom-ui/CustomTabBar";
import HomeStacks from "./home";
import LocationStacks from "./location";

const DashboardScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* The home tab */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <HomeNavbar focused={focused} />;
          },
        }}
        name="Home"
      >
        {(props) => <HomeStacks {...props} />}
      </Tab.Screen>

      {/* The location tab */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <LocationNavbar focused={focused} />;
          },
        }}
        name="Location"
        component={LocationStacks}
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

export default DashboardScreen;
