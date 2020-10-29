import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { Header } from "../../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { USER_MAILEAGE_LIST_QUERY } from "../Queries";

export default ({ navigation }) => {

    const { data, loading } = useQuery(USER_MAILEAGE_LIST_QUERY, {
        fetchPolicy: "network-only",
    });

    return (
        <ScrollView>

            <Header title="충전내역" />
            <Text>sample</Text>
        </ScrollView>
    );
};
