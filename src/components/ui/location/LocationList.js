import { View, Text, TouchableHighlight, Image } from "react-native";
import React from "react";
import { styles } from "../../metrics/styles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import logo from "../../../../assets/icons/agape-icon.png";

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
      <Animated.View entering={FadeIn} className="flex-row items-center">
        {/* the church's image */}
        {item?.churchImage && (
          <Image
            source={{ uri: item.churchImage }}
            className="w-[107px] h-20 rounded-[14px]"
            resizeMode="cover"
          />
        )}

        {!item.churchImage && (
          <View className="w-[107px] h-20 bg-gray-900 justify-center items-center rounded-[14px]">
            <Image
              className="w-[100px] h-16 rounded-[14px]"
              resizeMode="contain"
              source={logo}
            />
          </View>
          // <View className="w-[107px] h-20 rounded-[14px] items-center justify-center bg-[#5F5F5F6E]">
          //   <FontAwesome5 name="church" size={60} color="#ffffff10" />
          // </View>
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
            style={styles.textregular}
            className="text-white text-xs text-center p-1"
          >
            {item?.distance ? item?.distance : "not available"}
          </Text>

          {item?.distance && (
            <Text
              style={styles.textregular}
              className="text-white text-[10px] text-center"
            >
              KM
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default LocationList;
