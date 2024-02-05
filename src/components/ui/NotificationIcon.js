import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NotificationIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
      <Image
        source={require("../../../assets/icons/notification-icon.png")}
        className="w-6 h-7"
      />
    </TouchableOpacity>
  );
};

export default NotificationIcon;
