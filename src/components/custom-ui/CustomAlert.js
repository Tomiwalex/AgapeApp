import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { deviceHeight, styles } from "../metrics/styles";
import { colors } from "../metrics/colors";
import { useAppContext } from "../../context/AppContext";

export const CustomAlert = () => {
  const { setAlertVisible, setAlertDetails } = useAppContext();

  const alert = (error, text) => {
    setAlertDetails((prev) => ({ ...prev, error: error, text: text }));
    setAlertVisible(true);
  };

  const CustomAlertPopup = ({ details }) => {
    return (
      <Animated.View
        className="absolute items-center justify-center bg-[#00000070]"
        style={{ height: deviceHeight, width: "100%" }}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <View
          style={{ backgroundColor: colors.deepBlue }}
          className="p-5 w-[80%] max-w-[321px] rounded-3xl"
        >
          <Text
            style={[
              styles.textsemibold,
              { color: details?.error ? "#E04751" : "#00D68F" },
            ]}
            className="text-lg text-center"
          >
            {details?.error ? "Error" : "Success"}
          </Text>
          <Text
            style={styles.textmedium}
            className="text-white text-center mt-4"
          >
            {details?.text}
          </Text>

          <TouchableHighlight
            onPress={() => setAlertVisible()}
            underlayColor={"#E0475120"}
            className="py-4 px-20 rounded-3xl mt-4"
          >
            <Text
              style={styles.textmedium}
              className="text-white text-center underline"
            >
              Close
            </Text>
          </TouchableHighlight>
        </View>
      </Animated.View>
    );
  };

  return { CustomAlertPopup, alert };
};
