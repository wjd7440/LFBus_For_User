import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
export default ({ navigation }) => {
  return (
    <View>
      <View>
        <Text>버스 번호</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
