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
import { useQuery } from "react-apollo-hooks";
import { BUS_START_STATION_DETAIL_QUERY } from "../Queries";

export default ({ START_NODE_ID }) => {
    const { data, loading } = useQuery(BUS_START_STATION_DETAIL_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            START_NODE_ID: START_NODE_ID,
        },
    });
    if (loading) {
        return (
            <Text>기점 정보를 불러오는 중입니다.</Text>
        )
    } else {
        return (
            <View>
                <Text>기점 : {data.UserBusStartStationDetail.BUSSTOP_NM}</Text>
            </View>
        );
    }

};
