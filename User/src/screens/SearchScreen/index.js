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
          title="노선 검색"
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BusStationSearchScreen");
          }}
        >
          <Text>정류장 검색</Text>
        </TouchableOpacity>
        {data.UserBusRouteList.busRoutes.map((rowData, index) => {
          if (rowData.ROUTE_TP === 1) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>급행 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          } else if (rowData.ROUTE_TP === 2) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>간선 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          } else if (rowData.ROUTE_TP === 3) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>지선 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}~{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          } else if (rowData.ROUTE_TP === 4) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>외곽 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )}{" "}~{" "}{rowData.ORIGIN_END.toString().replace(
                    /\B(?=(\d{2})+(?!\d))/g,
                    ":"
                  )} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          } else if (rowData.ROUTE_TP === 5) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>마을 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          } else if (rowData.ROUTE_TP === 6) {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BusRouteInfoScreen", {
                      ROUTE_CD: rowData.ROUTE_CD,
                      ROUTE_NO: rowData.ROUTE_NO
                    });
                  }}
                >
                  <Text>첨단 {rowData.ROUTE_NO}번</Text>
                  <Text>평일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL}분</Text>
                  <Text>토요일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SAT}분</Text>
                  <Text>공휴일 : {rowData.ORIGIN_START}~{rowData.ORIGIN_END} / 배차 간격 : {rowData.ALLO_INTERVAL_SUN}분</Text>
                </TouchableOpacity>
              </>
            )
          }
        })}
      </ScrollView>
    );
  }
};
