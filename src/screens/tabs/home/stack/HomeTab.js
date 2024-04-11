import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import not from "../../../../../assets/icons/notification-icon.png";
import ham from "../../../../../assets/icons/ham-menu-icon.png";
import logo from "../../../../../assets/icons/agape-icon.png";
import ScrollSection from "../../../../components/ui/ScrollSection";
import PostFlatlist from "../../../../components/ui/PostFlatlist";
import Menu from "../../../../components/ui/Menu";
import { useAppContext } from "../../../../context/AppContext";
import useHideTabBarOnScroll from "../../../../hooks/useHideTabBarOnScroll";
import NotificationIcon from "../../../../components/ui/NotificationIcon";
import { POST_URL } from "../../../../components/url/url";
import { colors } from "../../../../components/metrics/colors";
import SinglePost from "../../../../components/ui/post/SinglePost";
import useGetData from "../../../../hooks/useGetData";
import PostSkeleton from "../../../../components/skeletal-loading/PostSkeleton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { NotificationProcess } from "../../../../hooks/useGetNotification";

const HomeTab = () => {
  const [data, setData] = React.useState({});
  const [isMenuShown, setShowMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { setTabBarVisible } = useAppContext();
  const { handleScroll } = useHideTabBarOnScroll();
  const { error, fetchDetails } = useGetData({
    url: POST_URL,
    data,
    setData,
    setLoading,
  });

  // set the tab bar visible after 500ms
  useEffect(() => {
    setTimeout(() => {
      setTabBarVisible(true);
    }, 700);

    return () => {
      clearTimeout(setTabBarVisible);
    };
  }, []);

  return (
    <View className="flex-1 bg-[#0a0a0c]">
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
      >
        {/* Header */}
        <View className="p-5 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              setShowMenu(!isMenuShown);
              setTabBarVisible(false);
            }}
          >
            <Image source={ham} className="w-[24] h-[18px]" />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Image source={logo} className="w-[38px] h-9 mr-2" />
            <NotificationIcon />
          </View>
        </View>

        {/* The scroll section */}
        <ScrollSection />

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
                <SinglePost key={index} details={item} ash={true} />
              ))}

            <NotificationProcess />
          </Animated.View>
        )}
      </ScrollView>

      {/* the app menu */}
      {isMenuShown && <Menu setShowMenu={setShowMenu} />}
    </View>
  );
};

export default HomeTab;
