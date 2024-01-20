import { Platform, StyleSheet, StatusBar, Dimensions } from "react-native";

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

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
