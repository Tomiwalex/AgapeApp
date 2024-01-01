import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../../components/metrics/styles";
import not from "../../../assets/icons/notification-icon.png";
import logo from "../../../assets/icon.png";
import LoadingDot from "../loading/LoadingDot";
import { colors } from "../../components/metrics/colors";

const LocationTab = () => {
  return (
    <View style={styles.container} className="flex-1 bg-[#0a0a0c]">
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between border-b-[1px] border-b-[#F0DA6B]">
        <Text style={styles.textbold} className="text-white text-2xl">
          Locations
        </Text>

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <Image source={not} className="w-6 h-7" />
        </View>
      </View>

      <View className="items-center justify-center flex-1">
        <Text
          className="text-base mb-2"
          style={[styles.textmedium, { color: colors.gold }]}
        >
          STILL BUILDING
        </Text>
        <LoadingDot />
      </View>
    </View>
  );
};

export default LocationTab;
