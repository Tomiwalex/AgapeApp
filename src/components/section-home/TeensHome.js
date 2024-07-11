import { RefreshControl, ScrollView } from "react-native";
import React from "react";
import SinglePost from "../ui/post/SinglePost";
import useHideTabBarOnScroll from "../../hooks/useHideTabBarOnScroll";
import useGetData from "../../hooks/useGetData";
import { colors } from "../metrics/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import PostSkeleton from "../skeletal-loading/PostSkeleton";
import NoPost from "../ui/post/NoPost";

const TeensHome = () => {
  const { handleScroll } = useHideTabBarOnScroll();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/posts/filter?audience=teen",
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
      className="pb-20"
    >
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
          {!data.data?.length && <NoPost />}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default TeensHome;
