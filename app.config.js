export default {
  name: "Agape Inc",
  slug: "AgapeApp",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  android: {
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },

    package: "com.agape.agape",
    versionCode: 1,
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.FOREGROUND_SERVICE",
    ],
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.agape.agape",
    googleServicesFile: "./GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    entitlements: {
      "aps-environment": "production",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "a4d10c52-7e32-4659-9b96-56d2660faaa1",
    },
  },
  runtimeVersion: "1.0.0",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/a4d10c52-7e32-4659-9b96-56d2660faaa1",
  },
  plugins: [
    "expo-font",
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow Agape app to use your location.",
      },
    ],
  ],
};
