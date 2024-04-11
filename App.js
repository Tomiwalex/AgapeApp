import React, { useCallback, useEffect } from "react";
import { AppProvider } from "./src/context/AppContext";
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainScreen from "./src/screens/general/MainScreen";
import * as Updates from "expo-updates";
import messaging from "@react-native-firebase/messaging";
// import { firebase } from "@react-native-firebase/messaging";
import { Alert } from "react-native";

const App = () => {
  /**
   * The function `checkForUpdate` checks for updates and fetches them if available.
   */
  const checkForUpdate = async () => {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      async () => {
        await Updates.fetchUpdateAsync();
      };
    } else {
      console.log("no Update checked");
    }
  };

  // requesting for notification permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  {
    /* 
  useEffect(() => {
    checkForUpdate();
    if (requestUserPermission()) {
      // return token for this device
      messaging()
        .getToken()
        .then((token) => {
          console.log(token, "firebase token");
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

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  */
  }

  const [isUserSignedin, setIsUserSignedin] = React.useState(null);

  // making the tailwind stylesheet available
  NativeWindStyleSheet.setOutput({
    default: "native",
  });

  // Ensuring the fonts are loaded before loading the app
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && isUserSignedin !== null) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //  importing the font family
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
};

export default App;
