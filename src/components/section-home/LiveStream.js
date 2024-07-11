import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import useGetData from "../../hooks/useGetData";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import NoPost from "../ui/post/NoPost";
import PostSkeleton from "../skeletal-loading/PostSkeleton";

const LiveStream = () => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState({});

  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/streams/livestreams",
    data,
    setData,
    setLoading,
  });

  return (
    <ScrollView className="flex-1" vertical>
      {/* the post skeleton loader */}
      {loading && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </Animated.View>
      )}
      {!loading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          //   style={{ display: "flex" }}
          className="flex flex-1 items-center justify-center h-full my-auto"
        >
          {!data.data?.length && <NoPost title="Livestream" />}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default LiveStream;
