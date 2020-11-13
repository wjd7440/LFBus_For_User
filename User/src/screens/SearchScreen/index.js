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
  TouchableHighlight,
} from "react-native";
import { BUS_ROUTE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { Header } from "../../../components";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-fontawesome-pro";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#F63A3A" }}>
              <Text style={styles.busTypeTxt}>급행</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
      );
    } else if (item.ROUTE_TP === 2) {
      return (
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#3351E6" }}>
              <Text style={styles.busTypeTxt}>간선</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
      );
    } else if (item.ROUTE_TP === 3) {
      return (
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#5BB025" }}>
              <Text style={styles.busTypeTxt}>지선</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
      );
    } else if (item.ROUTE_TP === 4) {
      return (
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#5BB025" }}>
              <Text style={styles.busTypeTxt}>외곽</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
      );
    } else if (item.ROUTE_TP === 5) {
      return (
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#3BA5F4" }}>
              <Text style={styles.busTypeTxt}>마을</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
      );
    } else if (item.ROUTE_TP === 6) {
      return (
        <TouchableHighlight
          underlayColor={"#f5f5f5"}
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate("BusRouteInfoScreen", {
              ROUTE_CD: String(item.ROUTE_CD),
              ROUTE_NO: item.ROUTE_NO,
            });
          }}
        >
          <View style={[styles.flexRow]}>
            <View style={{ ...styles.busType, backgroundColor: "#5BB025" }}>
              <Text style={styles.busTypeTxt}>첨단</Text>
            </View>
            <Text style={styles.itemStyleTxt}>{item.ROUTE_NO + "번"}</Text>
          </View>
        </TouchableHighlight>
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

  const NoneItem = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Icon name="info-circle" type="light" size={28} color={"#767676"} />
        <Text style={{ marginTop: 8, fontSize: 16, color: "#767676" }}>
          검색결과가 없습니다.
        </Text>
      </View>
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
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="버스 번호를 입력해주세요."
            placeholderTextColor="#8D8E93"
            keyboardType={"number-pad"}
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
            contentContainerStyle={{ flexGrow: 1 }}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            ListEmptyComponent={NoneItem}
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
    paddingHorizontal: 15,
    justifyContent: "center",
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  itemStyleTxt: {
    fontSize: 15,
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#efefef",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  busType: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginRight: 5,
    height: 18,
  },
  busTypeTxt: {
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 0,
    color: "#fff",
  },
});
