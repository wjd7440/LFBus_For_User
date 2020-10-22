import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_ROUTE_DETAIL_QUERY } from "../Queries";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import BusStartStationScreen from "./BusStartStationScreen";
import BusTurnStationScreen from "./BusTurnStationScreen";
import BusEndStationScreen from "./BusEndStationScreen";

export default ({ navigation, route }) => {
    const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
    const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
    const { data, loading } = useQuery(BUS_ROUTE_DETAIL_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            ROUTE_CD: ROUTE_CD[0],
        },
    });
    const START_NODE_ID = !loading && data.UserBusRouteDetail && data.UserBusRouteDetail.START_NODE_ID;
    const TURN_NODE_ID = !loading && data.UserBusRouteDetail && data.UserBusRouteDetail.TURN_NODE_ID;
    const END_NODE_ID = !loading && data.UserBusRouteDetail && data.UserBusRouteDetail.END_NODE_ID;

    if (loading) {
        return (
            <Text>운행정보를 불러오는 중 입니다.</Text>)
    } else {
        return (
            <ScrollView>
                <Header
                    back
                    title={ROUTE_NO + "번 버스 운행정보"}
                    close
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <BusStartStationScreen
                    START_NODE_ID={START_NODE_ID}
                />
                <BusTurnStationScreen
                    TURN_NODE_ID={TURN_NODE_ID}
                />
                <BusEndStationScreen
                    END_NODE_ID={END_NODE_ID}
                />
                <Text>운행시간 : {data.UserBusRouteDetail.ORIGIN_START.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")} ~ {data.UserBusRouteDetail.ORIGIN_END.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")}</Text>
                <Text>토요일 운행시간 : {data.UserBusRouteDetail.ORIGIN_START_SAT.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")} ~ {data.UserBusRouteDetail.ORIGIN_END_SAT.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")}</Text>
                <Text>일요일 운행시간 : {data.UserBusRouteDetail.ORIGIN_START_SUN.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")} ~ {data.UserBusRouteDetail.ORIGIN_END_SUN.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ":")}</Text>
                <Text>배차간격 : {data.UserBusRouteDetail.ALLO_INTERVAL}분</Text>
                <Text>휴일 배차간격 : {data.UserBusRouteDetail.ALLO_INTERVAL_SAT}분</Text>
                <Text>공휴일 배차간격 : {data.UserBusRouteDetail.ALLO_INTERVAL_SUN}분</Text>
            </ScrollView>
        );
    }

};
