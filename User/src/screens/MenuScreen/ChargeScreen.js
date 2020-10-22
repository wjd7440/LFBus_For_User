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
import { Header } from "../../../components";

export default ({ navigation }) => {
    return (
        <ScrollView>
            <Header
                back
                title="충전"
                close
                closeNavigate={"HomeScreen"}
                navigation={navigation}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ChargeCompleteScreen");
                }}
            >
                <Text>클릭 시 충전 완료페이지로 이동합니다</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
