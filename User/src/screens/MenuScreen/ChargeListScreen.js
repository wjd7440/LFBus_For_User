import React, { Component } from "react";
import Moment from "react-moment";
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
import { USER_MAILEAGE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import NumberFormat from "react-number-format";

export default ({ navigation }) => {
    const { data, loading } = useQuery(USER_MAILEAGE_LIST_QUERY, {
        fetchPolicy: "network-only",
    });
    console.log(!loading && data)

    if (loading) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        return (
            <ScrollView>
                <Header
                    title="사용 및 충전 내역"
                    back
                />
                {data.UserMaileageList.maileages.map((rowData, index) => {
                    const maileages = rowData.account;
                    return (
                        <>
                            {rowData.account > 0 ? <Text>충전</Text> : <Text>사용</Text>}
                            <NumberFormat
                                value={maileages}
                                displayType={"text"}
                                thousandSeparator={true}
                                renderText={(maileages) => (
                                    <Text>{maileages}P</Text>
                                )}
                            />
                            <Moment element={Text} format="YYYY-MM-DD">
                                {rowData.createdAt}
                            </Moment>
                        </>
                    )
                })}

            </ScrollView>
        );
    }


};
