import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import logo from "../../../../../assets/icons/agape-icon.png";
import not from "../../../../../assets/icons/notification-icon.png";
import { styles } from "../../../../components/metrics/styles";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CommunityPost from "../../../../components/ui/post/CommunityPost";
import { colors } from "../../../../components/metrics/colors";
import { MaterialIcons } from "@expo/vector-icons";
import NotificationIcon from "../../../../components/ui/NotificationIcon";
import { useAppContext } from "../../../../context/AppContext";
import { CustomAlert } from "../../../../components/custom-ui/CustomAlert";
import axios from "axios";
import { GIVING_URL } from "../../../../components/url/url";
import useGetLoginToken from "../../../../hooks/useGetLoginToken";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { copyToClipboard } from "../../../../utils/CopyToClipboard";

const GivingTab = () => {
  const [isGivingListShown, setGivingListShown] = React.useState(false);
  const [givingType, setGivingType] = React.useState("offering");
  const [loading, setLoading] = React.useState(false);
  const [mail, setMail] = React.useState("");
  const [isGivingInputShown, setGivingInputShown] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(null);
  const { alert } = CustomAlert();
  const { token } = useGetLoginToken();
  const navigation = useNavigation();

  const [data, setData] = React.useState({
    email: mail,
    type: givingType,
    currency: "NGN",
    amount: "",
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

  const height = useSharedValue(0);

  const toggleList = () => {
    if (isGivingListShown) {
      height.value = withTiming(0);
      setGivingListShown(false);
    } else {
      height.value = withTiming(130);
      setGivingListShown(true);
    }
  };

  const pay = async () => {
    userMail();
    try {
      setLoading(true);
      const resp = await axios.post(GIVING_URL, data, {
        headers: {
          "x-auth-token": token,
        },
      });
      navigation.navigate("Webview", { url: resp.data.data.checkout_url });
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

  const handleSubmit = () => {
    if (data.amount > 0) {
      pay();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const handleSigned = async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token === null) {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    };

    handleSigned();
  }, []);

  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={styles.container}
      className="flex-1 bg-[#151516] pb-20"
    >
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between ">
        <Text style={styles.textbold} className="text-white text-2xl">
          Giving
        </Text>

        <View className="flex-row items-center">
          <Image source={logo} className="w-[38px] h-9 mr-2" />
          <NotificationIcon />
        </View>
      </View>
      {/* text */}
      <Text
        style={styles.textmedium}
        className="text-white max-w-[321px] px-5 py-2 text-sm "
      >
        Your generous contributions empower our church to spread love, hope, and
        faith in our community.
      </Text>

      {/* displaying the input when useris signed in and the sign in message when not signed in */}
      <Animated.View entering={FadeIn}>
        <View className="flex-row p-4">
          {/* offering type */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleList}
            className="bg-white flex-row p-4 rounded-[34px] w-[60%]"
          >
            <View>
              <AntDesign name="downcircleo" size={18} color="#00000091" />
            </View>

            <Text
              style={styles.textregular}
              className="text-[#00000091] text-sm ml-2 capitalize"
            >
              {givingType}
            </Text>
          </TouchableOpacity>

          {
            <Animated.View
              className="absolute z-10 top-[80px] left-[16] rounded-3xl bg-white w-[60%] h-[0] overflow-hidden"
              style={{ height, padding: isGivingListShown ? 20 : 0 }}
            >
              {["offering", "tithe"].map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    setGivingType(item);
                    setData({ ...data, type: item });
                    toggleList();
                  }}
                  className="py-3"
                >
                  {isGivingListShown && (
                    <Animated.Text
                      entering={FadeIn}
                      style={styles.textregular}
                      className="text-[#00000091] text-sm capitalize "
                    >
                      {item}
                    </Animated.Text>
                  )}
                </Pressable>
              ))}
            </Animated.View>
          }

          {/* <TouchableOpacity className="rounded-full bg-[#0C2769] ml-3 h-[52] w-[52] items-center justify-center">
              <Image
                resizeMode="contain"
                className="h-[18] w-[18]"
                source={require("../../../../../assets/icons/settings-icon.png")}
              />
            </TouchableOpacity> */}
        </View>

        <View className="p-4">
          <CommunityPost
            onPress={() => setGivingInputShown(true)}
            title={givingType}
            bg={require("../../../../../assets/post-images/giving-image.png")}
            description={`knowing that your commitment helps to build a stronger, more compassionate church that radiates God's light. Together, we can make a difference and sow the seeds of positivity and faith.`}
          />

          {/* giving Input */}
          {isGivingInputShown && (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={{ borderColor: error ? "red" : colors.gold }}
              className="bg-[#464646] absolute p-5 rounded-[34px] w-full  top-[16px] left-[16px] h-full border-[1px]"
            >
              <View className="flex-row items-center justify-between p-1">
                <Text
                  style={styles.textbold}
                  className="text-white text-base capitalize"
                >
                  {givingType}
                </Text>

                {/* The cancel button */}
                <TouchableOpacity onPress={() => setGivingInputShown(false)}>
                  <MaterialIcons name="cancel" size={20} color="#7A7A7A" />
                </TouchableOpacity>
              </View>

              {/* church's account and copy icon */}
              <View className="items-center flex-1 justify-center">
                <Text
                  style={styles.textsemibold}
                  className="text-white text-base"
                >
                  AGAPE CHRISTIAN MINISTRIES
                </Text>

                <View className="bg-[#D9D9D975] mt-5 rounded-[15px] w-full p-5 py-7  max-w-[324px]">
                  <Text
                    style={styles.textsemibold}
                    className="text-white text-sm text-center mb-5 w-full"
                  >
                    Give Offering
                  </Text>

                  {/* account informations zenith bank */}
                  <View className="flex-row items-center gap-3 max-w-[290px]">
                    <Text
                      style={styles.textsemibold}
                      className="text-white text-xl mt-3"
                    >
                      1013613902
                    </Text>

                    <Text
                      style={styles.textmedium}
                      className="text-white text-xs mt-3"
                    >
                      ZENITH BANK
                    </Text>

                    {/* copy icon */}
                    <TouchableOpacity
                      onPress={() => copyToClipboard("1013613902")}
                    >
                      <Image
                        source={require("../../../../../assets/icons/copy-icon.png")}
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* first bank */}
                  <View className="flex-row items-center gap-3 mt-1 mb-1">
                    <Text
                      style={styles.textsemibold}
                      className="text-white text-xl mt-3"
                    >
                      2008920300
                    </Text>

                    <Text
                      style={styles.textmedium}
                      className="text-white text-xs mt-3"
                    >
                      FIRST BANK
                    </Text>

                    {/* copy account number */}
                    <TouchableOpacity
                      className="flex-1"
                      onPress={async () => copyToClipboard("2008920300")}
                    >
                      <Image
                        source={require("../../../../../assets/icons/copy-icon.png")}
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* enter amount and proceed to pay */}
              {/* <View className="items-center flex-1 justify-center">
                <View className=" w-full">
                  <TextInput
                    style={styles.textbold}
                    className="text-5xl text-black  text-center"
                    cursorColor={colors.gold}
                    value={`₦${data?.amount}`}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setData({ ...data, amount: text.replace("₦", "") });
                      setError(false);
                    }}
                  />
                </View>

                <Text
                  style={[
                    styles.textmedium,
                    { color: error ? "red" : "black" },
                  ]}
                  className="text-sm"
                >
                  Enter amount
                </Text>

                <TouchableOpacity
                  disabled={loading}
                  style={{ borderColor: colors.gold }}
                  className="p-4 border-[1px] rounded-[31px] top-10 w-[244px] items-center"
                  onPress={handleSubmit}
                >
                  <Text
                    style={styles.textbold}
                    className=" text-white text-base text-center"
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color={"white"} />
                    ) : (
                      "Proceed"
                    )}
                  </Text>
                </TouchableOpacity>
              </View> */}
            </Animated.View>
          )}
        </View>

        <View
          style={{
            borderColor: colors.gold,
            borderWidth: isGivingInputShown ? 1 : 0,
          }}
          className="mb-28 bg-[#464646] rounded-[20px] mx-4 mt-4"
        >
          <Image
            resizeMode="contain"
            className="w-full h-[78px] overflow-hidden"
            source={require("../../../../../assets/post-images/stripe-image.png")}
          />
        </View>
      </Animated.View>

      {/* sign in information */}
      {/* <Animated.View
        entering={FadeIn}
        style={{
          borderColor: colors.goldOpacity,
          borderWidth: 1,
        }}
        className="bg-black border-[1px] rounded-[33px] p-5 m-5 items-center py-20"
      >
        <MaterialIcons name="error-outline" size={80} color="#fcfcfc" />

        <Text
          style={styles.textregular}
          className="text-gray-200 text-sm leading-5 text-center my-5"
        >
          Please sign in to continue to use this feature.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Signin")}
          style={{ borderColor: colors.goldOpacity }}
          className=" rounded-3xl border-[1px] mt-5"
        >
          <Text
            style={styles.textbold}
            className="text-white text-base w-full p-4 px-20"
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </Animated.View> */}
    </ScrollView>
  );
};

export default GivingTab;
