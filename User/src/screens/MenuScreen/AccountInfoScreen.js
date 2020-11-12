import React, { Component } from "react";
import { Text, Button, TouchableRipple } from "react-native-paper";
import RadioGroup from "../../../components/RadioGroup";
import CheckBox from "react-native-check-box";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Picker,
  Keyboard,
  KeyboardAvoidingView,
  TouchableHighlightComponent,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import { useQuery } from "react-apollo-hooks";
import { Block, theme } from "galio-framework";
import { ACCOUNT_INFO_QUERY } from "../Queries";
import style from "../../../constants/style";
import Icon from "react-native-fontawesome-pro";

export default ({ navigation, route }) => {
  const { data, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header
        back
        title={"계정관리"}
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <ScrollView>
        <View style={{ ...styles.container }}>
          <View style={styles.sectionTitBox}>
            <Text style={styles.sectionTit}>내 계정</Text>
          </View>

          <View style={styles.menuWrap}>
            {/* 정보수정 */}
            <TouchableRipple
              style={[styles.menuItem, styles.marginPull]}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("AccountEditScreen", {
                  userId: data.UserInfo.userId,
                  needHelp: data.UserInfo.needHelp,
                  equipment: data.UserInfo.equipment,
                  equipmentName: data.UserInfo.equipmentName,
                });
              }}
            >
              <View style={[styles.menuInner, styles.containerH]}>
                <Icon name="pen" type="light" size={18} color={"#111"} />
                <Text style={styles.menuItemTxt}>정보 변경</Text>
              </View>
            </TouchableRipple>
            {/* 비밀번호 번경 */}
            <TouchableRipple
              style={[styles.menuItem, styles.marginPull]}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("PasswordChangeScreen");
              }}
            >
              <View style={[styles.menuInner, styles.containerH]}>
                <Icon name="lock-alt" type="light" size={18} color={"#111"} />
                <Text style={styles.menuItemTxt}>비밀번호 변경</Text>
              </View>
            </TouchableRipple>
            {/* 로그아웃 */}
            <TouchableRipple
              style={[styles.menuItem, styles.marginPull]}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {}}
            >
              <View style={[styles.menuInner, styles.containerH]}>
                <Icon name="sign-out" type="light" size={18} color={"#111"} />
                <Text style={styles.menuItemTxt}>로그아웃</Text>
              </View>
            </TouchableRipple>
            {/* 회원탈퇴 */}
            <TouchableRipple
              style={[styles.menuItem, styles.marginPull]}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("UserWithdrawalScreen");
              }}
            >
              <View style={[styles.menuInner, styles.containerH]}>
                <Icon
                  name="times-hexagon"
                  type="light"
                  size={18}
                  color={"#111"}
                />
                <Text style={styles.menuItemTxt}>회원탈퇴</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,

  formArea: {
    width: "100%",
  },

  formControlTit: {
    fontSize: 17,
    marginBottom: 8,
  },
  onButton: {
    backgroundColor: "#4B56F1",
    width: "100%",
    height: hp("7.6%"),
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 4,
  },
  offButton: {
    backgroundColor: "#fff",
    width: "100%",
    height: hp("7.6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonTxt: {
    fontSize: 16,
    color: "white",
  },
  errorTxt: {
    color: "#FF3B3B",
    fontSize: 13,
  },
  underLineBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  underLineButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  underLineTxt: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    fontSize: 15,
    color: "#111",
  },
  menuContentStyle: {
    justifyContent: "flex-start",
    height: 54,
    color: "#111",
  },
  menuWrap: {},
  menuItem: {
    height: 56,
    justifyContent: "center",
  },
  menuInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTxt: {
    fontSize: 17,
    marginLeft: 8,
  },
});
