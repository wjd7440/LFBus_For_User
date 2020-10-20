import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  RefreshControl,
} from "react-native";
export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.shadow,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View
          style={{
            padding: 20,
            borderRightWidth: 1,
            borderColor: "#f1f1f1",
            flex: 1,
          }}
        >
          <Text style={styles.myPointTxt}>내 포인트</Text>
          <Text style={styles.myPointNumber}>8,850 P</Text>
        </View>
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={{ justifyContent: "center", padding: 20, maxWidth: 120 }}
        >
          <Text style={{ fontSize: 18, color: "#4B56F1", fontWeight: "700" }}>
            충전하기
          </Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight>
        <Text>공지사항</Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#f5f5f5"}
        onPress={() => {
          navigation.navigate("ReservationCheckScreen");
        }}
      >
        <Text>버스 예약 확인</Text>
      </TouchableHighlight>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RouteScreen");
        }}
      >
        <Text>경로 검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
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
  cont: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  myPointTxt: {
    borderRadius: 8,
    borderTopLeftRadius: 0,
    backgroundColor: "#4B56F1",
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 76,
    textAlign: "center",
  },
  myPointNumber: {
    fontSize: 28,
    marginTop: 4,
    color: "#4B56F1",
    fontWeight: "bold",
  },
});
