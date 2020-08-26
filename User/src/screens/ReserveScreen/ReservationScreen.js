import React, { useState, useEffect } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { BUS_STATION_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Button,
} from "react-native";

export default ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItemsArray] = useState([]);
  const [arriveStationNo, setArriveStationNo] = useState(null);
  const [arriveStationName, setArriveStationName] = useState(null);
  const ROUTE_NO = navigation.getParam("ROUTE_NO");
  const ROUTE_CD = navigation.getParam("ROUTE_CD");
  const BUSSTOP_NM = navigation.getParam("BUSSTOP_NM");
  const DESTINATION = navigation.getParam("DESTINATION");

  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${API_KEY}&busRouteId=${ROUTE_CD}`,
      method: "get",
    }).then((response) => {
      parseString(response.data, function (err, result) {
        const busRouteInfoArray = result.ServiceResult.msgBody;
        setData(busRouteInfoArray);
        setLoaded(true);
      });
    });
  };

  useEffect(() => {
    // let timer = setInterval(() => {
    dataLoader();
    // }, 15000);
  }, []);

  useEffect(() => {
    if (loaded) {
      let tempItems = [];

      data[0].itemList.map((rowData, index) => {
        tempItems.push({
          id: rowData.BUS_NODE_ID[0],
          name: rowData.BUSSTOP_NM[0],
        });
      });
      setItemsArray(tempItems);
    }
  }, [loaded]);
  console.log(items);
  return (
    <View>
      <Text>
        {ROUTE_NO}번({DESTINATION} 방면)
      </Text>
      <Text>승차 정류장 : {BUSSTOP_NM}</Text>
      <Text>하차 정류장 : </Text>
      <SearchableDropdown
        multi={true}
        containerStyle={{ padding: 15 }}
        onItemSelect={(item) => {
          setArriveStationNo(item.id);
          setArriveStationName(item.name);
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222", fontSize: 16 }}
        itemsContainerStyle={{ maxHeight: 216 }}
        items={items}
        defaultIndex={0}
        chip={true}
        resetValue={false}
        textInputProps={{
          placeholder: "하차하실 정류장을 검색/선택 해주세요.",
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            backgroundColor: "#fff",
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
      <Text>보조기구 종류 : 전동휠체어</Text>
      <Text>메모 :</Text>
      <Text>
        교통약자석에 앉아계신분들이 있으면 미리 안내말씀 부탁드립니다.
      </Text>
      <Button title="예약하기" onPress={() => this.props.navigation.goBack()} />
      <Button title="취소하기" onPress={() => this.props.navigation.goBack()} />
    </View>
  );
};
