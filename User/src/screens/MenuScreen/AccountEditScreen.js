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
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo-hooks";
import { Block, theme } from "galio-framework";


const sexArray = [
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "남성",
        value: "남성",
        selected: false,
    },
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "여성",
        value: "여성",
        selected: false,
    },
];
const equipmentArray = [
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "수동휠체어",
        value: "수동휠체어",
        selected: false,
    },
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "전동휠체어",
        value: "전동휠체어",
        selected: false,
    },
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "전동스쿠터",
        value: "전동스쿠터",
        selected: false,
    },
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "유모차",
        value: "유모차",
        selected: false,
    },
    {
        backgroundBtnColor: "#FFF6E3",
        backgroundIconColor: "#FDB62B",
        label: "없음",
        value: "없음",
        selected: false,
    },
];

export default ({ navigation, route }) => {
    const { register, setValue, handleSubmit, errors, watch } = useForm({
        defaultValues: {
            userId: route.params.userId,
            needHelp: route.params.needHelp,
            equipment: route.params.equipment,
        }
    });
    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Header
                    back
                    title={"내 정보 수정"}
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <View style={{ ...styles.container }}>
                    <View style={styles.formArea}>
                        <Text style={styles.signTit}>평등한 사회로{"\n"}한걸음</Text>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>사용하는 보조기구</Text>
                            <RadioGroup
                                radioButtons={equipmentArray}
                                onPress={(data) => {
                                    const item = data.find((equipment) => {
                                        if (equipment.selected === true) {
                                            return equipment;
                                        }
                                    });
                                    setValue("equipment", item.value, true);
                                }}
                                flexDirection="column"
                            />
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>
                                어떤 도움이 필요하신가요? (선택)
                            </Text>
                            <View>
                                <TextInput
                                    style={styles.textForm}
                                    placeholder={"ex) 교통카드를 대신 찍어주세요. / 괜찮습니다."}
                                    name="needHelp"
                                    value={watch("needHelp")}
                                    onChangeText={(text) => {
                                        setValue("needHelp", text, true);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableHighlight
                        underlayColor={"#333FDA"}
                        style={{ ...styles.onButton }}
                    >
                        <Text style={styles.buttonTxt}>회원 정보 수정</Text>
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
