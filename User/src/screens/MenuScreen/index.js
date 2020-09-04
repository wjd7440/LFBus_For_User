import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
export default ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>공지사항</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReservationCheckScreen");
        }}
      >
        <Text>버스 예약 확인</Text>
      </TouchableOpacity>
    </View>
  );
};
