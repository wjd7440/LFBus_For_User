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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";
import { TextInput } from "react-native-paper";

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
                selectionColor={"#111"}
                style={styles.textForm}
                placeholder={"현재 비밀번호를 입력해주세요."}
                name="password"
                // onChangeText={(text) => {
                //   setValue("password", text, true);
                // }}
              />
            </View>
            <Text>sample</Text>
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
    marginBottom: 8,
  },
  textForm: {
    width: "100%",
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
