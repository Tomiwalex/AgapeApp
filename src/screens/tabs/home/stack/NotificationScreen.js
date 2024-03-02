import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { colors } from "../../../../components/metrics/colors";
import NotificationSkeleton from "../../../../components/skeletal-loading/NotificationSkeleton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { styles } from "../../../../components/metrics/styles";
import useGetData from "../../../../hooks/useGetData";

const NotificationScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/announcements/get",
    data,
    setData,
    setLoading,
  });

  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <View
        style={{ borderBottomColor: colors.gold }}
        className="border-b-[1px] pb-2"
      >
        <SectionHeader
          type={3}
          name={"Announcement"}
          image={require("../../../../../assets/icon.png")}
          image2={require("../../../../../assets/icons/notification-icon.png")}
        />
      </View>

      {/* notifaction skeletal loading */}
      {loading && (
        <Animated.View entering={FadeIn} exiting={FadeOut} className="mt-3">
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </Animated.View>
      )}

      {/* the notifications */}
      {!loading && (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <Animated.View entering={FadeIn} exiting={FadeOut} className="mt-3">
            <TouchableOpacity
              onPress={fetchDetails}
              activeOpacity={0.7}
              className=" flex-row items-center mx-4 my-3 overflow-hidden"
            >
              <Image
                resizeMode="contain"
                className="bg-gray-800 "
                style={{ height: 70, width: 107, borderRadius: 14 }}
              />

              <View className="mt-2 ml-2 relative overflow-hidden flex-1">
                <Text style={styles.textbold} className="text-xl text-white">
                  Testing
                </Text>

                <Text
                  style={styles.textmedium}
                  numberOfLines={2}
                  className="text-xs text-white overflow-hidden overflow-ellipsis "
                >
                  This is a test notification, notification reloads on press
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;
