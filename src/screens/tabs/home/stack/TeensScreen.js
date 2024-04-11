import { ScrollView, View } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SectionCategory from "../../../../components/ui/SectionCategory";
import TeensHome from "../../../../components/section-home/TeensHome";
import TeensAbout from "../../../../components/section-about/TeensAbout";
import TeensCommunity from "../../../../components/section-community/TeensCommunity";

const TeensScreen = () => {
  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3 pb-24">
      <SectionHeader
        type={2}
        name={"e-Teens"}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/teen-icon.png")}
      />

      <SectionCategory
        title={["Home", "About", "Community"]}
        firstContent={<TeensHome />}
        secondContent={<TeensAbout />}
        thirdContent={<TeensCommunity />}
      />
    </View>
  );
};

export default TeensScreen;
