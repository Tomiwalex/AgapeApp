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
      <Text style={styles.textmedium} className="text-2xl text-white mt-3">
        No {title ? title : "Post"} Yet
      </Text>
      <Text
        style={styles.textregular}
        className="text-sm leading-[1.6] max-w-[270px] mx-auto text-white mt-1 text-center"
      >
        There is no {title ? `${title?.toLowerCase()}` : "post"} available at
        the moment in this section. Please check back again soon.
      </Text>
    </View>
  );
};

export default NoPost;
