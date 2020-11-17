import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import { Text, Button, TouchableRipple } from "react-native-paper";

export default ({ navigation }) => {
  return (
    <ScrollView>
      <Header
        back
        title={"ass"}
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <Text>sample</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
