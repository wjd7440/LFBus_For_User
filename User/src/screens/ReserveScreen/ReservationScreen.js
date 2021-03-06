import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SearchableDropdown from "react-native-searchable-dropdown";
import style from "../../../constants/style";
import {
  ACCOUNT_INFO_QUERY,
  RESERVATION_WRITE_QUERY,
  BUS_INFO_QUERY,
  BUS_ROTATION_LIST_QUERY,
  RESERVATION_LIST_QUERY,
  USER_MAILEAGE_WRITE_QUERY,
} from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { useMutation } from "react-apollo-hooks";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
} from "react-native";
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Header } from "../../../components";
import Icon from "react-native-fontawesome-pro";
import { Button, Checkbox } from "galio-framework";
import { Appbar, TouchableRipple } from "react-native-paper";

export default ({ navigation, route }) => {
  const scrollViewToScroll = React.createRef();

  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [reservationMutation] = useMutation(RESERVATION_WRITE_QUERY, {
    refetchQueries: () => [{ query: RESERVATION_LIST_QUERY }],
  });
  // const [data, setData] = useState(null);
  const [existBus, setExistBus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [existBusLoaded, setExistBusLoaded] = useState(false);
  const [items, setItemsArray] = useState([]);
  const [arriveStationNo, setArriveStationNo] = useState(null);
  const [arriveStationName, setArriveStationName] = useState(null);
  const [equipmentId, setEquipmentId] = useState();
  const [equipmentName, setEquipmentName] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [pay, setPay] = useState(false);

  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      equipment: route.params ? route.params.equipment : null,
      needHelp: route.params ? route.params.needHelp : null,
    },
  });
  const DIR = route.params ? route.params.DIR : null;

  const needHelp = route.params ? route.params.needHelp : null;
  const equipment = route.params ? route.params.equipment : null;
  const equipmentNa = route.params ? route.params.equipmentNa : null;
  const maileage = route.params ? route.params.maileage : null;
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

  const { data: reservationList, reservationListLoading } = useQuery(
    RESERVATION_LIST_QUERY,
    {
      fetchPolicy: "network-only",
    }
  );
  const count =
    !reservationListLoading &&
    reservationList &&
    reservationList.UserReservationList &&
    reservationList.UserReservationList.count;

  const API_KEY2 =
    "VdRcdTnGThY8JlO8dlKwYiGDChsfzFgGBkkqw%2FTjJzaoVaDEPobGUUhI4uUStpL9MD2p5cCrr5eSKV8JOw4W3g%3D%3D";

  const equipmentArray = [
    {
      id: "1",
      name: "수동휠체어",
    },
    {
      id: "2",
      name: "전동휠체어",
    },
    {
      id: "3",
      name: "전동스쿠터",
    },
    {
      id: "4",
      name: "유모차",
    },
    {
      id: "5",
      name: "없음",
    },
  ];
  const [maileageWriteMutation] = useMutation(USER_MAILEAGE_WRITE_QUERY);
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

  useEffect(() => {
    if (scrollViewToScroll.current) {
      scrollViewToScroll.current.scrollTo({
        x: 0,
        y: dynamicHeight,
        animated: true,
      });
    }
  }, [scrollViewToScroll]);

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
            if (count > 0) {
              Alert.alert(
                "탑승요청은 한번만 신청 가능합니다. 메뉴에서 탑승 취소 버튼을 눌러주세요."
              );
              return false;
            }
            if (pay) {
              const {
                data: { UserMaileageWrite },
              } = await maileageWriteMutation({
                variables: {
                  maileage: -1250,
                },
              });
            }

            const {
              data: { UserReservationWrite },
            } = await reservationMutation({
              variables: {
                ROUTE_NO: ROUTE_NO[0],
                CAR_REG_NO: CAR_REG_NO[0],
                BUS_NODE_ID,
                departureStation: BUSSTOP_NM,
                arrivalStation: arriveStationName,
                equipment: equipmentId,
                equipmentName: equipmentName,
                memo: needHelp,
                pay: pay,
                deviceToken: busInfo.UserBusInfo.deviceToken,
              },
            });

            if (UserReservationWrite) {
              Alert.alert("예약이 완료되었습니다.");
              navigation.navigate("내 주변 정류장", {
                screen: "HomeScreen",
              });
            } else {
              setLoaded(false);
              Alert.alert("예약에 실패했습니다. 다시 시도해주세요.");
              navigation.navigate("내 주변 정류장", {
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
    if (!loading) {
      let tempItems = [];
      const start_seq = data.UserBusRotationList.busRotations.filter(
        (rowData) => {
          return rowData.BUSSTOP_TP === 1 ? true : false;
        }
      );
      const upTrainSeq = data.UserBusRotationList.busRotations.filter(
        (rowData) => {
          return rowData.BUSSTOP_TP === 2 ? true : false;
        }
      );
      const downTrainSeq = data.UserBusRotationList.busRotations.filter(
        (rowData) => {
          return rowData.BUSSTOP_TP === 3 ? true : false;
        }
      );
      const currentSeq = data.UserBusRotationList.busRotations.filter(
        (rowData) => {
          return rowData.BUS_NODE_ID === BUS_NODE_ID ? true : false;
        }
      );

      const array = data.UserBusRotationList.busRotations.filter((rowData) => {
        if (DIR === 0) {
          // console.log({ rowData: rowData.BUSSTOP_SEQ, currentSeq: currentSeq[0].BUSSTOP_SEQ, upTrainSeq: upTrainSeq[0].BUSSTOP_SEQ })
          return rowData.BUSSTOP_SEQ >= currentSeq[0].BUSSTOP_SEQ &&
            rowData.BUSSTOP_SEQ <= upTrainSeq[0].BUSSTOP_SEQ
            ? true
            : false;
        } else {
          // console.log({ rowData: rowData.BUSSTOP_SEQ, currentSeq: currentSeq[0].BUSSTOP_SEQ, downTrainSeq: downTrainSeq[0].BUSSTOP_SEQ })
          return rowData.BUSSTOP_SEQ >= currentSeq[0].BUSSTOP_SEQ &&
            rowData.BUSSTOP_SEQ <= downTrainSeq[0].BUSSTOP_SEQ
            ? true
            : false;
        }
      });

      array.map((rowData, index) => {
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight =
          event.endCoordinates.height > 100
            ? Platform.OS == "ios"
              ? event.endCoordinates.height
              : 0
            : 0;

        setKeyboardHeight(keyboardHeight);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (event) => {
        setKeyboardHeight(0);
      }
    );
    setPay(false);
    setEquipmentName(equipmentNa);
    setEquipmentId(equipment);
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Header
        back
        title="탑승요청"
        // close
        // closeNavigate={"HomeScreen"}
        navigation={navigation}
      />
      <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
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
            <View style={styles.selectCont}>
              <View style={styles.selectIcon} pointerEvents="none">
                <Icon
                  name="map-marker-alt"
                  type="light"
                  size={16}
                  color={"#727272"}
                />
              </View>
              <SearchableDropdown
                onLayout={(event) => {
                  items.name == BUSSTOP_NM &&
                    setDynamicHeight(event.nativeEvent.layout.y);
                }}
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
                  maxHeight: 208,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 4,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
                items={items}
                chip={true}
                resetValue={false}
                placeholderTextColor={"#8D8E93"}
                textInputProps={{
                  placeholder: "하차 정류장을 선택해주세요.",
                  underlineColorAndroid: "transparent",
                  style: {
                    height: 54,
                    paddingLeft: 36,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderColor: "#4B56F1",
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    fontSize: 16,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              <View style={styles.selectArrow} pointerEvents="none">
                <Icon
                  name="angle-right"
                  type="light"
                  size={16}
                  color={"#727272"}
                />
              </View>
            </View>
          </View>

          <View style={styles.formControl}>
            <Text
              style={{
                ...styles.formControlTit,
              }}
            >
              보조기구 선택
            </Text>
            <View style={styles.selectCont}>
              <View style={styles.selectIcon} pointerEvents="none">
                <Icon
                  name="wheelchair"
                  type="light"
                  size={16}
                  color={"#727272"}
                />
              </View>
              <SearchableDropdown
                multi={true}
                containerStyle={{
                  padding: 0,
                }}
                onItemSelect={(item) => {
                  setEquipmentId(item.id);
                  setEquipmentName(item.name);
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
                  maxHeight: 208,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 4,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
                items={equipmentArray}
                defaultIndex={equipment}
                chip={true}
                resetValue={false}
                placeholderTextColor={"#8D8E93"}
                textInputProps={{
                  placeholder: "보조기구를 선택해주세요.",
                  underlineColorAndroid: "transparent",
                  style: {
                    height: 54,
                    paddingLeft: 36,
                    paddingRight: 15,
                    borderWidth: 1,
                    borderColor: "#4B56F1",
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    fontSize: 16,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              <View style={styles.selectArrow} pointerEvents="none">
                <Icon
                  name="angle-right"
                  type="light"
                  size={16}
                  color={"#727272"}
                />
              </View>
            </View>
          </View>

          {/* [일단 주석] 필요한 도움 주석*/}
          <View style={styles.formControl}>
            <Text
              style={{
                ...styles.formControlTit,
              }}
            >
              필요한 도움{" "}
              <Text style={{ fontSize: 14, color: "#676767" }}>(선택사항)</Text>
            </Text>

            <TextInput
              name="needHelp"
              placeholder="필요하신 도움을 입력해주세요."
              style={styles.needInput}
              onChangeText={(text) => setValue("needHelp", text, true)}
              value={watch("needHelp")}
            ></TextInput>
          </View>

          <View style={styles.emptyLine} />

          <Text style={{ ...styles.sectionTit, marginBottom: 15 }}>결제</Text>

          {/* //보유중인 포인트 내역 */}
          <View style={[styles.point]}>
            <Text
              style={{
                ...styles.pointTxt,
                opacity: 0.97,
              }}
            >
              보유포인트
            </Text>

            <NumberFormat
              value={maileage}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(maileage) => (
                <Text style={{ ...styles.pointTxt, fontSize: 18 }}>
                  {maileage}P
                </Text>
              )}
            />
          </View>
          {/* 보유중인 포인트 내역 끝 // */}
          {maileage > 0 ? (
            <View style={{ marginBottom: 30 }}>
              <Checkbox
                color="#fff"
                checkboxStyle={{ backgroundColor: "#fff" }}
                iconColor="#4B56F1"
                label="탑승 전 결제하겠습니다."
                labelStyle={{ fontSize: 16, color: "#fff" }}
                onChange={() => setPay(!pay)}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  height: 50,
                  borderRadius: 4,
                  borderWidth: 1,
                  backgroundColor: "#4B56F1",
                  borderColor: "#4b56f1",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#767676",
                  marginTop: 6,
                  textAlign: "center",
                }}
              >
                탑승요금{" "}
                <Text style={{ fontWeight: "bold", color: "#111" }}>
                  1,250P
                </Text>
                가 차감됩니다.
              </Text>
            </View>
          ) : (
            <View style={{ marginBottom: 30 }}>
              <Checkbox
                disabled={true}
                color="#fff"
                iconColor="#4B56F1"
                label="탑승 전 결제하겠습니다."
                labelStyle={{ fontSize: 16, color: "#fff" }}
                onChange={() => setPay(!pay)}
                // flexDirection="row-reverse"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  height: 50,
                  borderRadius: 4,
                  borderWidth: 1,
                  backgroundColor: "#4B56F1",
                  borderColor: "#4b56f1",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#767676",
                  marginTop: 6,
                  textAlign: "center",
                }}
              >
                탑승요금{" "}
                <Text style={{ fontWeight: "bold", color: "#111" }}>
                  1,250P
                </Text>
                가 차감됩니다.
              </Text>
            </View>
          )}

          {/* <Button
            title="취소하기"
            onPress={() => {
              navigation.replace("내 주변 정류장", {
                screen: "HomeScreen",
              });
            }}
          /> */}
        </View>

        {arriveStationName ? (
          <TouchableRipple
            underlayColor={"#333FDA"}
            rippleColor="rgba(51,63, 218, .8)"
            style={styles.onButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.onButtonTxt}>탑승요청</Text>
          </TouchableRipple>
        ) : (
          <TouchableRipple
            style={styles.offButton}
            disabled={true}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.offButtonTxt}>탑승요청</Text>
          </TouchableRipple>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,
  selectIcon: {
    position: "absolute",
    left: 15,
    top: 19,
    zIndex: 99,
  },
  selectArrow: {
    position: "absolute",
    right: 15,
    top: 20,
    // marginTop: -7,
  },
  point: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    // paddingHorizontal: 15,
    marginBottom: 20,
  },
  pointTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  onButton: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B56F1",
    borderRadius: 0,
  },
  onButtonTxt: {
    fontSize: 16,
    color: "#fff",
  },
  offButton: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDDDF",
    borderRadius: 0,
  },
  offButtonTxt: {
    fontSize: 16,
    color: "#A3A4A9",
  },
  needInput: {
    backgroundColor: "#fff",
    paddingLeft: 15,
    height: 54,
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
