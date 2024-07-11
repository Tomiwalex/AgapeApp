import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SectionCategory from "../../../../components/ui/SectionCategory";
import LiveStream from "../../../../components/section-home/LiveStream";
import NoPost from "../../../../components/ui/post/NoPost";

const StreamScreen = () => {
  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <SectionHeader
        image={require("../../../../../assets/icons/agape-icon.png")}
        type={2}
        name={"Streams"}
        image2={require("../../../../../assets/icons/stream-gold-icon.png")}
      />

      <SectionCategory
        title={["Recent", "Podcast", "Livestream"]}
        firstContent={<NoPost title={"Stream"} />}
        secondContent={<NoPost title="Podcast" />}
        thirdContent={<LiveStream />}
      />
    </View>
  );
};

export default StreamScreen;
