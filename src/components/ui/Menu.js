import {
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { deviceHeight, styles } from "../metrics/styles";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { colors } from "../metrics/colors";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAppContext } from "../../context/AppContext";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import useGetLoginToken from "../../hooks/useGetLoginToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Menu = ({ setShowMenu }) => {
  const { setTabBarVisible } = useAppContext();
  const navigation = useNavigation();
  const { token } = useGetLoginToken();

  const MenuBtn = ({ title, icon, onPress }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTabBarVisible((prev) => false);
          setShowMenu(false);
          onPress();
        }}
        activeOpacity={0.6}
        className="mb-8"
      >
        <View className="flex-row items-center justify-center">
          {icon}
          <Text
            style={[styles.textsemibold]}
            className="text-sm ml-3 text-[#fff]"
          >
            {title}
          </Text>
        </View>

        <View className="w-[82px] mx-auto border-b-[1px] border-b-[#F0DA6B8F] pt-8"></View>
      </TouchableOpacity>
    );
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      setTabBarVisible((prev) => !prev);
      await navigation.replace("Auth2");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ height: deviceHeight, width: "100%", position: "absolute" }}
    >
      <View className="absolute top-0 bottom-0 right-0 left-0 bg-[#000000c5]">
        <Pressable
          className="flex-1"
          onPress={(e) => {
            setShowMenu(false);
            setTabBarVisible(true);
          }}
        >
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutLeft}
            style={[
              styles.container,
              {
                backgroundColor: "#030E25",
                height: "90%",
                borderColor: "#F0DA6B",
              },
            ]}
            className="w-[60%] ml-[5%] p-4 my-[5%] rounded-[21px] border-[1px] max-w-[168px]"
          >
            <ScrollView verical showsVerticalScrollIndicator={false}>
              {/* profile image */}
              <View className="h-[52px] w-[52] border-[1px] rounded-full items-center justify-center mx-auto border-[#F0DA6B50] mb-8">
                <Ionicons name="person-outline" size={20} color={"#fff"} />
              </View>

              {/* profile */}
              {!token && (
                <MenuBtn
                  title={token ? "Profile" : "Sign Up"}
                  onPress={() => {
                    if (token) {
                      navigation.navigate("Profile");
                    } else {
                      navigation.navigate("Signup");
                      setTabBarVisible(false);
                    }
                  }}
                />
              )}

              {/* testimony */}
              <MenuBtn
                icon={
                  <Image
                    resizeMode="contain"
                    className="w-4 h-5"
                    source={require("../../../assets/icons/testimony-icon.png")}
                  />
                }
                onPress={() => {
                  navigation.navigate("Testimony");
                  setTabBarVisible(false);
                }}
                title="Testimony"
              />

              {/* share app */}
              <MenuBtn
                onPress={() => {
                  navigation.navigate("DevotionalStack");
                  setTabBarVisible(true);
                }}
                icon={
                  <Image
                    resizeMode="contain"
                    className="w-4 h-5"
                    source={require("../../../assets/icons/bible-icon.png")}
                  />
                }
                title="Devotional"
              />

              {/* share app */}
              {/* // <MenuBtn
              //   icon={<Ionicons name="share-outline" size={20} color="white" />}
              //   title="Share App"
              // /> */}

              {/* Rate app */}
              {/* // <MenuBtn
              //   icon={<EvilIcons name="star" size={24} color="white" />}
              //   title="Rate App"
              // /> */}

              {/* log out*/}
              {token && (
                <MenuBtn
                  icon={<AntDesign name="logout" size={20} color="white" />}
                  title="Sign Out"
                  onPress={() => {
                    logOut();
                  }}
                />
              )}

              <Image
                source={require("../../../assets/icons/agape-icon.png")}
                className="w-10 h-10 mt-auto mb-3 mx-auto"
              />
              <Text
                style={[styles.textsemibold, { color: colors.goldOpacity }]}
                className="text-center text-xs tracking-wide"
              >
                V1.0.33
              </Text>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Menu;
