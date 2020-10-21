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

export default ({ navigation, route }) => {
    const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
    const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
    const { data, loading } = useQuery(BUS_ROUTE_DETAIL_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            ROUTE_CD: ROUTE_CD[0],
        },
    });

    return (
        <ScrollView>
            <Header
                back
                title={ROUTE_NO + "번 버스 운행정보"}
                close
                closeNavigate={"HomeScreen"}
                navigation={navigation}
            />
            <Text>기점 : </Text>
            <Text>종점 : </Text>
            <Text>운행시간 : </Text>
        </ScrollView>
    );
};
