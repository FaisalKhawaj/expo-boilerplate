/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    disableButton:'grey',
    text: "#11181C",
    buttonBg: "rgba(26, 4, 179, 1)",

    background: "#fff",
    danger: "red",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    inputBg: "#f7f7f7",
    tabIconSelected: tintColorLight,
    primaryButton: "#f67509",
    disabledButton: "#d5942a",
    success: "rgba(46, 204, 113, 1)",
  },
  dark: {
    disableButton:'grey',
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
    buttonBg: "rgba(26, 4, 179, 1)",
    success: "rgba(46, 204, 113, 1)",

  },
};


export type ThemeColors = typeof Colors.light; // Define a type for theme colors.
