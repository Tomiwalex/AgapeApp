import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./stack/HomeTab";
import AgapeScreen from "./stack/AgapeScreen";
import SermonScreen from "./stack/SermonScreen";
import StreamScreen from "./stack/StreamScreen";
import AmplifiedScreen from "./stack/AmplifiedScreen";
import KidsScreen from "./stack/KidsScreen";
import TeensScreen from "./stack/TeensScreen";
import ImageExpand from "./stack/ImageExpand";
import NotificationScreen from "./stack/NotificationScreen";
import TestimonyScreen from "./stack/TestimonyScreen";
import WebviewPage from "../../../components/custom-ui/Webview";
import NotificationDetails from "./stack/NotificationDetails";
import AudioScreen from "./stack/AudioScreen";
import BookScreen from "./stack/BookScreen";
import DevotionalScreen from "./stack/DevotionalScreen";
import DevotionalStacks from "./devotional";

const HomeStacks = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeTab} />
      <HomeStack.Screen name="Agape" component={AgapeScreen} />
      <HomeStack.Screen name="Sermon" component={SermonScreen} />
      <HomeStack.Screen name="Streams" component={StreamScreen} />
      <HomeStack.Screen name="Amplified" component={AmplifiedScreen} />
      <HomeStack.Screen name="eKids" component={KidsScreen} />
      <HomeStack.Screen name="eTeens" component={TeensScreen} />
      <HomeStack.Screen name="Audio" component={AudioScreen} />
      <HomeStack.Screen name="Books" component={BookScreen} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen
        name="Notificationdetails"
        component={NotificationDetails}
      />
      <HomeStack.Screen name="Testimony" component={TestimonyScreen} />
      <HomeStack.Screen name="DevotionalStack" component={DevotionalStacks} />
      <HomeStack.Screen
        options={{
          animation: "slide_from_right",
          statusBarTranslucent: true,
          statusBarColor: "transparent",
        }}
        name="ImageExpand"
        component={ImageExpand}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStacks;
