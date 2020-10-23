import React, { Component } from "react";
import style from "../../../constants/style";
import RadioColumnGroup from "../../../components/RadioColumnGroup";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";

const chargeArray = [
  {
    label: "1천원",
    value: "1000",
    selected: false,
  },
  {
    label: "5천원",
    value: "5000",
    selected: false,
  },
  {
    label: "1만원",
    value: "10000",
    selected: false,
  },
  {
    label: "3만원",
    value: "30000",
    selected: false,
  },
  {
    label: "5만원",
    value: "50000",
    selected: false,
  },
  {
    label: "10만원",
    value: "100000",
    selected: false,
  },
];

export default ({ navigation }) => {
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
            <Text style={{ ...styles.pointTxt, fontSize: 18 }}>8,850P</Text>
          </View>

          <View style={styles.chargeView}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              충전금액을 선택해주세요.
            </Text>
            {/* 충전 default 시 offNumber */}
            <Text style={styles.offNumber}>0P</Text>
            {/* 충전 버튼 선택 되었을 시 onNumber*/}
            <Text style={styles.onNumber}>50,000P</Text>
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
                setValue("charge", item.value, true);
              }}
              flexDirection="row"
            />
          </View>
          <View style={styles.emptyLine} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChargeCompleteScreen");
            }}
          >
            <Text>클릭 시 충전 완료페이지로 이동합니다</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.marginPull]}>
          <Text style={styles.container}>결제수단</Text>
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
});
