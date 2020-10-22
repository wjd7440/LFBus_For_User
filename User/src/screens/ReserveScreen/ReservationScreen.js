import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "react-native-searchable-dropdown";
import {
  ACCOUNT_INFO_QUERY,
  RESERVATION_WRITE_QUERY,
  BUS_INFO_QUERY,
} from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { useMutation } from "react-apollo-hooks";
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
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";

export default ({ navigation, route }) => {
  const [reservationMutation] = useMutation(RESERVATION_WRITE_QUERY);
  const [data, setData] = useState(null);
  const [existBus, setExistBus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [existBusLoaded, setExistBusLoaded] = useState(false);
  const [items, setItemsArray] = useState([]);
  const [arriveStationNo, setArriveStationNo] = useState(null);
  const [arriveStationName, setArriveStationName] = useState(null);

  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      equipment: route.params ? route.params.equipment : null
    },
  });
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
  const DESTINATION = route.params ? route.params.DESTINATION : null;
  const CAR_REG_NO = route.params ? route.params.CAR_REG_NO : null;

  const { data: busInfo, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

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

  const API_KEY2 =
    "VdRcdTnGThY8JlO8dlKwYiGDChsfzFgGBkkqw%2FTjJzaoVaDEPobGUUhI4uUStpL9MD2p5cCrr5eSKV8JOw4W3g%3D%3D";

  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      // console.log(arr[i][prop][0]);
      // console.log(value);
      if (arr[i][prop][0] === value) {
        // console.log("버스있음");
        return true;
      }
    }
    // console.log("버스지나감");
    return false;
  };

  const onSubmit = async (data) => {
    try {
      axios({
        url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY2}&BusStopID=${BUS_NODE_ID}`,
        method: "get",
      }).then((response) => {
        parseString(response.data, async (err, result) => {
          const busArriveInfoArray = result.ServiceResult.msgBody;

          if (
            getIndex(
              CAR_REG_NO[0],
              busArriveInfoArray[0].itemList,
              "CAR_REG_NO"
            )
          ) {
            const {
              data: { UserReservationWrite },
            } = await reservationMutation({
              variables: {
                ROUTE_NO: ROUTE_NO[0],
                CAR_REG_NO: CAR_REG_NO[0],
                BUS_NODE_ID,
                departureStation: BUSSTOP_NM,
                arrivalStation: arriveStationName,
                equipment: data.equipment,
                deviceToken: busInfo.UserBusInfo.deviceToken,
              },
            });

            if (UserReservationWrite) {
              Alert.alert("예약이 완료되었습니다.");
              navigation.replace("내 주변 정류장", {
                screen: "HomeScreen",
              });
            } else {
              setLoaded(false);
              Alert.alert("예약에 실패했습니다. 다시 시도해주세요.");
              navigation.replace("내 주변 정류장", {
                screen: "HomeScreen",
              });
            }
          } else {
            Alert.alert("선택하신 정류장에 예약하시려는 버스가 없습니다.");
          }
        });
      });
    } catch (e) {
      console.log(e);
      setLoaded(false);
      Alert.alert("선택하신 정류장에 예약하시려는 버스가 없습니다.");
      navigation.navigate("HomeScreen");
    }
  };

  useEffect(() => {
    register({ name: "equipment" }, { required: "장비를 입력해주세요." });
  }, [register]);

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
      <Header
        back
        title="승차 요청"
        close
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
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
        name="equipment"
        onChangeText={(text) => setValue("equipment", text, true)}
        value={watch("equipment")}
      ></TextInput>
      {arriveStationName ? (
        <Button title="예약하기" onPress={handleSubmit(onSubmit)} />
      ) : (
          <Button
            disabled={true}
            title="예약하기"
            onPress={handleSubmit(onSubmit)}
          />
        )}

      <Button
        title="취소하기"
        onPress={() => {
          navigation.replace("내 주변 정류장", {
            screen: "HomeScreen",
          });
        }}
      />
    </View>
  );
};
