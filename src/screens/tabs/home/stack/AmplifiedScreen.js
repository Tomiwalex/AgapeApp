import { ScrollView, Text, View } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SectionCategory from "../../../../components/ui/SectionCategory";
import AmplifiedAbout from "../../../../components/section-about/AmplifiedAbout";
import AmplifiedCommunity from "../../../../components/section-community/AmplifiedCommunity";
import AmplifiedHome from "../../../../components/section-home/AmplifiedHome";

const AmplifiedScreen = () => {
  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3 pb-24">
      <SectionHeader
        name={"The Amplified Church"}
        type={2}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/amp-icon.png")}
      />

      <SectionCategory
        title={["Home", "About", "Community"]}
        firstContent={<AmplifiedHome />}
        secondContent={<AmplifiedAbout />}
        thirdContent={<AmplifiedCommunity />}
      />
    </View>
  );
};

export default AmplifiedScreen;
