import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { Images, wezonTheme } from "../constants";

const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    paddingVertical: theme.SIZES.BASE,
  },
  shadow: {
    backgroundColor: "#fff",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
});
