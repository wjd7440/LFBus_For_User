import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import { BUS_ROUTE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { Header } from "../../../components";

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(BUS_ROUTE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(!loading && data.UserBusRouteList.busRoutes);
    setMasterDataSource(!loading && data.UserBusRouteList.busRoutes);
  }, [loading]);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = String(item.ROUTE_NO); 15
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
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
          {"급행 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 2) {
      return (
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
          {"간선 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 3) {
      return (
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
          {"지선 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 4) {
      return (
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
          {"외곽 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 5) {
      return (
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
          {"마을 " + item.ROUTE_NO + "번"}
        </Text>
      );
    } else if (item.ROUTE_TP === 6) {
      return (
        <Text style={styles.itemStyle} onPress={() => {
          navigation.navigate("BusRouteInfoScreen", {
            ROUTE_CD: String(item.ROUTE_CD),
            ROUTE_NO: item.ROUTE_NO,
          });
        }}>
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
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="버스 번호를 입력해주세요."
          />
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
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
