import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

export const fontAssets = [
  {
    interBlack: require("../assets/fonts/Inter-Black.otf"),
  },
  {
    interBlackItalic: require("../assets/fonts/Inter-BlackItalic.otf"),
  },
  {
    interBold: require("../assets/fonts/Inter-Bold.otf"),
  },
  {
    interBoldItalic: require("../assets/fonts/Inter-BoldItalic.otf"),
  },
  {
    interItalic: require("../assets/fonts/Inter-Italic.otf"),
  },
  {
    interLight: require("../assets/fonts/Inter-Light-BETA.otf"),
  },
  {
    interLightItalic: require("../assets/fonts/Inter-LightItalic-BETA.otf"),
  },
  {
    interMedium: require("../assets/fonts/Inter-Medium.otf"),
  },
  {
    interMediumItalic: require("../assets/fonts/Inter-MediumItalic.otf"),
  },
  {
    interRegular: require("../assets/fonts/Inter-Regular.otf"),
  },
  {
    interSemiBold: require("../assets/fonts/Inter-SemiBold.otf"),
  },
  {
    interSemiBoldItalic: require("../assets/fonts/Inter-SemiBoldItalic.otf"),
  },
].map((x: any) => Font.loadAsync(x));

export const fonts = {
  primary: {
    black: "interBlack",
    blackItalic: "interBlackItalic",
    bold: "interBold",
    boldItalic: "interBoldItalic",
    italic: "interItalic",
    light: "interLight",
    lightItalic: "interLightItalic",
    medium: "interMedium",
    mediumItalic: "interMediumItalic",
    regular: "interRegular",
    semibold: "interSemiBold",
    semiboldItalic: "interSemiBoldItalic",
  },
};

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();
      // Load fonts

      // await Font.loadAsync(fontAssets);
      await Promise.all([...fontAssets]);
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      //  setTimeout(SplashScreen.hideAsync, 10000);
      SplashScreen.hideAsync();
    }
  }
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, setLoadingComplete };
}
