import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { colors } from "../metrics/colors";

const SkeletonLoading = ({ style }) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <ShimmerPlaceholder shimmerColors={colors.shimmerColors} style={style} />
    </Animated.View>
  );
};

export default SkeletonLoading;
