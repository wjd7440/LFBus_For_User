import React, { Component } from "react";
import style from "../../../constants/style";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";

export default ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Header
        back
        title="충전 완료"
        close
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>충전이 완료되었습니다.</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.sectionTit}>예약선택</Text>
        <View style={styles.formBox}>
          <Text style={styles.formTit}>선택한 탑승요청 버스</Text>
        </View>
      </View>
    </ScrollView>
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
