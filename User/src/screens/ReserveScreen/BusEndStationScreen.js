import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { BUS_END_STATION_DETAIL_QUERY } from "../Queries";
import style from "../../../constants/style";

export default ({ END_NODE_ID }) => {
  const { data, loading } = useQuery(BUS_END_STATION_DETAIL_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      END_NODE_ID: END_NODE_ID,
    },
  });
  if (loading) {
    return (
      <View style={[styles.infoBox, styles.marginPull, styles.containerH]}>
        <Text style={styles.infoBoxTit}>종점</Text>
        <Text style={styles.infoBoxTxt}>정보를 불러오는 중입니다.</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.infoBox, styles.marginPull, styles.containerH]}>
        <Text style={styles.infoBoxTit}>종점</Text>
        <Text style={styles.infoBoxTxt}>
          {data.UserBusEndStationDetail.BUSSTOP_NM}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ...style,
  infoBox: {
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    paddingVertical: 15,
  },
  infoBoxTit: {
    fontSize: 16,
    color: "#4B56F1",
    marginBottom: 8,
  },
  infoBoxTxt: {
    fontSize: 16,
  },
});
