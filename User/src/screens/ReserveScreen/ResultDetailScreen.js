import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY } from "../Queries";
import { LinearGradient } from "expo-linear-gradient";

export default ({
  CAR_REG_NO,
  ROUTE_NO,
  STATUS_POS,
  EXTIME_MIN,
  DESTINATION,
  ROUTE_TP,
  navigation,
}) => {
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  if (loading) {
    return null;
  } else {
    if (data.UserBusInfo) {
      return (
        <View key={ROUTE_NO}>
          <Text>버스번호 : {ROUTE_NO}</Text>
          <Text>종착지 : {DESTINATION}</Text>
          <Text>남은시간 : {EXTIME_MIN}분</Text>
          {STATUS_POS > 0 ? (
            <Text>{STATUS_POS}정류장 전</Text>
          ) : (
            <Text>진입중</Text>
          )}

          <Text>좌석1 : {data.UserBusInfo.SEAT1 ? "사용가능" : "사용중"}</Text>
          <Text>좌석2 : {data.UserBusInfo.SEAT2 ? "사용가능" : "사용중"}</Text>
          {/* <Text>CAR_REG_NO : {data.UserBusInfo.CAR_REG_NO}</Text> */}
        </View>
      );
    } else {
      return null;
    }
  }
};

const cell1 = "20%";
const cell2 = "25%";
const cell3 = "20%";
const cell4 = "35%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    padding: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#ddd",
  },
  cell1: {
    width: cell1,
    borderLeftWidth: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cell2: {
    width: cell2,
  },
  cell3: {
    width: cell3,
  },
  cell4: {
    width: cell4,
    alignItems: "baseline",
  },
  cellFont: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#111",
  },
  numberBox: {
    width: 120,
    height: 110,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  busIcon: {
    width: 52,
    height: 52,
  },
});
