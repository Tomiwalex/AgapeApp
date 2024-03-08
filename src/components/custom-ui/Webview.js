import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import SectionHeader from "../ui/SectionHeader";

const WebviewPage = ({ route }) => {
  return (
    <View className="flex-1 bg-gray-700">
      <SectionHeader
        name={"Agape "}
        type={1}
        image={require("../../../assets/icons/agape-icon.png")}
      />

      <WebView
        source={{
          uri: route.params.url,
        }}
      />
    </View>
  );
};

export default WebviewPage;
