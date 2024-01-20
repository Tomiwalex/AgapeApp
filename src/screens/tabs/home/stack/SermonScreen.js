import { ScrollView, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SinglePost from "../../../../components/ui/post/SinglePost";
import { AgapePostCustomData } from "../../../../data/customPost";

const SermonScreen = () => {
  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      className="bg-[#0e0e0e] flex-1 pt-3 pb-24"
    >
      <SectionHeader
        type={1}
        name={"Sermon"}
        image={require("../../../../../assets/icon.png")}
      />

      <SinglePost details={AgapePostCustomData[0]} />
      <SinglePost details={AgapePostCustomData[0]} />
      <SinglePost details={AgapePostCustomData[0]} />
      <SinglePost details={AgapePostCustomData[0]} />
    </ScrollView>
  );
};

export default SermonScreen;
