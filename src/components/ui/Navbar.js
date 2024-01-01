import { View, Text, Image } from "react-native";
import React from "react";
import whiteHome from "../../../assets/icons/hometab-white-icon.png";
import goldHome from "../../../assets/icons/hometab-gold-icon.png";
import { styles } from "../metrics/styles";
import { EvilIcons } from "@expo/vector-icons";
const HomeNavbar = ({ focused }) => {
  return (
    <View className="justify-center items-center">
      <Image source={focused ? goldHome : whiteHome} className="w-[22px] h-5" />

      <Text
        className="text-white text-xs mt-1"
        style={[styles.textregular, { color: focused ? "#EFDA67" : "white" }]}
      >
        Home
      </Text>
    </View>
  );
};
export const LocationNavbar = ({ focused }) => {
  return (
    <View className="justify-center items-center">
      <EvilIcons
        name="location"
        size={24}
        color={focused ? "#EFDA67" : "white"}
      />
      <Text
        className="text-white text-xs mt-1"
        style={[styles.textregular, { color: focused ? "#EFDA67" : "white" }]}
      >
        Location
      </Text>
    </View>
  );
};
export const GivingNavbar = ({ focused }) => {
  return (
    <View className="justify-center items-center ">
      <EvilIcons name="heart" size={24} color={focused ? "#EFDA67" : "white"} />
      <Text
        className="text-white text-xs mt-1"
        style={[styles.textregular, { color: focused ? "#EFDA67" : "white" }]}
      >
        Giving
      </Text>
    </View>
  );
};

export default HomeNavbar;
