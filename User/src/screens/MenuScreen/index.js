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
      <View style={styles.shadow}>
        <View>
          <Text>내 포인트</Text>
          <Text>8,850 P</Text>
        </View>
        <TouchableHighlight>
          <Text>충전하기</Text>
        </TouchableHighlight>
      </View>
      <TouchableOpacity>
        <Text>공지사항</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReservationCheckScreen");
        }}
      >
        <Text>버스 예약 확인</Text>
      </TouchableOpacity>
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
});
