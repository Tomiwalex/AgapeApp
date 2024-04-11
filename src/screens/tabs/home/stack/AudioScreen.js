import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";

const AudioScreen = () => {
  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3 pb-24">
      <SectionHeader
        type={2}
        name={"Sermons(Audio)"}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/audio-icon.png")}
      />
      <View className="border-t-[1px] border-t-[#F0DA6B]"></View>
    </View>
  );
};

export default AudioScreen;
