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
                    title={"비밀번호 변경"}
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <View style={{ ...styles.container }}>
                    <View style={styles.formArea}>
                        <Text style={styles.signTit}>평등한 사회로{"\n"}한걸음</Text>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>새 비밀번호</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textForm}
                                placeholder={"새 비밀번호를 입력해주세요."}
                                name="password"
                                onChangeText={(text) => {
                                    setValue("password", text, true);
                                }}
                            />
                            {errors.password && (
                                <Block>
                                    <Text style={styles.errorTxt}>{errors.password.message}</Text>
                                </Block>
                            )}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.question}>새 비밀번호 확인</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textForm}
                                placeholder={"새 비밀번호를 확인해주세요."}
                                name="passwordConfirm"
                                onChangeText={(text) => {
                                    setValue("passwordConfirm", text, true);
                                }}
                            />
                            {errors.passwordConfirm && (
                                <Block>
                                    <Text style={styles.errorTxt}>
                                        {errors.passwordConfirm.message}
                                    </Text>
                                </Block>
                            )}
                        </View>
                    </View>
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
