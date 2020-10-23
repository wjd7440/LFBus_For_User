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
import { Header } from "../../../components";

export default ({
  CAR_REG_NO,
  ROUTE_NO,
  STATUS_POS,
  EXTIME_MIN,
  DESTINATION,
  TOTAL_DIST,
  ROUTE_TP,
  navigation,
  route,
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
        <View key={ROUTE_NO} style={[styles.busList, styles.row]}>
          {/* 왼쪽박스 */}
          <View style={styles.left}>
            <Text
              style={{ fontSize: 21, color: "#4B56F1", fontWeight: "bold" }}
            >
              {ROUTE_NO}
            </Text>
            <Text style={{ fontSize: 16, paddingTop: 2 }}>
              종착지 - {DESTINATION}
            </Text>

            {STATUS_POS > 0 ? (
              <View style={{ ...styles.row, paddingTop: 2 }}>
                <Text style={{ fontSize: 16, color: "#FF4646" }}>
                  {EXTIME_MIN}분후 도착
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 15, color: "#8D8E93" }}>
                  ({STATUS_POS}정류장 전)
                </Text>
              </View>
            ) : (
              <View style={{ ...styles.row, paddingTop: 2 }}>
                <Text style={{ fontSize: 16, color: "#FF4646" }}>진입중</Text>
              </View>
            )}
          </View>
          {/* 오른쪽박스 자리 여부 이미지 */}
          <View style={styles.right}>
            {/* 좌석1 */}
            {data.UserBusInfo.SEAT1 ? (
              <View style={styles.seatImgBox}>
                <Image
                  style={styles.seatImg}
                  source={require("../../../assets/off_seat.png")}
                />
                <Text style={styles.offSeatTxt}>탑승가능</Text>
              </View>
            ) : (
              <View style={styles.seatImgBox}>
                <Image source={require("../../../assets/on_seat.png")} />
                <Text style={styles.onSeatTxt}>탑승12중</Text>
              </View>
            )}
            {/* 좌석2 */}
            {data.UserBusInfo.SEAT2 ? (
              <View style={styles.seatImgBox}>
                <Image
                  style={styles.seatImg}
                  source={require("../../../assets/off_seat.png")}
                />
                <Text style={styles.offSeatTxt}>탑승가능</Text>
              </View>
            ) : (
              <View style={styles.seatImgBox}>
                <Image source={require("../../../assets/on_seat.png")} />
                <Text style={styles.onSeatTxt}>탑승중</Text>
              </View>
            )}
          </View>

          {/* <Text>CAR_REG_NO : {data.UserBusInfo.CAR_REG_NO}</Text> */}
        </View>
      );
    } else {
      return null;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  busList: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: "space-between",
  },
  left: {
    maxWidth: "65%",
  },
  right: {
    maxWidth: "35%",
    flexDirection: "row",
  },
  seatImgBox: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  seatImg: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  offSeatTxt: {
    marginTop: 5,
    fontSize: 12,
    color: "#9a9a9a",
  },
  onSeatTxt: {
    marginTop: 5,
    fontSize: 12,
    color: "#4B56F1",
  },
});
