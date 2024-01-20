import { View, Text, ImageBackground, TouchableHighlight } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../metrics/styles";

const CommunityPost = ({ bg, title, description }) => {
  return (
    <ImageBackground source={bg} className="rounded-[23px] overflow-hidden">
      <TouchableHighlight
        underlayColor={"#00000080"}
        onPress={() => null}
        className="min-h-[350px] justify-end"
      >
        <LinearGradient
          colors={["transparent", "#00000090", "#000000", "#000", "#000"]}
        >
          <View className=" p-4 py-8">
            <Text style={styles.textbold} className="text-white text-base mb-1">
              {title}
            </Text>

            <Text
              style={styles.textmedium}
              className="text-xs text-[#FFFFFF] mb-3"
            >
              {description}
            </Text>
          </View>
        </LinearGradient>
      </TouchableHighlight>
    </ImageBackground>
  );
};

export default CommunityPost;
