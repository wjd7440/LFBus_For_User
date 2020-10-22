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
import { BUS_END_STATION_DETAIL_QUERY } from "../Queries";

export default ({ END_NODE_ID }) => {
    const { data, loading } = useQuery(BUS_END_STATION_DETAIL_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            END_NODE_ID: END_NODE_ID,
        },
    });
    if (loading) {
        return (
            <Text>종점 정보를 불러오는 중입니다.</Text>
        )
    } else {
        return (
            <View>
                <Text>종점 : {data.UserBusEndStationDetail.BUSSTOP_NM}</Text>
            </View>
        );
    }

};
