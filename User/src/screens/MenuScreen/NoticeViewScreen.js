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
      <Header back title={"공지사항 상세"} navigation={navigation} />
      <ScrollView>
        <View style={[styles.notiHeader]}>
          <Text style={styles.notiTit}>공지사항입니다.</Text>
          <Text style={styles.notiDate}>2020.11.16</Text>
        </View>
        <View style={styles.notiBody}>
          <Text style={styles.notiBodyTxt}>
            안녕하세요. WITH B입니다. {"\n"}
            {"\n"}저상버스를 쉽게 이용할 수 있도록 교통약자들을 위해
            제작되었습니다. 아직 초기 개발단계이며 계속 업데이트 될 예정입니다.
            부족하지만 많은 피드백 부탁드리며, 보다 더 나은 서비스를 제공하도록
            노력하겠습니다.
            {"\n"}
            {"\n"}감사합니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,

  notiHeader: {
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  notiTit: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 26,
  },
  notiDate: {
    color: "#767676",
  },
  notiBody: {
    paddingBottom: 12,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  notiBodyTxt: {
    fontSize: 15,
    lineHeight: 26,
  },
});
