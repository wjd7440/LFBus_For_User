import React, { Component, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";

export default ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Header back title={"1:1문의"} />
      <ScrollView>
        <View></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,
  collapseHeader: {
    justifyContent: "center",
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  collapseBody: {
    backgroundColor: "#f5f5f5",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  CollapseHeaderTit: {
    width: "90%",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "bold",
  },
  collapseBodyTxt: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
