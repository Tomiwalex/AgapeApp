import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import bg from "../../../assets/bg/loading-bg.png";
import logo from "../../../assets/icon.png";
import LoadingDot from "./LoadingDot";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const LoadingScreen = () => {
  return (
    <Animated.View
      className="absolute left-0 right-0 top-0 bottom-0 flex-1"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ImageBackground
        source={bg}
        className="flex-1 items-center justify-center"
        resizeMode="cover"
      >
        <StatusBar style="light" />
        <View className="items-center">
          <Image source={logo} className="w-24 h-24 bottom-2" />

          <LoadingDot />
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default LoadingScreen;
