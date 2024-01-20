import { Text, TouchableOpacity, Pressable } from "react-native";
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
import { useNavigation } from "@react-navigation/native";

const Menu = ({ setShowMenu }) => {
  const { setTabBarVisible } = useAppContext();
  const navigation = useNavigation();

  const MenuBtn = ({ title, icon, onPress }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTabBarVisible(true);
          setShowMenu(false);
          onPress();
        }}
        activeOpacity={0.6}
        className="flex-row items-center p-4 py-6  rounded-xl my-3 bg-black"
      >
        {icon}
        <Text
          style={[styles.textmedium]}
          className="text-base ml-3 text-[#fff]"
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{ height: deviceHeight, width: "100%", position: "absolute" }}
    >
      <BlurView
        tint="dark"
        intensity={90}
        className="absolute top-0 bottom-0 right-0 left-0"
      >
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
                backgroundColor: "#090909",
                height: "90%",
                borderColor: colors.goldOpacity,
              },
            ]}
            className="w-[60%] ml-[5%] p-4 my-[5%] rounded-[30px] border-[1px]"
          >
            {/* profile */}
            <MenuBtn
              icon={<Ionicons name="person" size={24} color={colors.gold} />}
              title="Profile"
            />

            {/* testimony */}
            <MenuBtn
              icon={<Entypo name="slideshare" size={24} color={colors.gold} />}
              title="Testimony"
            />

            {/* share app */}
            <MenuBtn
              icon={<Entypo name="share" size={24} color={colors.gold} />}
              title="Share App"
            />

            {/* Rate app */}
            <MenuBtn
              icon={<Ionicons name="ios-star" size={24} color={colors.gold} />}
              title="Rate App"
            />

            {/* testimony */}
            <MenuBtn
              icon={<Entypo name="log-out" size={24} color={colors.gold} />}
              title="Sign Out"
              onPress={() => {
                navigation.navigate("Auth");
                setTabBarVisible(false);
              }}
            />

            <Text
              style={[styles.textsemibold, { color: colors.goldOpacity }]}
              className="text-center text-sm mt-auto"
            >
              V1.0.01
            </Text>
          </Animated.View>
        </Pressable>
      </BlurView>
    </Animated.View>
  );
};

export default Menu;
