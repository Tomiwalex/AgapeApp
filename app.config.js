export default {
  name: "Agape",
  slug: "AgapeApp",
  version: "1.0.34",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",

  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,

    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },

    package: "com.agape.agapeApp",
    versionCode: 3,
    permissions: [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.FOREGROUND_SERVICE",
    ],
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
