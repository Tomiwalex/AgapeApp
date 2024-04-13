import { View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import bg from "../../../assets/bg/onboarding-bg.png";
import logo from "../../../assets/icons/agape-icon.png";
import LoadingDot from "../loading/LoadingDot";
import Animated, {
  FadeIn,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../../components/metrics/styles";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const [slideNo, setSlideNo] = useState(1);
  const navigate = useNavigation();

  const height = useSharedValue(96);
  const width = useSharedValue(96);
  const marginHorizontal = useSharedValue("auto");

  const handleAnimate = () => {
    height.value = withTiming(60);
    width.value = withTiming(60);
    marginHorizontal.value = withTiming(0, 1000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleAnimate();
      setSlideNo(2);
    }, 4000);

    const handleNavigate = setTimeout(() => {
      navigate.replace("Auth");
    }, 8000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(handleNavigate);
    };
  }, []);

  return (
    <ImageBackground
      source={bg}
      className="flex-1 items-center justify-center"
      resizeMode="cover"
    >
      <View className="mx-4">
        <Animated.View
          style={{ height, width, marginHorizontal: "auto" }}
          className=" h-24 w-24"
        >
          <Image
            source={logo}
            className="bottom-2 w-full h-full"
            resizeMode="contain"
          />
        </Animated.View>

        {slideNo === 2 && (
          <Animated.Text
            entering={FadeIn.delay(200)}
            style={styles.textbold}
            className="text-[30px] text-white max-w-[313px] leading-[36px]"
          >
            The Agape Christian Ministries
          </Animated.Text>
        )}

        {slideNo === 2 && (
          <Animated.Text
            entering={FadeIn.delay(200)}
            style={styles.textmedium}
            className="text-[14px] mt-2 mb-4 text-white max-w-[313px]"
          >
            a people helped and blessed by God...
          </Animated.Text>
        )}

        <View style={{ alignItems: slideNo == 1 ? "center" : "flex-start" }}>
          <LoadingDot />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;
