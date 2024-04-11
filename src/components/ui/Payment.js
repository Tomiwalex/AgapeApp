import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { deviceWidth, styles } from "../metrics/styles";
import { colors } from "../metrics/colors";
import { CustomAlert } from "../custom-ui/CustomAlert";
import axios from "axios";
import { GIVING_URL } from "../url/url";
import useGetLoginToken from "../../hooks/useGetLoginToken";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = ({ setShowPayment }) => {
  const [loading, setLoading] = React.useState(false);
  const { alert } = CustomAlert();
  const { token } = useGetLoginToken();
  const navigation = useNavigation();

  const [data, setData] = React.useState({
    email: "",
    type: "devotional_subscription",
    currency: "NGN",
    amount: 1500,
  });

  const userMail = async () => {
    try {
      const mail = await AsyncStorage.getItem("UserMail");
      setData((prev) => ({ ...prev, email: mail }));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    userMail();
  }, []);

  const pay = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(GIVING_URL, data, {
        headers: {
          "x-auth-token": token,
        },
      });
      navigation.navigate("Giving", {
        screen: "Webview",
        params: { url: resp.data.data.checkout_url },
      });
      setShowPayment(false);
      console.log(resp.data, "yeah");
    } catch (error) {
      if (error.response) {
        alert(true, error.response.data.message);
        return console.log(error.response.data.message);
      }
      alert(true, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View
        style={{ borderColor: colors.gold, height: deviceWidth }}
        className="bg-[#464646] p-5 rounded-[34px] mx-4 border-[1px]"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              className="w-4 h-4 mr-3"
              resizeMode="contain"
              source={require("../../../assets/icons/book-icon.png")}
            />
            <Text style={styles.textbold} className="text-white text-base">
              Get Devotional
            </Text>
          </View>

          {/* The cancel button */}
          <TouchableOpacity onPress={() => setShowPayment(false)}>
            <MaterialIcons name="cancel" size={20} color="#7A7A7A" />
          </TouchableOpacity>
        </View>
        <View className="items-center flex-1 justify-center">
          <View className=" w-full">
            <Text
              style={styles.textbold}
              className="text-5xl text-black  text-center"
            >
              ₦1500
            </Text>
          </View>

          <Text
            style={[styles.textmedium, { color: "black" }]}
            className="text-sm"
          >
            Grace For This Day
          </Text>

          {/* proceed button */}
          <TouchableOpacity
            disabled={loading}
            style={{ borderColor: colors.gold }}
            className="p-4 border-[1px] rounded-[31px] top-10 w-[244px] items-center"
            onPress={() => pay()}
          >
            <Text
              style={styles.textbold}
              className=" text-white text-base text-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color={"white"} />
              ) : (
                "Get"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderColor: colors.gold,
          borderWidth: 1,
        }}
        className="mb-28 bg-[#464646] rounded-[20px] mx-4 mt-4"
      >
        <Image
          resizeMode="contain"
          className="w-full h-[78px] overflow-hidden"
          source={require("../../../assets/post-images/stripe-image.png")}
        />
      </View>
    </Animated.View>
  );
};

export default Payment;
