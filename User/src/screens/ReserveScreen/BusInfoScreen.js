import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useQuery } from "react-apollo-hooks";
import {
  ACCOUNT_INFO_QUERY,
  BUS_INFO_QUERY,
  BUS_ROTATION_LIST_QUERY,
} from "../Queries";
import { theme } from "galio-framework";
import style from "../../../constants/style";
import { Header } from "../../../components";

export default ({ navigation, route }) => {
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
  const DESTINATION = route.params ? route.params.DESTINATION : null;
  const DISTANCE = route.params ? route.params.DISTANCE : null;
  const CAR_REG_NO = route.params ? route.params.CAR_REG_NO : null;
  const GPS_LATI = route.params ? route.params.GPS_LATI : null;
  const GPS_LONG = route.params ? route.params.GPS_LONG : null;
  const parseString = require("react-native-xml2js").parseString;
  const [loaded, setLoaded] = useState(false);
  const [liveData, setLiveData] = useState([]);
  const dataLoader = () => {
    axios({
      url:
        "http://openapitraffic.daejeon.go.kr/api/rest/busposinfo/getBusPosByRtid?serviceKey=8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D&busRouteId=" +
        ROUTE_CD,
      method: "get",
    })
      .then((response) => {
        parseString(response.data, (err, result) => {
          const busRouteInfoArray = result.ServiceResult.msgBody;
          setLiveData(busRouteInfoArray);
          setLoaded(true);
        });
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  const { data, loading } = useQuery(BUS_ROTATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD[0],
    },
  });

  const { data: user, userLoading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

  const { data: busInfo, busInfoLoading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  useEffect(() => {
    dataLoader();
  }, []);

  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      // console.log(arr[i][prop][0]);
      // console.log(value);
      if (parseInt(arr[i][prop][0]) === parseInt(value)) {
        // console.log("잇다");
        return true;
      }
    }
    // console.log("버스지나감");
    return false;
  };

  // 스크롤

  // 스크롤 끝

  if (loading || userLoading || busInfoLoading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header
          back
          title={ROUTE_NO[0] + "번"}
          // close
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <ScrollView>
          {/* <View>
            {busInfo.UserBusInfo.SEAT1 ? (
              <View style={styles.seatImgBox}>
                <Image
                  style={styles.seatImg}
                  source={require("../../../assets/off_seat.png")}
                />
              </View>
            ) : (
              <View style={styles.seatImgBox}>
                <Image source={require("../../../assets/on_seat.png")} />
              </View>
            )}
            {busInfo.UserBusInfo.SEAT2 ? (
              <View style={styles.seatImgBox}>
                <Image
                  style={styles.seatImg}
                  source={require("../../../assets/off_seat.png")}
                />
              </View>
            ) : (
              <View style={styles.seatImgBox}>
                <Image source={require("../../../assets/on_seat.png")} />
              </View>
            )}
          </View> */}
          <View>
            {/* //상단 버스 정보 */}
            <View style={styles.containerH}>
              <Text>선택 정류장 : {BUSSTOP_NM}</Text>
              <Text>{DESTINATION} 방면</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("BusRouteMapScreen", {
                    ROUTE_NO: ROUTE_NO,
                    ROUTE_CD: ROUTE_CD,
                    GPS_LATI: GPS_LATI,
                    GPS_LONG: GPS_LONG,
                  });
                }}
              >
                <Text>버스경로</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("BusServiceInfoScreen", {
                    ROUTE_NO: ROUTE_NO,
                    ROUTE_CD: ROUTE_CD,
                    GPS_LATI: GPS_LATI,
                    GPS_LONG: GPS_LONG,
                  });
                }}
              >
                <Text>버스 운행정보</Text>
              </TouchableOpacity>
              <Text>거리 : {DISTANCE}m</Text>
              {DISTANCE < 500 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ReservationScreen", {
                      DISTANCE: DISTANCE,
                      CAR_REG_NO: CAR_REG_NO,
                      ROUTE_NO: ROUTE_NO,
                      ROUTE_CD: ROUTE_CD,
                      DESTINATION: DESTINATION,
                      BUSSTOP_NM: BUSSTOP_NM,
                      BUS_NODE_ID: BUS_NODE_ID,
                      equipment: !loading && user.UserInfo.equipment,
                      needHelp: !loading && user.UserInfo.needHelp,
                    });
                  }}
                >
                  <Text>탑승 요청</Text>
                </TouchableOpacity>
              ) : (
                  <Text>
                    내 위치로부터 500m 내의 버스만 탑승요청을 하실 수 있습니다.
                  </Text>
                )}
            </View>
            {/* 상단 버스 정보// */}
            {data.UserBusRotationList.busRotations.map((rowData, index) => {
              return (
                <View
                  style={
                    rowData.BUS_NODE_ID === BUS_NODE_ID
                      ? styles.onList
                      : styles.list
                  }
                >
                  <View style={styles.busState}>
                    {getIndex(
                      rowData.BUS_NODE_ID,
                      liveData[0].itemList,
                      "BUS_NODE_ID"
                    ) ? (
                        <Image
                          style={[
                            styles.busIcon,
                            index % 5 !== 1 && { display: "none" },
                          ]}
                          source={require("../../../assets/busmarker.png")}
                        />
                      ) : (
                        <Text></Text>
                      )}
                    <View
                      style={[
                        styles.line,
                        index ===
                        data.UserBusRotationList.busRotations.length - 1 && {
                          height: "50%",
                        },
                      ]}
                    />
                    <Image
                      style={styles.busArrow}
                      source={require("../../../assets/busflow_icon.png")}
                    />
                  </View>
                  <View style={styles.busStationInfo}>
                    <Text style={styles.busStationName}>
                      {rowData.BUSSTOP_NM}
                    </Text>
                    {/* {rowData.BUS_NODE_ID === BUS_NODE_ID ? (
                      <Text>내 위치</Text>
                    ) : (
                      <Text></Text>
                    )} */}
                    <Text style={styles.busStationNumber}>
                      {rowData.BUS_STOP_ID}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  ...style,
  list: {
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  onList: {
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    flexDirection: "row",
    backgroundColor: "#EAE7F2",
  },
  busState: {
    position: "relative",
    width: 64,
    justifyContent: "center",
  },
  line: {
    height: 60,
    width: 3,
    backgroundColor: "#4B56F1",
    position: "absolute",
    top: 0,
    right: 10,
  },
  busIcon: {
    resizeMode: "contain",
    width: 28,
    height: 28,
  },
  busArrow: {
    resizeMode: "contain",
    width: 14,
    height: 14,
    position: "absolute",
    right: 5,
    top: "50%",
    marginTop: -7,
  },
  busStationInfo: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  busStationName: {
    fontSize: 16,
  },
  busStationNumber: {
    fontSize: 14,
    color: "#8D8E93",
  },
});
