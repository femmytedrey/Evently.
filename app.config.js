module.exports = {
  expo: {
    name: "Evently",
    slug: "evently",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "evently",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    extra: {
      eas: {
        projectId: "d9f35899-f3cd-4d6f-b453-6318a606a093",
      },
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
      ],
      package: "com.femidev.evently",
      versionCode: 1,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
      // adaptiveIcon: {
      //   backgroundColor: "#7952FC",
      //   foregroundImage: "./assets/images/android-icon-foreground.png",
      //   backgroundImage: "./assets/images/android-icon-background.png",
      //   monochromeImage: "./assets/images/android-icon-monochrome.png",
      // },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 72,
          resizeMode: "contain",
          backgroundColor: "#7952FC",
          dark: {
            backgroundColor: "#7952FC",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
