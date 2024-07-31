import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../metrics/styles";
import { useAppContext } from "../../context/AppContext";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const NotificationIcon = () => {
  const navigation = useNavigation();
  const { isNotificationVisible, setNotificationVisible } = useAppContext();

  // requesting for notification permission
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitPushToken = async (token) => {
    try {
      const loginToken = await AsyncStorage.getItem("Token");
      const resp = await axios.post(
        "https://api.agapechristianministries.com/api/users/register_push_token",
        {
          pushToken: token,
        },
        {
          headers: {
            "x-auth-token": loginToken,
          },
        }
      );

      console.log(resp?.data?.message);
    } catch (err) {
      console.log(err.message, "error in submitting pushToken");
    }
  };

  useEffect(() => {
    try {
      if (requestUserPermission()) {
        // return token for this device
        messaging()
          .getToken()
          .then((token) => {
            submitPushToken(token);
          });
      } else {
        console.log("Failed token status", authStatus);
      }

      //getInitialNotification: When the application is opened from a quit state.
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        });

      //  Assume a message-notification contains a type property in data payload of the screen to open
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Notification handled in the background:", remoteMessage);
      });

      // if user is on the app and a notification enters
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        setNotificationVisible(true);
      });

      return unsubscribe;
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <TouchableOpacity
      className="relative"
      onPress={() => {
        navigation.navigate("Notification");
        setNotificationVisible(false);
      }}
    >
      <View
        style={{ display: isNotificationVisible ? "flex" : "none" }}
        className="h-4 w-4 bg-[#F54135] rounded-full items-center justify-center absolute z-[2] right-[-3px] top-[-3px]"
      >
        <Text style={styles.textregular} className="text-white text-[10px]">
          {1}
        </Text>
      </View>
      <Image
        source={require("../../../assets/icons/notification-icon.png")}
        className="w-6 h-7"
      />
    </TouchableOpacity>
  );
};

export default NotificationIcon;
