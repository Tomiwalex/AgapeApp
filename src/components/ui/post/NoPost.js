import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../metrics/colors";
import { styles } from "../../metrics/styles";

const NoPost = ({ title }) => {
  return (
    <View className="flex flex-1 items-center justify-center mt-[30%]">
      <View className="items-center bg-[#00184dd4] rounded-full p-5">
        <MaterialCommunityIcons name="post" size={44} color={"white"} />
      </View>
      <Text style={styles.textsemibold} className="text-2xl text-white mt-3">
        No {title ? title : "Post"} Yet
      </Text>
      <Text
        style={styles.textregular}
        className="text-base leading-[1.6] text-white mt-3 text-center max-w-[300px]"
      >
        There are no {title ? `${title?.toLowerCase()}s` : "posts"} available at
        the moment for this section. Please check back soon.
      </Text>
    </View>
  );
};

export default NoPost;
