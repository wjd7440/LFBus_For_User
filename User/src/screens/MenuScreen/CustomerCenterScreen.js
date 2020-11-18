import React, { Component } from "react";
import { Text, Button, TouchableRipple } from "react-native-paper";

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

export default ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header
        back
        title={"고객센터"}
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <ScrollView>
        <View style={styles.menuWrap}>
          <TouchableRipple
            style={[styles.menuItem]}
            rippleColor="rgba(0, 0, 0, .06)"
            underlayColor={"#f5f5f5"}
            onPress={() => {
              navigation.navigate("UserQna");
            }}
          >
            <View style={[styles.menuInner, styles.containerH]}>
              <Icon
                name="comment-alt-smile"
                type="light"
                size={18}
                color={"#111"}
              />
              <Text style={styles.menuItemTxt}>자주묻는 질문</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            style={[styles.menuItem]}
            rippleColor="rgba(0, 0, 0, .06)"
            underlayColor={"#f5f5f5"}
            onPress={() => {
              navigation.navigate("QuestionView");
            }}
          >
            <View style={[styles.menuInner, styles.containerH]}>
              <Icon name="comment-dots" type="light" size={18} color={"#111"} />
              <Text style={styles.menuItemTxt}>1:1 문의</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            style={[styles.menuItem]}
            rippleColor="rgba(0, 0, 0, .06)"
            underlayColor={"#f5f5f5"}
            onPress={() => {}}
          >
            <View style={[styles.menuInner, styles.containerH]}>
              <Icon name="sticky-note" type="light" size={18} color={"#111"} />
              <Text style={styles.menuItemTxt}>내 문의내역</Text>
            </View>
          </TouchableRipple>
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
  menuItem: {
    height: 56,
    justifyContent: "center",
    // borderBottomWidth: 1,
    // borderColor: "#f5f5f5",
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
