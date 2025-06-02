import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { colors } from "../../../../components/metrics/colors";
import { styles } from "../../../../components/metrics/styles";
import useGetData from "../../../../hooks/useGetData";
import useHideTabBarOnScroll from "../../../../hooks/useHideTabBarOnScroll";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import BookSkeleton from "../../../../components/skeletal-loading/BookSkeleton";
import Payment from "../../../../components/ui/Payment";

const DevotionalScreen = () => {
  const [signedIn, setSignedIn] = React.useState(null);
  const navigation = useNavigation();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const { handleScroll } = useHideTabBarOnScroll();
  const [isSubscribed, setSubscribed] = React.useState(null);

  // const { error, fetchDetails } = useGetData({
  //   url: "https://api.agapechristianministries.com/api/devotionals/",
  //   data,
  //   setData,
  //   setLoading,
  // });

  useEffect(() => {
    const handleSigned = async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token === null) {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    };

    // fetch user's subscriprion status
    const fetchedSubscribed = async () => {
      const val = await AsyncStorage.getItem("UserSubscribed");
      console.log(val);
      if (val === "true") {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    };

    handleSigned();
    fetchedSubscribed();
  }, []);

  console.log("signedin", signedIn);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      className="bg-[#151516] flex-1 pt-3 pb-24"
    >
      <SectionHeader
        type={2}
        name={"Devotional"}
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
            className=" bg-black border-[1px] rounded-[33px] p-5 m-5 items-center py-20 my-auto mt-20"
          >
            <MaterialIcons name="error-outline" size={80} color="#fcfcfc" />

            <Text
              style={styles.textregular}
              className="text-gray-200 text-sm leading-5 text-center my-5"
            >
              Sign in to elevate your experience and gain access to a world of
              premium features tailored just for you.
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
              </Animated.View>
            )}

            {!loading && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="pb-[10px] px-4"
              >
                <View className="py-6  border-b-[1px] flex-row">
                  <Image
                    resizeMode="cover"
                    className="h-[76px] w-[107px] rounded-[14px] mr-3"
                    source={{
                      uri: "https://res.cloudinary.com/degg7xvzv/image/upload/v1711537282/agape-app-images/Rectangle_26_wssebt.png",
                    }}
                  />

                  <View className="overflow-hidden">
                    <Text
                      style={styles.textbold}
                      className="text-white text-base"
                    >
                      2024 Grace For This Day
                    </Text>
                    <Text
                      style={styles.textmedium}
                      className="text-xs text-[#F0DA6B] text-ellipsis overflow-hidden mr-4"
                    >
                      (Bishop & Rev. Funke-Felix Adejumo)
                    </Text>

                    {/* Read devotional btn */}
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Months")}
                      activeOpacity={0.6}
                      className="mt-1 bg-[#F0DA6B] rounded-[9px] py-1 w-[130px]"
                    >
                      <Text
                        className="text-[#0C2769] text-center text-sm py-[2px]"
                        style={styles.textsemibold}
                      >
                        Read
                      </Text>
                    </TouchableOpacity>

                    {/* subscribe or read button */}
                    {/* <TouchableOpacity
                      onPress={() => {
                        if (isSubscribed) {
                          navigation.navigate("Months");
                        } else {
                          setShowPayment(!showPayment);
                        }
                      }}
                      activeOpacity={0.6}
                      className="mt-1 bg-[#F0DA6B] rounded-[9px] py-1 w-[130px]"
                    >
                      <Text
                        className="text-[#0C2769] text-center text-sm py-[2px]"
                        style={styles.textsemibold}
                      >
                        {isSubscribed == null && (
                          <ActivityIndicator color={"#0C2769"} />
                        )}

                        {isSubscribed == false && "Get"}
                        {isSubscribed === true && "Read"}
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </Animated.View>
            )}
          </Animated.View>
        )}
      </View>

      {showPayment && <Payment setShowPayment={setShowPayment} />}
    </ScrollView>
  );
};

export default DevotionalScreen;
