import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "react-native-searchable-dropdown";
import { ACCOUNT_INFO_QUERY } from "../Queries";
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

export default ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItemsArray] = useState([]);
  const [arriveStationNo, setArriveStationNo] = useState(null);
  const [arriveStationName, setArriveStationName] = useState(null);
  const { data: user, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });
  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      equipment: route.params ? route.params.equipment : null,
      memo: route.params ? route.params.memo : null,
    },
  });
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const DESTINATION = route.params ? route.params.DESTINATION : null;
  // const equipment = route.params ? route.params.equipment : null;
  // const memo = route.params ? route.params.memo : null;
  // console.log(equipment, memo);
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
    dataLoader();
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
      <Text>보조기구 종류 :</Text>
      <TextInput
        onChangeText={(text) => setValue("equipment", text, true)}
        value={watch("equipment")}
      ></TextInput>
      <Text>메모 :</Text>
      <TextInput
        onChangeText={(text) => setValue("memo", text, true)}
        value={watch("memo")}
      ></TextInput>
      <Button title="예약하기" onPress={() => this.props.navigation.goBack()} />
      <Button title="취소하기" onPress={() => this.props.navigation.goBack()} />
    </View>
  );
};
