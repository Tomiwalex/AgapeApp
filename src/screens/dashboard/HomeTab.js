import { View, Text, Image } from "react-native";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { styles } from "../../components/metrics/styles";
import not from "../../../assets/icons/notification-icon.png";
import ham from "../../../assets/icons/ham-menu-icon.png";
import logo from "../../../assets/icon.png";
import ScrollSection from "../../components/ui/ScrollSection";
import LoadingDot from "../loading/LoadingDot";
import { colors } from "../../components/metrics/colors";

const HomeTab = () => {
  const { setAppLoading } = useAppContext();
  return (
    <View style={styles.container} className="flex-1 bg-[#0a0a0c]">
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between">
        <Image source={ham} className="w-[24] h-[18px]" />

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <Image source={not} className="w-6 h-7" />
        </View>
      </View>

      <ScrollSection />

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

export default HomeTab;
