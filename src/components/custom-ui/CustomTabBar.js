import { View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import HomeNavbar, { GivingNavbar, LocationNavbar } from "../ui/Navbar";
import Touchable from "./Touchable";
import Animated, {
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { useAppContext } from "../../context/AppContext";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isTabBarVisible } = useAppContext();

  const getTabIcon = (label, isFocused) => {
    if (label === "Home") {
      return <HomeNavbar focused={isFocused} />;
    } else if (label === "Giving") {
      return <GivingNavbar focused={isFocused} />;
    } else if (label === "Location") {
      return <LocationNavbar focused={isFocused} />;
    }
  };

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={{
        display: isTabBarVisible ? "flex" : "none" /* To hide the tab bar */,
      }}
      className="absolute w-[85%] mx-[7.5%] mb-2 rounded-[22px] bottom-0 overflow-hidden"
    >
      <BlurView tint="dark" intensity={70} className="rounded-[22px]">
        <View className="bg-[#14338340] flex-row justify-around items-center w-full h-16 rounded-[21px]">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Touchable
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="w-[100%] items-center justify-center p-5"
              >
                {getTabIcon(label, isFocused)}
              </Touchable>
            );
          })}
        </View>
      </BlurView>
    </Animated.View>
  );
};

export default CustomTabBar;
