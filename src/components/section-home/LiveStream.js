import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import useGetData from "../../hooks/useGetData";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

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
      {loading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          //   style={{ display: "flex" }}
          className="flex flex-1 items-center justify-center bg-red-100 h-full my-auto"
        >
          <ActivityIndicator color={"white"} size={"large"} />
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default LiveStream;
