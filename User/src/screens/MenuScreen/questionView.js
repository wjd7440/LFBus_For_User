import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";
import Icon from "react-native-fontawesome-pro";
import Moment from "react-moment";
import { useQuery } from "react-apollo-hooks";
import { ACCOUNT_INFO_QUERY, ACCOUNT_EDIT_QUERY } from "../Queries";
import { Checkbox, TouchableRipple } from "react-native-paper";
// import { Checkbox } from "galio-framework";

export default ({ navigation }) => {
  const { data, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });
  const [value, onChangeText] = useState(!loading && data.UserInfo.userId);
  const [checked, setChecked] = React.useState(false);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Header back title={"1:1문의"} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.QView}>
            <Text style={styles.Qtit}>작성일</Text>
            <View style={styles.QInputBox}>
              <Moment
                element={Text}
                format="YYYY.MM.DD"
                style={styles.defaultTxt}
              />
            </View>
          </View>
          <View style={styles.QView}>
            <Text style={styles.Qtit}>아이디</Text>
            <View style={styles.QInputBox}>
              <Text style={styles.defaultTxt}>
                {!loading && data.UserInfo.userId}
              </Text>
            </View>
          </View>
          <View style={styles.QView}>
            <Text style={styles.Qtit}>이메일</Text>
            <View style={styles.QInputBox}>
              <TextInput
                style={styles.QInput}
                underlineColorAndroid="transparent"
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
              <Text style={styles.Qtxt}>
                메일로 답변이 발송됩니다. 이메일을 확인해주세요.
              </Text>
            </View>
          </View>
          <View style={styles.QView}>
            <Text style={styles.Qtit}>제목</Text>
            <View style={styles.QInputBox}>
              <TextInput
                style={styles.QInput}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.QView}>
            <Text style={styles.Qtit}>내용</Text>
            <View style={styles.QInputBox}>
              <TextInput
                style={{ ...styles.QInput, textAlignVertical: "top" }}
                numberOfLines={4}
                multiline={true}
                underlineColorAndroid="transparent"
                placeholder={
                  "빠른 문제 확인 및 해결을 위해 문의 내용을 자세히 적어주세요."
                }
                placeholderTextColor={"#8D8E93"}
              />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            <Checkbox.Item
              label="개인정보처리방침에 동의합니다"
              style={{ flexDirection: "column" }}
              status={checked ? "checked" : "unchecked"}
              color={"#111"}
              theme={{
                colors: {
                  primary: "#333",
                  underlineColor: "transparent",
                },
              }}
              labelStyle={{ fontSize: 15 }}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <TouchableRipple
              rippleColor="rgba(255, 255, 255, .1)"
              underlayColor={"#333"}
              style={styles.exitButton}
              onPress={() => {}}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>1:1문의</Text>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,
  QView: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginBottom: 20,
  },
  Qtit: {
    width: 100,
    fontWeight: "bold",
  },
  QInputBox: {
    flex: 1,
    justifyContent: "center",
  },
  QInput: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  Qtxt: {
    paddingHorizontal: 4,
    marginTop: 3,
    lineHeight: 18,
    color: "#676767",
  },
  defaultTxt: {
    fontSize: 15,
  },
  exitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    height: 56,
  },
});
