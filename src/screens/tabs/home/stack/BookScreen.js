import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../components/metrics/colors";
import { styles } from "../../../../components/metrics/styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetData from "../../../../hooks/useGetData";
import useHideTabBarOnScroll from "../../../../hooks/useHideTabBarOnScroll";
import BookSkeleton from "../../../../components/skeletal-loading/BookSkeleton";
import NoPost from "../../../../components/ui/post/NoPost";

const BookScreen = () => {
  const [signedIn, setSignedIn] = React.useState(null);
  const navigation = useNavigation();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { handleScroll } = useHideTabBarOnScroll();
  const { error, fetchDetails } = useGetData({
    url: "https://api.agapechristianministries.com/api/books/get/",
    data,
    setData,
    setLoading,
  });
  // console.log(data);

  useEffect(() => {
    const handleSigned = async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token === null) {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    };

    handleSigned();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      className="bg-[#0e0e0e] flex-1 pt-3 pb-24"
    >
      <SectionHeader
        type={2}
        name={"Books"}
        image={require("../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../assets/icons/book-icon.png")}
      />

      <View className="border-t-[1px] border-t-[#F0DA6B] flex-1 mt-1">
        {signedIn === false && (
          <Animated.View
            entering={FadeIn}
            style={{
              borderColor: colors.goldOpacity,
              borderWidth: 1,
            }}
            className="bg-black border-[1px] rounded-[33px] p-5 m-5 items-center py-20 mt-auto"
          >
            <MaterialIcons name="error-outline" size={80} color="#fcfcfc" />

            <Text
              style={styles.textregular}
              className="text-gray-200 text-sm leading-5 text-center my-5"
            >
              Please sign in to continue to use this feature.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
              style={{ borderColor: colors.goldOpacity }}
              className=" rounded-3xl border-[1px] mt-5"
            >
              <Text
                style={styles.textbold}
                className="text-white text-base w-full p-4 px-20"
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* if user is signed in */}
        {signedIn === true && (
          <Animated.View entering={FadeIn}>
            {loading && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <BookSkeleton />
                <BookSkeleton />
                <BookSkeleton />
                <BookSkeleton />
              </Animated.View>
            )}

            {!loading && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="pb-[10px]"
              >
                {data?.data &&
                  data?.data.map((item, index) => (
                    <View
                      key={index}
                      className="py-6 px-4 border-b-[1px] flex-row items-center"
                    >
                      <Image
                        resizeMode="cover"
                        className="h-[76px] w-[107px] rounded-[14px] mr-3"
                        source={{ uri: item?.cover_image }}
                      />

                      <View>
                        <Text
                          style={styles.textbold}
                          className="text-white text-base"
                        >
                          {item?.title}
                        </Text>
                        <Text
                          style={styles.textmedium}
                          className="text-sm text-[#F0DA6B]"
                        >
                          ({item?.author})
                        </Text>

                        <TouchableOpacity
                          activeOpacity={0.6}
                          className="mt-1 bg-[#F0DA6B] rounded-[9px] py-1 w-[130px]"
                        >
                          <Text
                            className="text-[#0C2769] text-center text-sm py-[2px]"
                            style={styles.textsemibold}
                          >
                            {item.callToAction}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                {!data.data?.length && <NoPost title="Book" />}
              </Animated.View>
            )}
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

export default BookScreen;
