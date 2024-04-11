import { RefreshControl, ScrollView } from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import SinglePost from "../../../../components/ui/post/SinglePost";
import useHideTabBarOnScroll from "../../../../hooks/useHideTabBarOnScroll";
import useGetData from "../../../../hooks/useGetData";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { colors } from "../../../../components/metrics/colors";
import PostSkeleton from "../../../../components/skeletal-loading/PostSkeleton";

const SermonScreen = () => {
  const { handleScroll } = useHideTabBarOnScroll();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/sermons/get",
    data,
    setData,
    setLoading,
  });
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={fetchDetails}
          colors={[colors.deepBlue, colors.mediumBlue, colors.lightBlue]}
          progressViewOffset={10}
        />
      }
      onScroll={handleScroll}
      vertical
      showsVerticalScrollIndicator={false}
      className="bg-[#0e0e0e] flex-1 pt-3 pb-24"
    >
      <SectionHeader
        type={1}
        name={"Sermon"}
        image={require("../../../../../assets/icons/agape-icon.png")}
      />

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
          className="pb-[10px]"
        >
          {data?.data &&
            data.data?.map((item, index) => (
              <SinglePost key={index} details={item} ash={false} />
            ))}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default SermonScreen;
