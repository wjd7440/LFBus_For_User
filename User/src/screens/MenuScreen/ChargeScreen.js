import React, { Component, useState } from "react";
import style from "../../../constants/style";
import RadioColumnGroup from "../../../components/RadioColumnGroup";
import { Dimensions } from "react-native";
import NumberFormat from "react-number-format";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { RadioButton, Appbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";

const chargeArray = [
  {
    label: "1천원",
    value: 1000,
    selected: false,
  },
  {
    label: "5천원",
    value: 5000,
    selected: false,
  },
  {
    label: "1만원",
    value: 10000,
    selected: false,
  },
  {
    label: "3만원",
    value: 30000,
    selected: false,
  },
  {
    label: "5만원",
    value: 50000,
    selected: false,
  },
  {
    label: "10만원",
    value: 100000,
    selected: false,
  },
];

export default ({ navigation, route }) => {
  const maileage = route.params ? route.params.maileage : null;
  const [value, setValue] = useState(1000);
  const [payment, setPayment] = useState("신용카드");
  const _goBack = () => console.log("Went back");
  return (
    <>
      <Header back title="포인트 충전" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.shadow, styles.point]}>
            <Text
              style={{
                ...styles.pointTxt,
                opacity: 0.97,
              }}
            >
              보유포인트
            </Text>
            <NumberFormat
              value={maileage}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(maileage) => (
                <Text
                  size={26}
                  color={"#333"}
                  style={{ ...styles.pointTxt, fontSize: 18 }}
                >
                  {maileage} P
                </Text>
              )}
            />
          </View>

          <View style={styles.chargeView}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              충전금액을 선택해주세요.
            </Text>
            {/* 충전 default 시 offNumber */}
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => (
                <Text style={styles.onNumber}>{value}P</Text>
              )}
            />
            {/* 충전 버튼 선택 되었을 시 onNumber*/}
            {/* <Text style={styles.onNumber}>50,000P</Text> */}
          </View>
          <View style={styles.chargeBtnGroup}>
            <RadioColumnGroup
              radioButtons={chargeArray}
              onPress={(data) => {
                const item = data.find((charge) => {
                  if (charge.selected === true) {
                    return charge;
                  }
                });
                setValue(item.value, true);
              }}
              flexDirection="row"
            />
          </View>
          <View style={styles.emptyLine} />
          <Text style={styles.sectionTit}>결제수단</Text>
          <View style={[styles.marginPull]}>
            <RadioButton.Group
              onValueChange={(payment) => setPayment(payment)}
              value={payment}
            >
              <RadioButton.Item
                color={"#4B56F1"}
                label="신용카드"
                value="신용카드"
                style={{
                  paddingHorizontal: 20,
                }}
                labelStyle={{ fontSize: 15, color: "#333" }}
                uncheckedColor="#8D8E93"
              />
              <RadioButton.Item
                label="휴대폰"
                value="휴대폰"
                color={"#4B56F1"}
                style={{
                  paddingHorizontal: 20,
                }}
                labelStyle={{ fontSize: 15, color: "#333" }}
                uncheckedColor="#8D8E93"
              />
            </RadioButton.Group>
          </View>
          <View style={[styles.bottomBtn]}>
            <View style={styles.chargeTotalBox}>
              <Text style={{ fontSize: 14, color: "#676767" }}>
                총 충전금액
              </Text>
              <NumberFormat
                value={value}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <Text style={{ fontSize: 28, fontWeight: "bold" }}>{value}P</Text>
                )}
              />
            </View>
            <TouchableHighlight
              underlayColor={"#333FDA"}
              style={{ ...styles.onButton }}
              onPress={() => {
                navigation.navigate("ChargeCompleteScreen");
              }}
            >
              <Text style={styles.onButtonTxt}>충전하기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  ...style,
  point: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4B56F1",
    height: 54,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  pointTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  chargeView: {
    paddingVertical: 54,
    paddingHorizontal: 5,
  },
  onNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4B56F1",
  },
  offNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#8D8E93",
  },
  chargeBtnGroup: {
    flexWrap: "wrap",
  },
  bottomBtn: {
    marginTop: "auto",
    paddingBottom: 10,
  },
  chargeTotalBox: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
