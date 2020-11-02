import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BUS_ROUTE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { Header } from "../../../components";

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(BUS_ROUTE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <Header
          title="검색"
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BusRouteMapScreen");
          }}
        >
          <Text>정류장 검색</Text>
        </TouchableOpacity>
        {data.UserBusRouteList.busRoutes.map((rowData, index) => {
          if (rowData.ROUTE_TP === 1) {
            return (
              <>
                <Text>급행 {rowData.ROUTE_NO}번</Text>
              </>
            )
          } else if (rowData.ROUTE_TP === 2) {
            return (
              <>
                <Text>간선 {rowData.ROUTE_NO}번</Text>
              </>
            )
          } else if (rowData.ROUTE_TP === 3) {
            return (
              <>
                <Text>지선 {rowData.ROUTE_NO}번</Text>
              </>
            )
          } else if (rowData.ROUTE_TP === 4) {
            return (
              <>
                <Text>외곽 {rowData.ROUTE_NO}번</Text>
              </>
            )
          } else if (rowData.ROUTE_TP === 5) {
            return (
              <>
                <Text>마을 {rowData.ROUTE_NO}번</Text>
              </>
            )
          } else if (rowData.ROUTE_TP === 6) {
            return (
              <>
                <Text>첨단 {rowData.ROUTE_NO}번</Text>
              </>
            )
          }
        })}
      </ScrollView>
    );
  }
};
