import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import not from "../../../../../assets/icons/notification-icon.png";
import logo from "../../../../../assets/icons/agape-icon.png";
import { styles } from "../../../../components/metrics/styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../components/metrics/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomAlert } from "../../../../components/custom-ui/CustomAlert";
import NotificationIcon from "../../../../components/ui/NotificationIcon";

const LocationDetails = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params.item;
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
          <NotificationIcon />
        </View>
      </View>

      {/* image */}
      <ImageBackground
        className="m-4 rounded-3xl overflow-hidden bg-center"
        resizeMode="cover"
        source={{ uri: item?.pastorImage }}
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
                className="text-base text-white mr-1 whitespace-pre-wrap"
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
                style={styles.textregular}
                className="text-xs mt-2 text-white leading-4"
              >
                {item.branchName ? item.branchName + ", " : ""}
                {item.address}
              </Text>

              {/* number */}
              <View className="flex-row items-center mt-2 flex-wrap ">
                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="text-xs text-white mr-1"
                >
                  {item.phoneNo ? item.phoneNo : "-"}
                </Text>

                <Text
                  style={[styles.textmedium, { color: colors.gold }]}
                  className="text-xs text-white"
                >
                  mail: {item.mail ? item.mail : "-"}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>

      {/* navigation */}
      <View className="flex-row px-6 mt-3">
        {/* mail icon */}
        <TouchableOpacity
          disabled={item.mail == "" ? true : false}
          style={{ opacity: item.mail == "" ? 0.5 : 1 }}
          onPress={() => handleOpenLink(`mailto:${item?.mail}`)}
          className="mr-2"
        >
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
        <TouchableOpacity
          disabled={item.phoneNo == "" ? true : false}
          onPress={() => handleOpenLink(`tel:${item?.phoneNo}`)}
          style={{ opacity: item.phoneNo == "" ? 0.5 : 1 }}
        >
          <Ionicons
            name="call"
            size={25}
            color={colors.gold}
            style={{
              borderColor: colors.gold,
              paddingHorizontal: 18,
              borderRadius: 11,
              paddingVertical: 11,
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOpenLink(item?.mapAddress)}
          style={{
            borderColor: colors.gold,
          }}
          className="border-[1px] py-[10] rounded-[12px] ml-2 justify-self-end flex-1"
        >
          <Text
            style={[styles.textbold]}
            className="text-base text-white text-center"
          >
            Navigate
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LocationDetails;
