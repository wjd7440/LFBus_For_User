import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RESERVATION_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(RESERVATION_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  return (
    <View>
      {!loading &&
        data.UserReservationList.reservations.map((rowData, index) => {
          return (
            <View>
              <Text>버스 번호 : {rowData.ROUTE_NO}</Text>
              <Text>차량 번호 : {rowData.CAR_REG_NO}</Text>
              <Text>승차 정류장 : {rowData.departureStation}</Text>
              <Text>하차 정류장 : {rowData.arrivalStation}</Text>
            </View>
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
