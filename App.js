import React, { useCallback } from "react";
import { AppProvider } from "./src/context/AppContext";
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainScreen from "./src/screens/general/MainScreen";

// SplashScreen.preventAutoHideAsync();
export default function App() {
  // making the tailwind stylesheet available
  NativeWindStyleSheet.setOutput({
    default: "native",
  });

  // Ensuring the fonts are loaded before loading the app
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
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
}
