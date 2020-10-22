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
                title="포인트 사용내역"
                close
                closeNavigate={"HomeScreen"}
                navigation={navigation}
            />
        </ScrollView>
    );
};
