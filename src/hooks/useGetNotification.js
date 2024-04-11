import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  try {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

      try {
        const loginToken = await AsyncStorage.getItem("Token");
        console.log(loginToken, "from ush token");
        const resp = await axios.post(
          "https://api.agapechristianministries.com/api/users/register_push_token",
          {
            pushToken: token.data,
          },
          {
            headers: {
              "x-auth-token": loginToken,
            },
          }
        );

        console.log(resp?.data?.message);
        alert(`push token submitted, token: ${token.data}`);
      } catch (err) {
        alert("error in submitting pushToken");
        console.log(err.message, "error in submitting pushToken");
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token.data;
  } catch (err) {
    alert(err.message);
  }
}

export const NotificationProcess = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, "response");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // <View
  //   style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
  // >
  //   <Text>Your expo push token: {expoPushToken}</Text>
  //   <View style={{ alignItems: "center", justifyContent: "center" }}>
  //     <Text>
  //       Title: {notification && notification.request.content.title}{" "}
  //     </Text>
  //     <Text>Body: {notification && notification.request.content.body}</Text>
  //     <Text className="text-white">
  //       Data:{" "}
  //       {notification && JSON.stringify(notification.request.content.data)}
  //     </Text>
  //   </View>
  //   <Button
  //     title="Press to Send Notification"
  //     onPress={async () => {
  //       await sendPushNotification(expoPushToken);
  //     }}
  //   />
  // </View>  );
};
