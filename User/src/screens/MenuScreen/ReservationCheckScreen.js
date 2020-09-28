import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RESERVATION_LIST_QUERY, BUS_INFO_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import ReservationCheckScreenChild from "./ReservationCheckScreenChild";
export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(RESERVATION_LIST_QUERY, {
    fetchPolicy: "network-only",
  });

  return (
    <View>
      {!loading &&
        data.UserReservationList.reservations.map((rowData, index) => {
          return (
            <ReservationCheckScreenChild
              ROUTE_NO={rowData.ROUTE_NO}
              CAR_REG_NO={rowData.CAR_REG_NO}
              departureStation={rowData.departureStation}
              arrivalStation={rowData.arrivalStation}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
