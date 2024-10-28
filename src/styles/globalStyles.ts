import { Colors } from "@/constants/Colors";
import { fonts } from "@/hooks/useCacheResources";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainWrap: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  dontHaveAcc: {
    // textAlign: "center",
    fontSize: 14,
    color: Colors.light.text,
    fontFamily: fonts.primary.regular,
  },
  innerWrap: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontFamily: fonts.primary.bold,
    color: Colors.light.text,
  },
  fieldTitle: {
    color: Colors.light.text,
    fontFamily: fonts.primary.semibold,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: Colors.light.primaryButton,
    borderRadius: 10,
    // width: wp("90%"),
    justifyContent: "center",
    height: 55,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.light.text,
    fontFamily: fonts.primary.medium,
    fontSize: 16,
  },
});
