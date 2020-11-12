import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";
// import { TextInput } from "react-native-paper";

export default ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Header
          back
          title={"비밀번호 변경"}
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.formControl}>
              <Text style={styles.question}>현재 비밀번호</Text>
              <TextInput
                mode={"flat"}
                secureTextEntry={true}
                style={styles.textForm}
                keyboardType="default"
                placeholder={"현재 비밀번호를 입력해주세요."}
                name="password"
                theme={{
                  colors: {
                    placeholder: "#b7b7b7",
                    primary: "#4B56F1",
                    underlineColor: "transparent",
                  },
                }}
                // onChangeText={(text) => {
                //   setValue("password", text, true);
                // }}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.question}>변경 비밀번호</Text>
              <TextInput
                mode={"flat"}
                secureTextEntry={true}
                style={styles.textForm}
                keyboardType="default"
                placeholder={"변경하실 비밀번호를 입력해주세요."}
                name="password"
                theme={{
                  colors: {
                    placeholder: "#b7b7b7",
                    primary: "#4B56F1",
                    underlineColor: "transparent",
                  },
                }}
                // onChangeText={(text) => {
                //   setValue("password", text, true);
                // }}
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.question}>변경 비밀번호 확인</Text>
              <TextInput
                mode={"flat"}
                secureTextEntry={true}
                style={styles.textForm}
                keyboardType="default"
                placeholder={"변경 비밀번호를 다시 입력해주세요."}
                name="password"
                theme={{
                  colors: {
                    placeholder: "#b7b7b7",
                    primary: "#4B56F1",
                    underlineColor: "transparent",
                  },
                }}
                // onChangeText={(text) => {
                //   setValue("password", text, true);
                // }}
              />
            </View>

            <View>
              <TouchableHighlight
                underlayColor={"#333FDA"}
                style={{ ...styles.onButton }}
                onPress={() => {}}
              >
                <Text style={styles.buttonTxt}>비밀번호 변경</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,
  question: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  // textForm: {
  //   width: "100%",
  //   marginBottom: 8,
  //   fontSize: 16,
  //   backgroundColor: "#fff",
  //   padding: 0,
  //   margin: 0,
  // },

  textForm: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    width: "100%",
    height: hp("6%"),
    paddingLeft: 0,
    paddingRight: 5,
    marginBottom: 8,
    fontSize: 16,
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
