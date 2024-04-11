import { View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { colors } from "../metrics/colors";
import { LinearGradient } from "expo-linear-gradient";

const BookSkeleton = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <View className=" flex-row items-center mx-4 my-5 border-b-[1px] pb-5">
      <ShimmerPlaceholder
        shimmerColors={colors.shimmerColors}
        style={{ height: 76, width: 107, borderRadius: 14 }}
      />

      <View className="ml-2 flex-1">
        <ShimmerPlaceholder
          shimmerColors={colors.shimmerColors}
          style={{ height: 16, borderRadius: 4, width: "70%" }}
        />
        <ShimmerPlaceholder
          shimmerColors={colors.shimmerColors}
          style={{
            height: 10,
            marginTop: 5,
            borderRadius: 4,
            width: "100%",
          }}
        />
        <ShimmerPlaceholder
          shimmerColors={colors.shimmerColors}
          style={{ height: 30, width: 130, marginTop: 8, borderRadius: 9 }}
        />
      </View>
    </View>
  );
};

export default BookSkeleton;
