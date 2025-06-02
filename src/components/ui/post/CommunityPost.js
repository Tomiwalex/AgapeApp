import { View, Text, ImageBackground, TouchableHighlight } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../metrics/styles";
import { MaterialIcons } from "@expo/vector-icons";

const CommunityPost = ({ bg, title, description, onPress }) => {
  return (
    <ImageBackground source={bg} className="rounded-[34px] overflow-hidden">
      <TouchableHighlight
        underlayColor={"#00000080"}
        onPress={onPress ? onPress : null}
        className="min-h-[350px]"
      >
        <View className="justify-between min-h-[350px]">
          {/* top content */}
          <LinearGradient colors={["#000000", "transparent"]}>
            <View className=" p-4 py-5 pb-10 flex-row gap-1 items-center pl-6">
              <MaterialIcons
                name="info-outline"
                size={13}
                color="#F0DA6B"
                style={{ fontWeight: "300" }}
              />
              <Text
                style={styles.textregular}
                className="text-[#F0DA6B] text-[10px]"
              >
                Tap to view
              </Text>
            </View>
          </LinearGradient>

          {/* bottom content */}
          <LinearGradient
            colors={["transparent", "#00000090", "#00000080", "#000"]}
          >
            <View className=" p-4 py-8">
              <Text
                style={styles.textbold}
                className="text-white text-base mb-1 capitalize"
              >
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
        </View>
      </TouchableHighlight>
    </ImageBackground>
  );
};

export default CommunityPost;
