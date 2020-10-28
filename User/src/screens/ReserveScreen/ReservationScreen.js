import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "react-native-searchable-dropdown";
import style from "../../../constants/style";
import {
  ACCOUNT_INFO_QUERY,
  RESERVATION_WRITE_QUERY,
  BUS_INFO_QUERY,
  BUS_ROTATION_LIST_QUERY,
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
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Header } from "../../../components";
import Icon from "react-native-fontawesome-pro";

export default ({ navigation, route }) => {
  const [reservationMutation] = useMutation(RESERVATION_WRITE_QUERY);
  // const [data, setData] = useState(null);
  const [existBus, setExistBus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [existBusLoaded, setExistBusLoaded] = useState(false);
  const [items, setItemsArray] = useState([]);
  const [arriveStationNo, setArriveStationNo] = useState(null);
  const [arriveStationName, setArriveStationName] = useState(null);

  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      equipment: route.params ? route.params.equipment : null,
      needHelp: route.params ? route.params.needHelp : null,
    },
  });
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
  const DESTINATION = route.params ? route.params.DESTINATION : null;
  const CAR_REG_NO = route.params ? route.params.CAR_REG_NO : null;
  const parseString = require("react-native-xml2js").parseString;
  const { data, loading } = useQuery(BUS_ROTATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD[0],
    },
  });

  const { data: busInfo, busInfoLoading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  // const API_KEY =
  //   "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";

  // const dataLoader = () => {
  //   axios({
  //     url: `http://openapitraffic.daejeon.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${API_KEY}&busRouteId=${ROUTE_CD}`,
  //     method: "get",
  //   }).then((response) => {
  //     parseString(response.data, function (err, result) {
  //       const busRouteInfoArray = result.ServiceResult.msgBody;
  //       setData(busRouteInfoArray);
  //       setLoaded(true);
  //     });
  //   });
  // };

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
          // console.log(busArriveInfoArray[0].itemList)
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
                memo: data.needHelp,
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

  // useEffect(() => {
  //   dataLoader();
  // }, []);

  useEffect(() => {
    if (!loading) {
      let tempItems = [];
      data.UserBusRotationList.busRotations.map((rowData, index) => {
        if (BUS_NODE_ID === rowData.BUS_NODE_ID) {
          tempItems.push({
            id: rowData.BUS_NODE_ID,
            name: "(현재 내 위치) " + rowData.BUSSTOP_NM,
          });
        } else {
          tempItems.push({
            id: rowData.BUS_NODE_ID,
            name: rowData.BUSSTOP_NM,
          });
        }
      });
      setItemsArray(tempItems);
    }
  }, [loading]);

  return (
    <View>
      <Header
        back
        title="탑승요청"
        close
        closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.sectionTit}>정류장 선택</Text>
          <View style={styles.formControl}>
            <Text
              style={{
                ...styles.formControlTit,
              }}
            >
              선택한 버스
            </Text>
            <View style={styles.defalutForm}>
              <Text style={styles.defalutFormTxt}>
                {ROUTE_NO}번({DESTINATION} 방면)
              </Text>
            </View>
          </View>

          <View style={styles.formControl}>
            <Text
              style={{
                ...styles.formControlTit,
              }}
            >
              승차정류장
            </Text>
            <View style={styles.defalutForm}>
              <Text style={styles.defalutFormTxt}>{BUSSTOP_NM}</Text>
            </View>
          </View>

          <View style={styles.formControl}>
            <Text
              style={{
                ...styles.formControlTit,
              }}
            >
              하차 정류장
            </Text>
            <SearchableDropdown
              multi={true}
              containerStyle={{
                padding: 0,
              }}
              onItemSelect={(item) => {
                setArriveStationNo(item.id);
                setArriveStationName(item.name);
              }}
              itemStyle={{
                paddingLeft: 15,
                paddingVertical: 12,
                marginTop: 2,
                backgroundColor: "#f5f5f5",
                borderColor: "#ddd",
                borderWidth: 1,
                borderRadius: 4,
              }}
              itemTextStyle={{ color: "#222", fontSize: 16 }}
              itemsContainerStyle={{
                maxHeight: 242,
                backgroundColor: "#f5f5f5",
                borderRadius: 4,
                borderBottomWidth: 1,
                borderColor: "#ddd",
              }}
              items={items}
              defaultIndex={0}
              chip={true}
              resetValue={false}
              placeholderTextColor={"#8D8E93"}
              textInputProps={{
                placeholder: "하차 정류장 검색 및 선택",
                underlineColorAndroid: "transparent",
                style: {
                  height: 54,
                  paddingHorizontal: 15,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 5,
                  backgroundColor: "#fff",
                  fontSize: 16,
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>

          <Text>보조기구 종류 :</Text>
          <TextInput
            name="equipment"
            onChangeText={(text) => setValue("equipment", text, true)}
            value={watch("equipment")}
          ></TextInput>
          <Text>필요한 도움 (선택) :</Text>
          <TextInput
            name="needHelp"
            onChangeText={(text) => setValue("needHelp", text, true)}
            value={watch("needHelp")}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ...style,
});
