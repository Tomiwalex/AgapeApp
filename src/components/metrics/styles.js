import { Platform, StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  textregular: {
    fontFamily: "Inter-Regular",
  },
  textmedium: {
    fontFamily: "Inter-Medium",
  },
  textsemibold: {
    fontFamily: "Inter-SemiBold",
  },
  textbold: {
    fontFamily: "Inter-Bold",
  },
});
