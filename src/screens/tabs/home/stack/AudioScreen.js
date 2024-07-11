import { View, Text } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import NoPost from "../../../../components/ui/post/NoPost";

const AudioScreen = () => {
  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3 pb-24">
      <SectionHeader
        type={2}
        name={"Sermons(Audio)"}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/audio-icon.png")}
      />
      <View className="border-t-[1px] border-t-[#F0DA6B] flex-1">
        {/* the post skeleton loader */}

        <NoPost title="Audio" />
        {/* {loading && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </Animated.View>
        )} */}
      </View>
    </View>
  );
};

export default AudioScreen;
