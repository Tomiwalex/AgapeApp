export default {
  name: "Agape Inc",
  slug: "AgapeApp",
  version: "1",
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
    entitlements: {
      "aps-environment": "production",
    },
  },

  extra: {
    eas: {
      projectId: "a4d10c52-7e32-4659-9b96-56d2660faaa1",
    },
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/a4d10c52-7e32-4659-9b96-56d2660faaa1",
  },
  plugins: [
    "expo-font",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow Agape app to use your location.",
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./assets/icons/agape-icon.png",
        color: "#ffffff",
      },
    ],
  ],
};
