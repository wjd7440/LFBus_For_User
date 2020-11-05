import React, { Component } from "react";
import { Text } from "react-native-paper";
import RadioGroup from "../../../components/RadioGroup";
import CheckBox from "react-native-check-box";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Picker,
    Keyboard,
    KeyboardAvoidingView,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import { useQuery } from "react-apollo-hooks";
import { Block, theme } from "galio-framework";
import {
    ACCOUNT_INFO_QUERY,
} from "../Queries";

export default ({ navigation, route }) => {

    const { data, loading } = useQuery(ACCOUNT_INFO_QUERY, {
        fetchPolicy: "network-only",
    });

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Header
                    back
                    title={"내 정보"}
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <View style={{ ...styles.container }}>
                    <View style={styles.formArea}>
                        <Text style={styles.signTit}>평등한 사회로{"\n"}한걸음</Text>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>아이디(이메일)</Text>
                            <Text style={styles.textForm}>{!loading && data.UserInfo.userId}</Text>
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.question}>사용하는 보조기구</Text>
                            <Text style={styles.textForm}>{!loading && data.UserInfo.equipmentName}</Text>
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>
                                어떤 도움이 필요하신가요?
                            </Text>
                            <View>
                                <Text style={styles.textForm}>{!loading && data.UserInfo.needHelp}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableHighlight
                        underlayColor={"#333FDA"}
                        style={{ ...styles.onButton }}
                        onPress={() => {
                            navigation.navigate("AccountEditScreen", {
                                userId: data.UserInfo.userId,
                                needHelp: data.UserInfo.needHelp,
                                equipment: data.UserInfo.equipment
                            });
                        }}
                    >
                        <Text style={styles.buttonTxt}>정보 수정</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight
                        underlayColor={"#333FDA"}
                        style={{ ...styles.onButton }}
                    >
                        <Text style={styles.buttonTxt}>비밀번호 변경</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingLeft: 15,
        paddingRight: 15,
    },
    formArea: {
        width: "100%",
    },
    signTit: {
        fontSize: hp("4%"),
        color: "#4B56F1",
        marginTop: hp("5%"),
        marginBottom: hp("3%"),
    },
    formControl: {
        marginBottom: 20,
    },
    question: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 3,
    },
    textForm: {
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
        width: "100%",
        height: hp("5%"),
        paddingLeft: 0,
        paddingRight: 5,
        marginBottom: 8,
        fontSize: 16,
    },
    buttonArea: {
        width: "100%",
        height: hp("5%"),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTitle: {
        color: "white",
    },
    onButton: {
        backgroundColor: "#4B56F1",
        width: "100%",
        height: hp("7.6%"),
        justifyContent: "center",
        alignItems: "center",
        // borderRadius: 4,
    },
    offButton: {
        backgroundColor: "#fff",
        width: "100%",
        height: hp("7.6%"),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    buttonTxt: {
        fontSize: 16,
        color: "white",
    },
    errorTxt: {
        color: "#FF3B3B",
        fontSize: 13,
    },
});
