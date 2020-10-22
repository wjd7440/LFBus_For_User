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
import { BUS_TURN_STATION_DETAIL_QUERY } from "../Queries";

export default ({ TURN_NODE_ID }) => {
    const { data, loading } = useQuery(BUS_TURN_STATION_DETAIL_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            TURN_NODE_ID: TURN_NODE_ID,
        },
    });

    console.log(!loading && data)
    if (loading) {
        return (
            <Text>반환점 정보를 불러오는 중입니다.</Text>
        )
    } else {
        return (
            <View>
                <Text>반환점 : {data.UserBusTurnStationDetail.BUSSTOP_NM}</Text>
            </View>
        );
    }

};
