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
  busExist,
  setBusExist,
  CAR_REG_NO,
  ROUTE_NO,
  STATUS_POS,
  EXTIME_MIN,
  DESTINATION,
  ROUTE_TP,
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
    if (!busExist && data.UserBusInfo) {
      setBusExist(true);
    }

    if (data.UserBusInfo) {
      return (
        <>
          <Text>버스번호 : {ROUTE_NO}</Text>
          {STATUS_POS > 0 ? (
            <Text>
              버스위치 : {STATUS_POS}정류장 전(
              {EXTIME_MIN}분)
            </Text>
          ) : (
            <Text>버스위치 : 진입중</Text>
          )}
          <Text>좌석1 : {data.UserBusInfo.SEAT1 ? "사용중" : "사용가능"}</Text>
          <Text>좌석2 : {data.UserBusInfo.SEAT2 ? "사용중" : "사용가능"}</Text>
        </>
      );
    } else {
      return null;
    }
  }
};
