import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { deviceHeight, styles } from "../metrics/styles";
import { colors } from "../metrics/colors";
import { useAppContext } from "../../context/AppContext";
import { Octicons } from "@expo/vector-icons";
export const CustomAlert = () => {
  const { setAlertVisible, setAlertDetails } = useAppContext();

  const alert = (error, text, head) => {
    setAlertDetails((prev) => ({
      ...prev,
      error: error,
      text: text,
      head: head,
    }));
    setAlertVisible(true);
  };

  return { alert };
};

export const CustomAlertPopup = ({ details }) => {
  const { setAlertVisible } = useAppContext();

  return (
    <Animated.View
      style={{
        backgroundColor: details.error ? "#00000070" : "#161617",
        height: deviceHeight,
        width: "100%",
      }}
      className="absolute items-center justify-center"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={{
          backgroundColor: details?.error ? colors.deepBlue : "transparent",
        }}
        className="p-5 w-[80%] max-w-[321px] rounded-3xl"
      >
        {!details?.error && (
          <View className="rounded-full border-[1px] border-[#F0DA6B] w-[123] h-[123] justify-center items-center mx-auto mb-5">
            <Octicons
              name="check"
              size={77}
              style={{ width: 60, margin: "auto" }}
              color="white"
            />
          </View>
        )}

        <Text
          style={[
            styles.textsemibold,
            { color: details?.error ? "#E04751" : "#fff" },
          ]}
          className="text-lg text-center"
        >
          {details?.error ? "Error" : details?.head ? details?.head : "Success"}
        </Text>
        <Text
          style={[
            styles.textmedium,
            { color: details?.error ? "#fff" : "#FFFFFF99" },
          ]}
          className="text-center mt-4"
        >
          {details?.text}
        </Text>

        {details?.error ? (
          <TouchableHighlight
            onPress={() => setAlertVisible(false)}
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
        ) : (
          <TouchableOpacity
            onPress={() => setAlertVisible(false)}
            className="p-4 bg-[#F0DA6B] w-[244] mx-auto rounded-[8px] mt-8"
          >
            <Text style={styles.textsemibold} className="text-center">
              Back
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};
