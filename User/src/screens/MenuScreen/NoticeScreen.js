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
  NavigationActions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";

export default ({ navigation }) => {
  return (
    <SafeAreaView>
      <Header back title={"공지사항"} navigation={navigation} />
      <ScrollView>
        <TouchableHighlight
          style={styles.notiList}
          underlayColor={"#f5f5f5"}
          onPress={() => {
            navigation.navigate("NoticeViewScreen");
          }}
        >
          <View>
            <Text style={styles.notiTit}>공지사항입니다.</Text>
            <Text style={styles.notiDate}>2020.11.16</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,
  notiList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  notiTit: {
    fontSize: 16,
    lineHeight: 26,
  },
  notiDate: {
    color: "#767676",
  },
});
