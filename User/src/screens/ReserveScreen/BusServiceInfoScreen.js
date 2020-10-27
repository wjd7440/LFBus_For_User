import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_ROUTE_DETAIL_QUERY } from "../Queries";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import BusStartStationScreen from "./BusStartStationScreen";
import BusTurnStationScreen from "./BusTurnStationScreen";
import BusEndStationScreen from "./BusEndStationScreen";
import style from "../../../constants/style";

export default ({ navigation, route }) => {
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const { data, loading } = useQuery(BUS_ROUTE_DETAIL_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD[0],
    },
  });
  const START_NODE_ID =
    !loading &&
    data.UserBusRouteDetail &&
    data.UserBusRouteDetail.START_NODE_ID;
  const TURN_NODE_ID =
    !loading && data.UserBusRouteDetail && data.UserBusRouteDetail.TURN_NODE_ID;
  const END_NODE_ID =
    !loading && data.UserBusRouteDetail && data.UserBusRouteDetail.END_NODE_ID;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <View>
        <Header
          back
          title={ROUTE_NO + "번 버스 운행정보"}
          navigation={navigation}
        />
        <ScrollView>
          <View style={styles.container}>
            <BusStartStationScreen START_NODE_ID={START_NODE_ID} />
            <BusTurnStationScreen TURN_NODE_ID={TURN_NODE_ID} />
            <BusEndStationScreen END_NODE_ID={END_NODE_ID} />
            <View
              style={[styles.infoBox, styles.marginPull, styles.containerH]}
            >
              <Text style={styles.infoBoxTit}>운행시간</Text>
              <Text style={styles.infoBoxTxt}>
                평일 :{" "}
                {data.UserBusRouteDetail.ORIGIN_START.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}{" "}
                ~{" "}
                {data.UserBusRouteDetail.ORIGIN_END.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}
              </Text>
              <Text style={styles.infoBoxTxt}>
                토요일 :{" "}
                {data.UserBusRouteDetail.ORIGIN_START_SAT.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}{" "}
                ~{" "}
                {data.UserBusRouteDetail.ORIGIN_END_SAT.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}
              </Text>
              <Text style={styles.infoBoxTxt}>
                일요일 :{" "}
                {data.UserBusRouteDetail.ORIGIN_START_SUN.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}{" "}
                ~{" "}
                {data.UserBusRouteDetail.ORIGIN_END_SUN.toString().replace(
                  /\B(?=(\d{2})+(?!\d))/g,
                  ":"
                )}
              </Text>
            </View>
            <View
              style={[styles.infoBox, styles.marginPull, styles.containerH]}
            >
              <Text style={styles.infoBoxTit}>배차간격</Text>
              <Text style={styles.infoBoxTxt}>
                평일 : {data.UserBusRouteDetail.ALLO_INTERVAL}분
              </Text>
              <Text style={styles.infoBoxTxt}>
                토요일 : {data.UserBusRouteDetail.ALLO_INTERVAL_SAT}분
              </Text>
              <Text style={styles.infoBoxTxt}>
                일요일,공휴일 : {data.UserBusRouteDetail.ALLO_INTERVAL_SUN}분
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ...style,
  infoBox: {
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    paddingVertical: 15,
  },
  infoBoxTit: {
    fontSize: 16,
    color: "#4B56F1",
    marginBottom: 8,
  },
  infoBoxTxt: {
    fontSize: 16,
  },
});
