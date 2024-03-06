import { View, Text, TouchableHighlight, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../metrics/styles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import Animated, { FadeInDown } from "react-native-reanimated";

const LocationList = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={"#00000080"}
      onPress={() =>
        navigation.navigate("Location", {
          screen: "LocationDetails",
          params: { item: item },
        })
      }
      className="border-b-[1px] py-4 px-4"
    >
      <Animated.View entering={FadeInDown} className="flex-row items-center">
        {/* the church's image */}
        {item?.churchImage && (
          <Image
            source={{ uri: item?.churchImage }}
            className="w-[107px] h-20 rounded-[14px]"
            resizeMode="cover"
          />
        )}

        {!item.churchImage && (
          <View className="w-[107px] h-20 rounded-[14px] items-center justify-center bg-[#5F5F5F6E]">
            <FontAwesome5 name="church" size={60} color="#ffffff10" />
          </View>
        )}

        {/* church branch */}
        <View className="mx-3 flex-1">
          <Text
            numberOfLines={1}
            style={styles.textbold}
            className="text-white text-xl overflow-hidden overflow-ellipsis"
          >
            {item.location ? item.location : "-"}
          </Text>

          <Text
            numberOfLines={2}
            style={styles.textmedium}
            className="text-white text-xs mt-2"
          >
            {item.address ? item.address : "-"}
          </Text>
        </View>

        {/* kilometers away */}
        <View className="rounded-[5px] bg-[#5F5F5F6E] w-[76px] h-[59px] items-center justify-center">
          <Text
            style={styles.textmedium}
            className="text-white text-xs text-center"
          >
            {item?.distance ? item?.distance : "-"}
          </Text>
          <Text
            style={styles.textregular}
            className="text-white text-[10px] text-center"
          >
            KM
          </Text>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default LocationList;
