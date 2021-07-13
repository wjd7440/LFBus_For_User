import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY, RESERVATION_DELETE_QUERY } from "../Queries";
import { useMutation } from "react-apollo-hooks";
import Moment from "react-moment";

export default ({
  navigation,
  id,
  CAR_REG_NO,
  ROUTE_NO,
  departureStation,
  arrivalStation,
  createdAt,
}) => {
  const [userReservationDeleteMutation] = useMutation(RESERVATION_DELETE_QUERY);
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO,
    },
  });

  const onSubmit = async (id) => {
    const {
      data: { UserReservationDelete },
    } = await userReservationDeleteMutation({
      variables: {
        id: id,
      },
    });
    console.log(UserReservationDelete);
    if (UserReservationDelete) {
      Alert.alert("삭제 되었습니다.");
      navigation.replace("ReservationCheckScreen");
    } else {
      setLoaded(false);
      Alert.alert("삭제에 실패했습니다. 다시 시도해주세요.");
      navigation.replace("ReservationCheckScreen");
    }
  };

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
          <Text>
            예약일시 :{" "}
            <Moment format="YYYY-MM-DD" element={Text}>
              {createdAt}
            </Moment>
          </Text>
          <TouchableOpacity
            onPress={() => {
              onSubmit(id);
            }}
          >
            <Text>삭제</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return null;
    }
  }
};
