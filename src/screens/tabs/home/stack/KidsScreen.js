import { View } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SectionCategory from "../../../../components/ui/SectionCategory";
import KidsHome from "../../../../components/section-home/KidsHome";
import KidsAbout from "../../../../components/section-about/KidsAbout";
import KidsCommunity from "../../../../components/section-community/KidsCommunity";

const KidsScreen = () => {
  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3 pb-24">
      <SectionHeader
        type={2}
        name={"E-kids"}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/kids-icon.png")}
      />

      <SectionCategory
        title={["Home", "About", "Community"]}
        firstContent={<KidsHome />}
        secondContent={<KidsAbout />}
        thirdContent={<KidsCommunity />}
      />
    </View>
  );
};

export default KidsScreen;
