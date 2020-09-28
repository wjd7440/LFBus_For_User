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

export default ({ CAR_REG_NO, ROUTE_NO, departureStation, arrivalStation }) => {
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO,
    },
  });
  console.log(data);

  if (loading) {
    return null;
  } else {
    if (data.UserBusInfo) {
      return (
        <>
          <Text>버스번호 : {ROUTE_NO}</Text>
          <Text>차량번호 : {CAR_REG_NO}</Text>
          <Text>승차 정류장 : {departureStation}</Text>
          <Text>하차 정류장 : {arrivalStation}</Text>
          <Text>좌석1 : {data.UserBusInfo.SEAT1 ? "사용가능" : "사용중"}</Text>
          <Text>좌석2 : {data.UserBusInfo.SEAT2 ? "사용가능" : "사용중"}</Text>
        </>
      );
    } else {
      return null;
    }
  }
};
