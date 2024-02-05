import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { colors } from "../../../../components/metrics/colors";

const NotificationScreen = () => {
  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <View
        style={{ borderBottomColor: colors.gold }}
        className="border-b-[1px] pb-2"
      >
        <SectionHeader
          type={3}
          name={"Announcement"}
          image={require("../../../../../assets/icon.png")}
          image2={require("../../../../../assets/icons/notification-icon.png")}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
