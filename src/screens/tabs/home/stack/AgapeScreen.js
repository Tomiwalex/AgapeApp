import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SectionCategory from "../../../../components/ui/SectionCategory";
import AgapeHome from "../../../../components/section-home/AgapeHome";
import AgapeAbout from "../../../../components/section-about/AgapeAbout";
import AgapeCommunity from "../../../../components/section-community/AgapeCommunity";

const AgapeScreen = () => {
  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <SectionHeader
        type={1}
        name={"Agape Christian Ministries"}
        image={require("../../../../../assets/icons/agape-icon.png")}
      />

      {/* Section category */}
      <SectionCategory
        title={["Home", "About", "Community"]}
        firstContent={<AgapeHome />}
        secondContent={<AgapeAbout />}
        thirdContent={<AgapeCommunity />}
      />
    </View>
  );
};

export default AgapeScreen;
