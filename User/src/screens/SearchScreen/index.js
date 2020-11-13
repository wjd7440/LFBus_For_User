import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { BUS_ROUTE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { Header } from "../../../components";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableRipple } from "react-native-paper";

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(BUS_ROUTE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(!loading && data.UserBusRouteList.busRoutes);
    setMasterDataSource(!loading && data.UserBusRouteList.busRoutes);
  }, [loading]);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = String(item.ROUTE_NO);
        15;
        return itemData.indexOf(text) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    if (item.ROUTE_TP === 1) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"급행 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 2) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"간선 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 3) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"지선 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 4) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"외곽 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 5) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"마을 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 6) {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          {"첨단 " + item.ROUTE_NO + "번"}
        </Text>
      );
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    alert("Id : " + item.id + " Title : " + item.title);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: getStatusBarHeight() }}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="버스 번호를 입력해주세요."
            placeholderTextColor="#8D8E93"
          />
          <View style={styles.searchTabBox}>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f6f6f6"}
              style={[styles.OnSearchTabBtn, styles.searchTabBtn]}
              onPress={() => {
                navigation.navigate("BusStationSearchScreen");
              }}
              disabled={true}
            >
              <Text style={styles.OnSearchTabTxt}>버스</Text>
            </TouchableRipple>

            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f6f6f6"}
              style={[styles.searchTabBtn, styles.OffSearchTabBtn]}
              onPress={() => {
                navigation.navigate("BusStationSearchScreen");
              }}
            >
              <Text style={styles.OffSearchTabTxt}>버스 정류장</Text>
            </TouchableRipple>
          </View>

          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  searchTabBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  searchTabBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    flex: 1,
  },
  OnSearchTabBtn: {
    borderBottomWidth: 2,
    borderColor: "#4B56F1",
  },
  OnSearchTabTxt: {
    color: "#4B56F1",
    fontSize: 15,
  },
  OffSearchTabBtn: {},
  OffSearchTabTxt: {
    color: "#8D8E93",
    fontSize: 15,
  },
  textInputStyle: {
    marginTop: 10,
    height: 56,
    paddingLeft: 15,
    fontSize: 15,
    backgroundColor: "#f5f5f5",
  },
});
