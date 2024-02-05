import { View, Text, Image, TouchableHighlight } from "react-native";
import React from "react";
import { styles } from "../metrics/styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../metrics/colors";
import { useNavigation } from "@react-navigation/native";
import NotificationIcon from "./NotificationIcon";

const SectionHeader = ({ name, image, type, image2 }) => {
  const navigation = useNavigation();
  return (
    <View className="p-4 flex-row items-center">
      <TouchableHighlight onPress={() => navigation.goBack()}>
        <Ionicons name="ios-chevron-back" size={24} color={colors.gold} />
      </TouchableHighlight>

      {/* icon */}
      {type == 1 && (
        <Image
          source={image}
          className="h-9 w-[35] ml-1"
          resizeMode="contain"
        />
      )}

      {/* section image for type 2 */}
      {type > 1 && (
        <Image
          source={image2}
          className="h-9 w-[35] ml-2 mr-1"
          resizeMode="contain"
        />
      )}

      <Text
        style={styles.textbold}
        className="text-white flex-1 ml-2 text-base"
      >
        {name}
      </Text>

      {/* icon */}
      {type > 1 && (
        <Image
          source={image}
          className="h-9 w-[35] ml-1 mr-2"
          resizeMode="contain"
        />
      )}

      {type < 3 && <NotificationIcon />}
    </View>
  );
};

export default SectionHeader;
