import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import styles from "../../../styles";

export default ({ navigation }) => {
  return (
    <SafeAreaView>
      <Header back title={"공지사항"} navigation={navigation} />
      <ScrollView>
        <TouchableHighlight
          style={styles.notiList}
          underlayColor={"#f5f5f5"}
          onPress={() => {}}
        >
          <Text>공지사항</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   notiList: {
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//   },
// });
