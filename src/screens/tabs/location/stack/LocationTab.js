import { ScrollView, View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../../../../components/metrics/styles";
import not from "../../../../../assets/icons/notification-icon.png";
import logo from "../../../../../assets/icon.png";
import LocationList from "../../../../components/ui/location/LocationList";
import NotificationIcon from "../../../../components/ui/NotificationIcon";

const LocationTab = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      vertical
      style={styles.container}
      className="flex-1 bg-[#111111]"
    >
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between border-b-[1px] border-b-[#F0DA6B]">
        <Text style={styles.textbold} className="text-white text-2xl">
          Locations
        </Text>

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <NotificationIcon />
        </View>
      </View>

      <View className="">
        <LocationList
          description={"Possibility ground, 1 Agape Avenue, Akure 340110"}
          location={"Akure"}
        />

        <LocationList
          description={"Moferere, ajilosun, Ado-Ekiti."}
          location={"Ekiti"}
        />
      </View>
    </ScrollView>
  );
};

export default LocationTab;
