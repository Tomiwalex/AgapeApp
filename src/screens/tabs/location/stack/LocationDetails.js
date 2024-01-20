import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import not from "../../../../../assets/icons/notification-icon.png";
import logo from "../../../../../assets/icon.png";
import { styles } from "../../../../components/metrics/styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../components/metrics/colors";
import { useNavigation } from "@react-navigation/native";

const LocationDetails = ({ route }) => {
  const navigation = useNavigation();
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
          {route.params.location}
        </Text>

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <Image source={not} className="w-6 h-7" />
        </View>
      </View>

      <View>
        <Text>LocationDetails</Text>
      </View>
    </ScrollView>
  );
};

export default LocationDetails;
