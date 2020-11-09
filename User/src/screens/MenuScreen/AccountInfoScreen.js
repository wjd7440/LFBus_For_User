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
          <Text style={styles.sectionTit}>내 계정</Text>
          <View>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              onPress={() => {}}
            >
              <Text>asd</Text>
            </TouchableRipple>
          </View>
          <View style={styles.formArea}>
            <View style={styles.formControl}>
              <Text
                style={{
                  ...styles.formControlTit,
                }}
              >
                아이디(이메일)
              </Text>
              <View style={styles.defalutForm}>
                <Text style={styles.defalutFormTxt}>
                  {!loading && data.UserInfo.userId}
                </Text>
              </View>
            </View>

            <View style={styles.formControl}>
              <Text style={styles.formControlTit}>사용하는 보조기구</Text>
              <View style={styles.defalutForm}>
                <Text style={styles.defalutFormTxt}>
                  {!loading && data.UserInfo.equipmentName}
                </Text>
              </View>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.formControlTit}>
                어떤 도움이 필요하신가요?
              </Text>
              <View style={styles.defalutForm}>
                <Text style={styles.defalutFormTxt}>
                  {!loading && data.UserInfo.needHelp}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={styles.menuList}>
          <Button
            style={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            mode="outlined"
            contentStyle={styles.menuContentStyle}
            labelStyle={{ color: "#111" }}
            onPress={() => {
              navigation.navigate("AccountEditScreen", {
                userId: data.UserInfo.userId,
                needHelp: data.UserInfo.needHelp,
                equipment: data.UserInfo.equipment,
              });
            }}
          >
            asdasd
          </Button>
        </View> */}

        <View style={[styles.underLineBox]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.underLineButton }}
          >
            <Text style={styles.underLineTxt}>비밀번호 변경 {">"}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableHighlight
            underlayColor={"#333FDA"}
            style={{ ...styles.onButton }}
            onPress={() => {
              navigation.navigate("AccountEditScreen", {
                userId: data.UserInfo.userId,
                needHelp: data.UserInfo.needHelp,
                equipment: data.UserInfo.equipment,
              });
            }}
          >
            <Text style={styles.buttonTxt}>정보 수정</Text>
          </TouchableHighlight>
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
  signTit: {
    fontSize: hp("4%"),
    color: "#4B56F1",
    marginTop: hp("5%"),
    marginBottom: hp("3%"),
  },
  formControl: {
    marginBottom: 20,
  },
  question: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  textForm: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 0,
    paddingRight: 5,
    marginBottom: 8,
    fontSize: 16,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
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
});
