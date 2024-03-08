import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { colors } from "../../../../components/metrics/colors";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { styles } from "../../../../components/metrics/styles";
import { LinearGradient } from "expo-linear-gradient";
import { CustomAlert } from "../../../../components/custom-ui/CustomAlert";

const NotificationDetails = ({ route }) => {
  const { alert } = CustomAlert();
  const handleOpenLink = async (url) => {
    // Check if the device supports opening the given URL
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Open the URL in the device's default browser
      await Linking.openURL(url);
    } else {
      alert(true, `Don't know how to open URL: ,${url}`);
    }
  };

  return (
    <View className="bg-[#101010] flex-1 pt-3">
      <View
        style={{ borderBottomColor: colors.gold }}
        className="border-b-[1px] pb-2"
      >
        <SectionHeader
          type={3}
          name={route.params.data.title}
          image={require("../../../../../assets/icons/agape-icon.png")}
          image2={require("../../../../../assets/icons/notification-icon.png")}
        />
      </View>

      {/* image */}
      <ImageBackground
        className="m-4 rounded-3xl overflow-hidden bg-center"
        resizeMode="cover"
        source={{ uri: route.params.data.banner }}
      >
        <View className="min-h-[354px] justify-end rounded-3xl overflow-auto">
          <LinearGradient
            colors={["transparent", "#00000090", "#000000", "#000000"]}
            className="p-5 py-8"
          >
            {/* pastor's name and location */}
            <View className="flex-row items-center flex-wrap">
              <Text
                style={styles.textbold}
                className="text-lg text-white mr-1 whitespace-pre-wrap"
              >
                {route.params.data.title}
              </Text>

              <Text
                style={[styles.textmedium, { color: colors.gold }]}
                className="text-base text-white "
              >
                {`(${""})`}
              </Text>
            </View>

            {/* description */}
            <View>
              <Text
                style={styles.textregular}
                className="text-xs mt-2 text-white leading-4"
              >
                {route.params.data.body}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>

      <View>
        {/* navigate icon */}
        {route.params.data.callToAction && (
          <TouchableOpacity
            onPress={() =>
              route.params.data.external_link
                ? handleOpenLink(route.params.data.external_link)
                : null
            }
            className="bg-[#464646] rounded-[13px] p-4 mx-5 mt-2"
          >
            <Text
              style={styles.textbold}
              className="text-base text-white text-center"
            >
              {route.params.data.callToAction}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NotificationDetails;
