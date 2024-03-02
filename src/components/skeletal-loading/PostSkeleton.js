import { View, Text } from "react-native";
import React from "react";
import SkeletonLoading from "../ui/SkeletalLoading";

const PostSkeleton = () => {
  return (
    <View className="my-5 mx-4">
      <View className="flex-row items-center">
        <SkeletonLoading style={{ height: 44, width: 44, borderRadius: 44 }} />
        <SkeletonLoading style={{ width: 150, marginLeft: 12 }} />
      </View>

      <SkeletonLoading
        style={{
          width: "80%",
          marginTop: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 10,
        }}
      />
      <SkeletonLoading
        style={{
          width: "100%",
          marginTop: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 10,
        }}
      />
      <SkeletonLoading
        style={{ width: "100%", marginTop: 20, height: 220, borderRadius: 20 }}
      />
    </View>
  );
};

export default PostSkeleton;
