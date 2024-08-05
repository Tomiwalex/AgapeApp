import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { colors } from "../../../../components/metrics/colors";
import NotificationSkeleton from "../../../../components/skeletal-loading/NotificationSkeleton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { styles } from "../../../../components/metrics/styles";
import useGetData from "../../../../hooks/useGetData";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const NotificationScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/announcements/get",
    data,
    setData,
    setLoading,
  });
  const navigation = useNavigation();

  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <View
        style={{ borderBottomColor: colors.gold }}
        className="border-b-[1px] pb-2"
      >
        <SectionHeader
          type={3}
          name={"Announcement"}
          image={require("../../../../../assets/icons/agape-icon.png")}
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
            {data.data &&
              data.data.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Notificationdetails", { data: item })
                  }
                  activeOpacity={0.7}
                  key={index}
                  className=" flex-row items-center mx-4 my-3 overflow-hidden"
                >
                  <View className="h-[70px] w-[107px] rounded-xl items-center justify-center bg-gray-800 overflow-hidden">
                    {item.banner && (
                      <Image
                        resizeMode="cover"
                        source={{ uri: item?.banner }}
                        className=" h-full w-full"
                      />
                    )}

                    {!item.banner && (
                      <MaterialCommunityIcons
                        name="image-off-outline"
                        size={24}
                        color="#ffffff50"
                      />
                    )}
                  </View>

                  <View className="mt-2 ml-2 relative overflow-hidden flex-1">
                    <Text
                      style={styles.textbold}
                      className="text-xl text-white"
                    >
                      {item?.title}
                    </Text>

                    <Text
                      style={styles.textmedium}
                      numberOfLines={2}
                      className="text-xs mt-1 text-white overflow-hidden overflow-ellipsis "
                    >
                      {item?.body}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;
