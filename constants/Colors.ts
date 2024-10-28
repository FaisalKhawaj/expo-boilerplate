/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    danger: "red",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    inputBg: "#f7f7f7",
    tabIconSelected: tintColorLight,
    primaryButton: "#f67509",
    disabledButton: "#d5942a",
  },
  dark: {
    text: "#ECEDEE",
    danger: "red",
    // tabIconDefault: "#687076",
    inputBg: "#f7f7f7",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primaryButton: "#f67509",
    disabledButton: "#d5942a",
  },
};
