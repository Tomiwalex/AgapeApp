import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import not from "../../../../../assets/icons/notification-icon.png";
import logo from "../../../../../assets/icon.png";
import { styles } from "../../../../components/metrics/styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../components/metrics/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const LocationDetails = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params.item;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      style={styles.container}
      className="flex-1 bg-[#111111]"
    >
      {/* Header */}
      <View className="p-5 px-4 flex-row items-center justify-between border-b-[1px] border-b-[#F0DA6B]">
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={24} color={colors.gold} />
        </TouchableHighlight>

        <Text
          style={styles.textbold}
          className="text-white text-xl flex-1 ml-2"
        >
          {item.location}
        </Text>

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <Image source={not} className="w-6 h-7" />
        </View>
      </View>

      {/* image */}
      <ImageBackground
        className="m-4 rounded-3xl overflow-hidden"
        source={require("../../../../../assets/post-images/pastor-image.png")}
      >
        <View className="min-h-[354px] justify-end rounded-3xl overflow-auto">
          <LinearGradient
            colors={["transparent", "#000000", "#000000"]}
            className="p-5 py-8"
          >
            {/* pastor's name and location */}
            <View className="flex-row items-center flex-wrap">
              <Text
                style={styles.textbold}
                className="text-base text-white mr-1"
              >
                {item.location}
              </Text>

              <Text
                style={[styles.textmedium, { color: colors.gold }]}
                className="text-base text-white "
              >
                {`(${item?.pastorName})`}
              </Text>
            </View>

            {/* description */}
            <View>
              <Text
                style={styles.textmedium}
                className="text-xs mt-2 text-white"
              >
                {item.branchName ? item.branchName + ", " : ""}
                {item.address}
              </Text>

              {/* number */}
              <View className="flex-row items-center mt-2 flex-wrap ">
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="text-xs text-white"
                >
                  (+234) 801-234-5678
                </Text>

                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="text-xs text-white ml-1"
                >
                  E-mail: pastoralex@gmail.com
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>

      {/* navigation */}
      <View className="flex-row px-6 mt-3">
        {/* mail icon */}
        <TouchableOpacity className="flex-1">
          <Ionicons
            name="mail"
            size={27}
            color={colors.gold}
            style={{
              borderColor: colors.gold,
              paddingHorizontal: 18,
              borderRadius: 11,
              paddingVertical: 9,
              borderWidth: 1,
              width: 65,
            }}
          />
        </TouchableOpacity>

        {/* navigate icon */}
        <TouchableOpacity>
          <Ionicons
            name="navigate-circle"
            size={33}
            color={colors.gold}
            style={{
              borderColor: colors.gold,
              paddingHorizontal: 14,
              borderRadius: 11,
              paddingVertical: 6,
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: colors.gold,
          }}
          className="px-10 border-[1px] py-[10] rounded-[12px] ml-2 justify-self-end"
        >
          <Text style={[styles.textbold]} className="text-base text-white">
            Navigate
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LocationDetails;
