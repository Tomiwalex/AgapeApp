import { ImageBackground, Image, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context/AppContext";

const ImageExpand = ({ route }) => {
  const navigation = useNavigation();
  const { setTabBarVisible } = useAppContext();
  return (
    <ImageBackground
      source={route.params.image}
      className="flex-1"
      resizeMode="cover"
    >
      <Pressable
        className="flex-1"
        onPress={() => {
          navigation.goBack();
          setTabBarVisible(true);
        }}
      >
        <BlurView
          tint="dark"
          intensity={90}
          className="flex-1 justify-center bg-[#00000060]"
        >
          <Image
            className="w-full"
            resizeMode="contain"
            source={route.params.image}
          />
        </BlurView>
      </Pressable>
    </ImageBackground>
  );
};

export default ImageExpand;
