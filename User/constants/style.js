import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";
import { Images, wezonTheme } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("3.75%"),
    paddingVertical: wp("3.75%"),
  },
  containerH: {
    paddingHorizontal: wp("3.75%"),
  },
  containerMH: {
    marginHorizontal: wp("3.75%"),
  },
  leftAb: {
    left: wp("3.75%"),
  },
  rightAb: {
    right: wp("3.75%"),
  },
  shadow: {
    backgroundColor: "#fff",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
  emptyLine: {
    height: 5,
    backgroundColor: "#f5f5f5",
    marginHorizontal: -wp("3.75%"),
    marginVertical: wp("7.5%"),
  },
  emptyLine2: {
    height: 5,
    backgroundColor: "#f5f5f5",
    marginHorizontal: -wp("3.75%"),
  },
  itemBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  colum3: {
    width: Dimensions.get("window").width * 0.348888888888888888 - wp("3.75%"),
    borderWidth: 1,
  },
  marginPull: {
    marginHorizontal: -wp("3.75%"),
  },
  marginTopPull: {
    marginTop: -wp("3.75%"),
  },
  marginTopPush: {
    marginTop: wp("3.75%"),
  },
  marginTop0: {
    marginTop: 0,
  },
  mT5: {
    marginTop: 5,
  },
  mT10: {
    marginTop: 10,
  },
  mT15: {
    marginTop: 15,
  },
  mT20: {
    marginTop: 20,
  },
  mT25: {
    marginTop: 25,
  },
  mT30: {
    marginTop: 30,
  },
  mB5: {
    marginBottom: 5,
  },
  mB10: {
    marginBottom: 10,
  },
  mB15: {
    marginBottom: 15,
  },
  mB20: {
    marginBottom: 20,
  },
  mB25: {
    marginBottom: 25,
  },
  mB30: {
    marginBottom: 30,
  },
  paddingTop0: {
    paddingTop: 0,
  },
  paddingTopTheme: {
    paddingVertical: wp("3.75%"),
  },
  sectionTitBox: {
    justifyContent: "center",
    height: 38,
  },
  sectionTit: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#767676",
    height: 32,
  },
  onButton: {
    backgroundColor: "#4B56F1",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: wp("13.82%"),
    borderRadius: 4,
  },
  onButtonTxt: {
    fontSize: wp("3.95%"),
    color: "#fff",
  },
  offButton: {
    height: wp("13.82%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDDDF",
    borderRadius: 4,
  },
  offButtonTxt: {
    fontSize: wp("3.95%"),
    color: "#A3A4A9",
  },
  formControl: {
    paddingVertical: wp("3.7%"),
  },
  formControlTit: {
    fontSize: wp("3.95%"),
    marginBottom: 7,
    fontWeight: "bold",
  },
  defalutForm: {
    backgroundColor: "#dfdfdf",
    paddingHorizontal: 15,
    // height: 54,
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    paddingVertical: 14,
  },
  defalutForm2: {},
  defalutFormTxt: {
    fontSize: wp("3.95%"),
    color: "#565656",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
});
